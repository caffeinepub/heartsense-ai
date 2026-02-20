import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

export default function AppHeader() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Activity className="h-6 w-6" />
          HeartSense AI
        </Link>

        <nav className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => navigate({ to: '/' })}>
            Home
          </Button>
          <Button onClick={() => navigate({ to: '/assessment' })}>
            Start Assessment
          </Button>
        </nav>
      </div>
    </header>
  );
}
