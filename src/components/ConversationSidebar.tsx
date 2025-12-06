import { MessageSquare, Plus, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

interface ConversationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeId?: string;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

const ConversationSidebar = ({
  isOpen,
  onClose,
  conversations,
  activeId,
  onSelect,
  onNewChat,
}: ConversationSidebarProps) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-border bg-card pt-16 shadow-xl transition-transform duration-300 lg:relative lg:z-0 lg:translate-x-0 lg:pt-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="flex items-center gap-2 font-semibold text-foreground">
            <MessageSquare className="h-5 w-5 text-primary" />
            History
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            variant="subtle"
            className="w-full justify-start gap-2"
            onClick={onNewChat}
          >
            <Plus className="h-4 w-4" />
            New Conversation
          </Button>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-3">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Clock className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">
                No conversations yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Start asking questions to see your history
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => onSelect(conversation.id)}
                  className={`w-full rounded-lg p-3 text-left transition-colors ${
                    activeId === conversation.id
                      ? "bg-mint-soft text-primary"
                      : "hover:bg-muted text-foreground"
                  }`}
                >
                  <p className="truncate text-sm font-medium">
                    {conversation.title}
                  </p>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    {conversation.preview}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground/70">
                    {conversation.timestamp.toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default ConversationSidebar;
