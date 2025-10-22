import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, Home, Filter, Eye, Settings, FileBarChart, FileText, BarChart3 } from "lucide-react";

const navItems = [
  { path: "Home", label: "Home", icon: Home },
  { path: "InputSanitizer", label: "Input Sanitizer", icon: Filter },
  { path: "OutputInspector", label: "Output Inspector", icon: Eye },
  { path: "PolicyEditor", label: "Policy Editor", icon: Settings },
  { path: "Reports", label: "Reports", icon: FileBarChart },
  { path: "SecurityLogs", label: "Audit Logs", icon: FileText },
  { path: "Dashboard", label: "Metrics Dashboard", icon: BarChart3 },
];

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === createPageUrl(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={createPageUrl("Home")} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">PromptArmor 🔒</span>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={createPageUrl(item.path)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg hover:bg-primary/10 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <div className="md:hidden border-t border-border">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={createPageUrl(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? 'bg-emerald-500 text-white'
                  : 'text-muted-foreground hover:bg-emerald-500/10 hover:text-emerald-500'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}