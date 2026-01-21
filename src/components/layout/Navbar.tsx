import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TreeDeciduous, LayoutDashboard, GraduationCap, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home", icon: TreeDeciduous },
    { path: "/dashboard", label: "My Forest", icon: LayoutDashboard },
    { path: "/teacher", label: "Teacher Hub", icon: GraduationCap },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <TreeDeciduous className="h-5 w-5 text-primary" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            EcoQuest
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link key={path} to={path}>
              <Button
                variant={isActive(path) ? "secondary" : "ghost"}
                className={`gap-2 ${isActive(path) ? 'bg-primary/10 text-primary' : ''}`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <LogIn className="h-4 w-4" />
            Sign In
          </Button>
          <Button className="gap-2">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background animate-fade-in">
          <div className="container py-4 space-y-2">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button
                  variant={isActive(path) ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-2 ${isActive(path) ? 'bg-primary/10 text-primary' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
            <div className="pt-4 border-t flex flex-col gap-2">
              <Button variant="outline" className="w-full gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
              <Button className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
