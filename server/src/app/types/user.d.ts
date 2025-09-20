declare global {
  namespace Express {
    interface Express {
      user?: {
        id: string;
        email: string;
        name: string;
        avatar?: string;
        username: string;
        isEmailVerified: boolean;
        role: "USER" | "ADMIN";
        authProvider: "GOOGLE" | "GITHUB";
      };
    }
  }
}

export {};
