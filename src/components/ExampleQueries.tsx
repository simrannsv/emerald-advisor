import { FileText, TrendingUp, Users, Package } from "lucide-react";

interface ExampleQueriesProps {
  onSelectQuery: (query: string) => void;
}

const examples = [
  {
    icon: Package,
    title: "Import Duty Changes",
    query: "Latest import duty changes for electronics",
    color: "bg-blue-50 text-blue-600 border-blue-100",
  },
  {
    icon: FileText,
    title: "Draft Payment Reminder",
    query: "Draft professional vendor payment reminder email",
    color: "bg-amber-50 text-amber-600 border-amber-100",
  },
  {
    icon: TrendingUp,
    title: "Marketing Strategies",
    query: "Low-cost digital marketing strategies for retail",
    color: "bg-primary/5 text-primary border-primary/10",
  },
  {
    icon: Users,
    title: "Employee Retention",
    query: "Employee retention best practices for startups",
    color: "bg-purple-50 text-purple-600 border-purple-100",
  },
];

const ExampleQueries = ({ onSelectQuery }: ExampleQueriesProps) => {
  return (
    <section className="py-8">
      <div className="container px-4 md:px-6">
        <div className="mb-6 text-center">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Try an example
          </h2>
        </div>
        
        <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onSelectQuery(example.query)}
              className={`group flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated ${example.color}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-current/10">
                <example.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium">{example.title}</h3>
                <p className="mt-1 text-sm opacity-80 line-clamp-2">
                  {example.query}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExampleQueries;
