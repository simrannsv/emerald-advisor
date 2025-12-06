import { Briefcase, Menu, History, Settings, Home, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header = ({ onToggleSidebar, isSidebarOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-soft">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold leading-tight text-foreground">
                MSME Advisor
              </span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                Strategic Intelligence
              </span>
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" size="sm" className="gap-2">
            <Home className="h-4 w-4" />
            Home
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <History className="h-4 w-4" />
            History
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="hero" size="sm" className="hidden sm:flex">
            New Chat
          </Button>
          <Button variant="hero" size="icon" className="sm:hidden">
            <Briefcase className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
