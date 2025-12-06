import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeroSectionProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const HeroSection = ({ onSubmit, isLoading }: HeroSectionProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
      setQuery("");
    }
  };

  return (
    <section className="relative overflow-hidden pb-8 pt-12 md:pb-12 md:pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-mint/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="container relative px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full bg-mint-soft px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            AI-Powered Business Intelligence
          </div>

          {/* Heading */}
          <h1 className="mb-4 animate-fade-up text-3xl font-bold tracking-tight text-foreground [animation-delay:100ms] md:text-5xl lg:text-6xl">
            Your Strategic
            <span className="text-gradient"> MSME Advisor</span>
          </h1>

          {/* Description */}
          <p className="mb-8 animate-fade-up text-lg text-muted-foreground [animation-delay:200ms] md:text-xl">
            Get real-time business intelligence, regulatory updates, and expert advice 
            tailored for Micro, Small, and Medium Enterprises.
          </p>

          {/* Search Input */}
          <form 
            onSubmit={handleSubmit}
            className="mx-auto animate-fade-up [animation-delay:300ms]"
          >
            <div className="relative flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ask your business question..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-14 w-full rounded-xl border border-border bg-card pl-12 pr-4 text-base shadow-soft transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 md:h-16 md:rounded-2xl md:text-lg"
                />
              </div>
              <Button 
                type="submit" 
                variant="hero" 
                size="lg"
                disabled={!query.trim() || isLoading}
                className="absolute right-2 h-10 md:h-12"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    <span className="hidden sm:inline">Processing</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span className="hidden sm:inline">Ask Advisor</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
