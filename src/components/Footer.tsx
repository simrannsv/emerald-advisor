import { Briefcase, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 py-8">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">
              © 2024 MSME Strategic Advisor. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              Help Center
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
