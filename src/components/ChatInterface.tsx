import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Copy, ThumbsUp, ThumbsDown, Check, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInterface = ({ messages, onSendMessage, isLoading }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestedFollowUps = [
    "Can you provide more details?",
    "What are the compliance requirements?",
    "How does this affect my taxes?",
  ];

  if (messages.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-border bg-muted/30 py-6">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          {/* Messages Container */}
          <div className="mb-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-fade-up ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Avatar */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`group relative max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card shadow-soft border border-border"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm leading-relaxed md:text-base">
                    {message.content}
                  </p>

                  {/* Actions for assistant messages */}
                  {message.role === "assistant" && (
                    <div className="mt-3 flex items-center gap-1 border-t border-border/50 pt-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => copyToClipboard(message.content, message.id)}
                      >
                        {copiedId === message.id ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                        Copy
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-muted-foreground hover:text-primary"
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-muted-foreground hover:text-destructive"
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 animate-fade-up">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-2xl bg-card px-4 py-3 shadow-soft border border-border">
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 animate-typing rounded-full bg-primary [animation-delay:0ms]" />
                    <div className="h-2 w-2 animate-typing rounded-full bg-primary [animation-delay:200ms]" />
                    <div className="h-2 w-2 animate-typing rounded-full bg-primary [animation-delay:400ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Follow-ups */}
          {messages.length > 0 && messages[messages.length - 1].role === "assistant" && !isLoading && (
            <div className="mb-4 flex flex-wrap gap-2">
              {suggestedFollowUps.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSendMessage(suggestion)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground transition-all hover:border-primary hover:text-primary"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-2 rounded-xl border border-border bg-card p-2 shadow-soft focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your follow-up question..."
                rows={1}
                className="max-h-[200px] min-h-[44px] flex-1 resize-none bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground md:text-base"
              />
              
              <Button
                type="submit"
                variant="hero"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Press Enter to send, Shift + Enter for new line
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
