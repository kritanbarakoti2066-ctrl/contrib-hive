import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Github, Menu, Bell, User } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Github className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  OpenSource Hub
                </h1>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Discover
            </a>
            <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </a>
            <a href="#mentorship" className="text-sm font-medium hover:text-primary transition-colors">
              Mentorship
            </a>
            <a href="#resources" className="text-sm font-medium hover:text-primary transition-colors">
              Resources
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hidden sm:flex">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>

            {/* Add Project Button */}
            <Button className="gap-2 font-medium hover:scale-105 transition-transform">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Project</span>
            </Button>

            {/* User Menu */}
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <User className="h-4 w-4" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col gap-3">
              <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Discover Projects
              </a>
              <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Categories
              </a>
              <a href="#mentorship" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Mentorship Program
              </a>
              <a href="#resources" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Learning Resources
              </a>
              <div className="flex items-center gap-2 pt-2 border-t">
                <Button variant="ghost" size="sm">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;