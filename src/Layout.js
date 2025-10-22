import React from "react";
import { useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "./components/navigation/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [darkMode, setDarkMode] = React.useState(true);
  const isLanding = currentPageName === "Landing";

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Ensure page scrolls to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLanding) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen">{children}</div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        <style>{`
          :root {
            --background: 0 0% 100%;
            --foreground: 240 10% 3.9%;
            --card: 0 0% 100%;
            --card-foreground: 240 10% 3.9%;
            --primary: 240 5.9% 10%;
            --primary-foreground: 0 0% 98%;
            --border: 240 5.9% 90%;
            --muted-foreground: 240 3.8% 46.1%;
          }
          
          .dark {
            --background: 224 71% 4%;
            --foreground: 213 31% 91%;
            --card: 224 71% 6%;
            --card-foreground: 213 31% 91%;
            --primary: 210 100% 50%;
            --primary-foreground: 0 0% 100%;
            --border: 216 34% 17%;
            --muted-foreground: 215 20.2% 65.1%;
          }
          
          body {
            background: hsl(var(--background));
            color: hsl(var(--foreground));
          }

          * {
            box-sizing: border-box;
          }
        `}</style>

        <Navbar />

        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>

        {/* Theme Toggle - Fixed Bottom Right */}
        <div className="fixed bottom-6 right-6 z-40">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="h-12 w-12 rounded-full shadow-lg border-2 hover:scale-110 transition-transform"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  );
}