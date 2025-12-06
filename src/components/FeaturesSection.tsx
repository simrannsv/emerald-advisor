import { 
  Search, 
  Brain, 
  FileText, 
  Scale, 
  TrendingUp, 
  Target 
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Real-Time Research",
    description: "Web search integration delivering current market data and industry information.",
  },
  {
    icon: Brain,
    title: "Expert Analysis",
    description: "AI-powered insights and strategic recommendations tailored to your business.",
  },
  {
    icon: FileText,
    title: "Document Generation",
    description: "Create professional emails, reports, and business documents instantly.",
  },
  {
    icon: Scale,
    title: "Regulatory Updates",
    description: "Stay informed on the latest tax, compliance, and policy changes.",
  },
  {
    icon: TrendingUp,
    title: "Industry Insights",
    description: "Sector-specific advice and comprehensive market trend analysis.",
  },
  {
    icon: Target,
    title: "Action-Oriented",
    description: "Practical, implementable solutions you can apply immediately.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
            Everything You Need to
            <span className="text-gradient"> Grow Your Business</span>
          </h2>
          <p className="text-muted-foreground">
            Comprehensive tools and insights designed specifically for MSMEs
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-mint-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
