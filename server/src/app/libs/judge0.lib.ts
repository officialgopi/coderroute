import axios, { AxiosError, AxiosInstance } from "axios";
import { env } from "../../env";

class Judge0Sdk {
  private baseUrl: string;
  private api: AxiosInstance;

  private languageMap = {
    PYTHON: 71,
    JAVASCRIPT: 63,
  };

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public getJudge0LanguageId(language: string): number {
    return (
      this.languageMap[
        language.toUpperCase() as keyof typeof this.languageMap
      ] ?? undefined
    );
  }

  public getJudge0LanguageName(languageId: number): string | undefined {
    return Object.keys(this.languageMap).find(
      (key) =>
        (this.languageMap[key as keyof typeof this.languageMap] as number) ===
        languageId
    );
  }

  constructor({ baseUrl, apiKey }: { baseUrl: string; apiKey?: string }) {
    if (!baseUrl) {
      throw new Error("Base URL is required for Judge0 SDK");
    }

    this.baseUrl = baseUrl;

    this.api = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        ...(apiKey
          ? {
              "x-rapidapi-key": `${apiKey}`,
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            }
          : {}),
      },
    });
  }

  public async createSubmissionBatch(
    submissions: {
      language_id: number;
      source_code: string;
      stdin: string;
      expected_output?: string;
    }[]
  ) {
    try {
      const response = await this.api.post("/submissions/batch", {
        submissions,
      });
      return {
        success: true,
        data: response.data as {
          token: string;
        }[],
      };
    } catch (error) {
      return {
        success: false,
        error: error as AxiosError,
      };
    }
  }

  public async poolBatchResults(tokens: string[]) {
    try {
      const maxRetries = 15;
      let attempt = 0;

      while (attempt < maxRetries) {
        const {
          data,
        }: {
          data: {
            submissions: {
              language_id: number;
              stdout: string;
              status: {
                description: string;
                id: number;
              };
              stderr: string | null;
              token: string;
              [key: string]: any;
            }[];
          };
        } = await this.api.get("/submissions/batch", {
          params: {
            tokens: tokens.join(","),
          },

          headers: {
            "Content-Type": "application/json",
          },
        });

        const isAllDone = data.submissions.every(
          (submission) => submission.status.id >= 3
        );

        if (isAllDone) {
          return {
            success: true,
            data: data.submissions,
          };
        }
        attempt++;
        // Wait for 2 second before polling again
        await this.sleep(2000);
      }

      throw new Error("Failed to get batch results after 15 attempts");
    } catch (error) {
      return {
        success: false,
        error: error as AxiosError,
      };
    }
  }
}

const Judge0 = new Judge0Sdk({
  baseUrl: env.JUDGE0_BASE_URL,
  apiKey: env.JUDGE0_API_KEY,
});

export { Judge0 };
