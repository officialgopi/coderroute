import { useEffect, useRef, useState, memo } from "react";
import { useAiStore } from "@/store/ai.store";
import { useCodeEditorSettingsStore } from "@/store/code-editor-settings.store";
import { useProblemStore } from "@/store/problem.store";
import { env } from "@/env";
import { Sparkles, Send, Bot, User, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface IMessage {
  sender: "user" | "ai";
  text: string;
}

export const AIChatPanel = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const { getChatsWithAiByProblemId } = useAiStore();
  const { problemInCodeEditor } = useProblemStore();
  const { language } = useCodeEditorSettingsStore();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto Scroll Engine: Pins scroll parameters securely to container baselines
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Unified Chat History Synchronization Effect
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!problemInCodeEditor?.id) return;
      try {
        const chatHistory = await getChatsWithAiByProblemId(
          problemInCodeEditor.id,
        );
        if (chatHistory) {
          const formattedMessages = chatHistory.flatMap((chat) => [
            { sender: "user" as const, text: chat.message },
            {
              sender: "ai" as const,
              text:
                chat.responseStatus === "SUCCESS"
                  ? chat.response || ""
                  : "Unable to process your message.",
            },
          ]);
          setMessages(formattedMessages);
        }
      } catch (err) {
        console.error("Failed to sync context logs: ", err);
      }
    };
    fetchChatHistory();
  }, [problemInCodeEditor?.id, getChatsWithAiByProblemId]);

  // High-Fidelity Network Stream Request Pipeline
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault(); // Intercepts form dispatch routines

    const trimmedInput = input.trim();
    if (!trimmedInput || isStreaming || !problemInCodeEditor?.id) return;

    setInput("");
    setIsStreaming(true);

    // Commit User Context Payload to Local Grid Arrays
    const userPayload: IMessage = { sender: "user", text: trimmedInput };
    setMessages((prev) => [...prev, userPayload]);

    // Initialize clean placeholder node to collect upcoming streaming text allocations
    setMessages((prev) => [...prev, { sender: "ai", text: "..." }]);

    try {
      const response = await fetch(`${env.VITE_API_BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          message: trimmedInput,
          language: language,
          problemId: problemInCodeEditor.id,
        }),
      });

      if (!response.ok) throw new Error("Server context breakdown error.");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let aggregatedBuffer = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          aggregatedBuffer += decoder.decode(value, { stream: true });

          // Pure React state synchronization overwrites historical stream chunks safely without data mutation
          setMessages((prev) => {
            const head = prev.slice(0, -1);
            return [...head, { sender: "ai", text: aggregatedBuffer }];
          });
        }
      }
    } catch (error) {
      toast.error("Error communicating with AI service.");
      setMessages((prev) => {
        const head = prev.slice(0, -1);
        return [
          ...head,
          { sender: "ai", text: "Communication failed. Please try again." },
        ];
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-surface-panel/20 dark:bg-zinc-950/20 select-text font-sans">
      {/* --- PANEL HEADER BAND --- */}
      <div className="h-9 shrink-0 flex items-center px-4 bg-surface-card/40 dark:bg-zinc-950/40 border-b border-border-subtle/50 dark:border-zinc-900/60 select-none">
        <div className="flex items-center gap-2">
          <Sparkles
            size={12}
            className="text-amber-500 animate-pulse stroke-[2.2]"
          />
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-wider text-text-primary dark:text-zinc-200">
            Copilot Companion
          </h2>
        </div>
      </div>

      {/* --- MESSAGES STREAM SCREEN --- */}
      <div className="flex-1 overflow-y-auto px-4 py-3 custom-scrollbar space-y-4 bg-transparent min-h-0">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4 select-none opacity-60">
            <Bot
              size={22}
              className="text-text-secondary opacity-30 mb-2 stroke-[1.8]"
            />
            <p className="text-xs font-semibold text-text-primary">
              AI Workspace Console Ready
            </p>
            <p className="text-[10px] text-text-secondary max-w-[200px] mt-0.5 leading-normal">
              Ask questions regarding the prompt, check constraints, or review
              logic block anomalies.
            </p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={`ai-chat-bubble-${idx}`}
              className={`flex gap-3 max-w-[90%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              {/* Profile Avatar Graphics Icons */}
              <div
                className={`h-6 w-6 rounded-md border flex items-center justify-center shrink-0 select-none shadow-2xs ${
                  msg.sender === "user"
                    ? "bg-surface-card border-border-subtle text-text-primary"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-500"
                }`}
              >
                {msg.sender === "user" ? (
                  <User size={11} strokeWidth={2.5} />
                ) : (
                  <Bot size={11} strokeWidth={2.5} />
                )}
              </div>

              {/* Dynamic Text Dialog Bubble */}
              <div
                className={`px-3.5 py-2.5 rounded-xl text-xs leading-relaxed shadow-3xs break-words overflow-hidden ${
                  msg.sender === "user"
                    ? "bg-surface-card dark:bg-zinc-900/80 border border-border-subtle/70 dark:border-zinc-800 text-text-primary"
                    : "bg-surface-panel border border-border-subtle/40 dark:border-zinc-900 text-text-primary/95"
                }`}
              >
                <div className="prose prose-xs dark:prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-900/50 dark:prose-pre:bg-zinc-950/50 prose-pre:border prose-pre:border-border-subtle/50 prose-pre:p-3 prose-pre:rounded-lg prose-code:text-[11px] prose-code:font-mono">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* --- RECIPIENT INPUT DISPATCH BOARD --- */}
      <div className="p-3 shrink-0 border-t border-border-subtle/60 dark:border-zinc-900/60 bg-surface-card/20 dark:bg-zinc-950/20 select-none">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isStreaming}
            placeholder={
              isStreaming
                ? "Streaming companion insight layers..."
                : "Query architectural patterns or ask for hints..."
            }
            className="flex-1 h-8 rounded-lg bg-surface-panel dark:bg-zinc-900 border border-border-subtle dark:border-zinc-800 px-3 text-xs text-text-primary placeholder-text-secondary/50 outline-none transition-all focus-visible:border-border-intense dark:focus-visible:border-zinc-700 focus-visible:ring-1 focus-visible:ring-amber-500/20 disabled:opacity-50"
            aria-label="AI prompt text submission gateway field"
          />

          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="flex items-center justify-center h-8 px-3 rounded-lg bg-neutral-900 dark:bg-zinc-100 hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-zinc-950 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium text-xs gap-1.5 shadow-sm"
          >
            <Send size={11} className="stroke-[2.2]" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default memo(AIChatPanel);
