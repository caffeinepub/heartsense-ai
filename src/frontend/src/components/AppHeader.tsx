import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

export default function AppHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 transition-all duration-200 hover:opacity-80 motion-safe:hover:scale-105">
          <img
            src="/assets/generated/heartsense-logo.dim_512x512.png"
            alt="HeartSense AI Logo"
            className="h-10 w-10"
          />
          <span className="text-lg font-bold tracking-tight">HeartSense AI</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            onClick={() => navigate({ to: '/' })}
            className="transition-all duration-200 motion-safe:hover:scale-105"
          >
            Home
          </Button>
          <Button 
            variant="default" 
            onClick={() => navigate({ to: '/assessment' })}
            className="transition-all duration-200 motion-safe:hover:scale-105 motion-safe:hover:shadow-lg"
          >
            <Activity className="mr-2 h-4 w-4" />
            Start Assessment
          </Button>
        </nav>
      </div>
    </header>
  );
}
