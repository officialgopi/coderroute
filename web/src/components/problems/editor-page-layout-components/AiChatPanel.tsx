import { env } from "@/env";
import { useAiStore } from "@/store/ai.store";
import { useCodeEditorSettingsStore } from "@/store/code-editor-settings.store";
import { useProblemStore } from "@/store/problem.store";
import type { TLanguage } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
const AIChatPanel = () => {
  const { getChatsWithAiByProblemId } = useAiStore();
  const [messages, setMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const { problemInCodeEditor } = useProblemStore();
  const { language } = useCodeEditorSettingsStore();
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!problemInCodeEditor) return;
      const chatHistory = await getChatsWithAiByProblemId(
        problemInCodeEditor?.id!
      );
      if (chatHistory) {
        const messagesArray = chatHistory.map(
          ({
            message,
            response,
            responseStatus,
          }): {
            sender: "user" | "ai";
            text: string;
          }[] => {
            return [
              {
                sender: "user",
                text: message,
              },
              {
                sender: "ai",
                text:
                  responseStatus === "SUCCESS"
                    ? response || ""
                    : "AI: Unable to process your message.",
              },
            ];
          }
        );
        const formattedMessages = messagesArray.flat();
        setMessages(formattedMessages);
      }
    };
    fetchChatHistory();
  }, []);

  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async ({
    message,
    problemId,
    language,
  }: {
    message: string;
    problemId: string;
    language: TLanguage;
  }) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage = { sender: "user" as const, text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const aiMessage = { sender: "ai" as const, text: "" };
    setMessages((prev) => [...prev, aiMessage]);
    try {
      const res = await fetch(`${env.VITE_API_BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ message, language, problemId }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let aiResponse = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          aiResponse += decoder.decode(value);
          aiMessage.text = aiResponse;
          setMessages((prev) => [...prev.slice(0, -2), aiMessage]); // Update last AI message
        }
      }
    } catch (error) {
      toast.error("Error communicating with AI service.");
    } finally {
    }
  };

  return (
    <div className="flex flex-col h-full w-full  dark:bg-neutral-900 rounded-md border">
      <div className="p-3 border-b w-full flex items-center space-x-2 border-neutral-500/50">
        <h2 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
          AI Chat
        </h2>
      </div>
      {/*   Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 text-sm">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[85%] px-3 py-2 rounded-xl shadow-sm ${
              msg.sender === "user"
                ? "ml-auto bg-neutral-300 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
                : "mr-auto bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100"
            } htmlContent={msg.text} />} `}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t w-full flex items-center space-x-2 border-neutral-500/50">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 rounded-md bg-neutral-50 dark:bg-neutral-900 
                     border border-neutral-400 dark:border-neutral-700 
                     px-3 py-2 text-neutral-800 dark:text-neutral-200 
                     outline-none focus:ring-1 focus:ring-neutral-500 
                     dark:focus:ring-neutral-500 w-full"
        />

        <button
          onClick={() =>
            sendMessage({
              message: input,
              problemId: problemInCodeEditor?.id!,
              language: language,
            })
          }
          className="px-4 py-2 rounded-md bg-neutral-700 w-[100px] text-neutral-100 
                     hover:bg-neutral-600 dark:bg-neutral-600 
                     dark:hover:bg-neutral-500 transition-colors text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatPanel;
