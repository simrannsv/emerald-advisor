import { useState, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ExampleQueries from "@/components/ExampleQueries";
import ChatInterface, { Message } from "@/components/ChatInterface";
import FeaturesSection from "@/components/FeaturesSection";
import ConversationSidebar from "@/components/ConversationSidebar";
import Footer from "@/components/Footer";

// Mock AI responses for demo
const mockResponses: Record<string, string> = {
  "Latest import duty changes for electronics": `Based on the latest regulatory updates, here are the key import duty changes for electronics:

**Recent Changes (Effective 2024):**

1. **Smartphones & Components**: Basic Customs Duty (BCD) maintained at 20%, but certain components like camera modules now have reduced duties of 2.5%.

2. **Laptops & Tablets**: The phased manufacturing program continues with BCD of 15% on finished products. Import licensing requirements have been updated.

3. **Semiconductor Devices**: Duty-free imports extended under the India Semiconductor Mission for approved manufacturers.

**Key Recommendations:**
- Review your HS codes to ensure correct classification
- Consider local sourcing for duty benefits under PLI schemes
- Maintain proper documentation for preferential trade agreements

Would you like me to help with specific product categories or compliance requirements?`,

  "Draft professional vendor payment reminder email": `Here's a professional payment reminder email template:

---

**Subject:** Friendly Reminder: Invoice [#INV-XXXX] Payment Due

Dear [Vendor Name],

I hope this message finds you well. I am writing to follow up on Invoice #[Invoice Number] dated [Date], with an outstanding balance of ₹[Amount].

**Invoice Details:**
- Invoice Number: [#]
- Invoice Date: [Date]
- Due Date: [Date]
- Amount Due: ₹[Amount]

We value our business relationship and would appreciate your attention to this matter at your earliest convenience. If the payment has already been processed, please disregard this notice.

For any questions or if you need to discuss payment arrangements, please don't hesitate to reach out.

Thank you for your prompt attention.

Best regards,
[Your Name]
[Company Name]
[Contact Information]

---

Would you like me to customize this further or create versions for different payment stages?`,

  default: `Thank you for your question. Based on my analysis of current business practices and regulations, here's what you should know:

**Key Points:**
1. I've analyzed the latest available information on this topic
2. Here are actionable recommendations for your MSME
3. Consider consulting with a specialist for specific compliance needs

**Next Steps:**
- Review the recommendations above
- Implement changes gradually
- Monitor for regulatory updates

Would you like me to elaborate on any specific aspect or provide more detailed guidance?`,
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState<Array<{
    id: string;
    title: string;
    timestamp: Date;
    preview: string;
  }>>([]);

  const handleSendMessage = useCallback(async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    // Get mock response
    const responseContent = mockResponses[content] || mockResponses.default;

    const assistantMessage: Message = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: responseContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);

    // Update conversation history
    if (messages.length === 0) {
      setConversations((prev) => [
        {
          id: `conv-${Date.now()}`,
          title: content.slice(0, 50),
          timestamp: new Date(),
          preview: responseContent.slice(0, 80) + "...",
        },
        ...prev,
      ]);
    }
  }, [messages.length]);

  const handleNewChat = useCallback(() => {
    setMessages([]);
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen}
      />

      <div className="flex flex-1">
        <ConversationSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          conversations={conversations}
          onSelect={() => {}}
          onNewChat={handleNewChat}
        />

        <main className="flex-1">
          <HeroSection onSubmit={handleSendMessage} isLoading={isLoading} />
          
          {messages.length === 0 && (
            <ExampleQueries onSelectQuery={handleSendMessage} />
          )}

          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />

          {messages.length === 0 && <FeaturesSection />}
          
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Index;
