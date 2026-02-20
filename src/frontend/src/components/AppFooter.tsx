import { Heart } from 'lucide-react';

export default function AppFooter() {
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'heartsense-ai';
  
  const caffeineUrl = `https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`;

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-4 text-center text-sm">
          <p className="text-muted-foreground">
            <strong>Medical Disclaimer:</strong> This tool is for educational purposes only. 
            Always consult with a qualified healthcare professional for medical concerns.
          </p>
          
          <p className="flex items-center gap-1 text-muted-foreground">
            Built with <Heart className="h-3 w-3 fill-current" /> using{' '}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              caffeine.ai
            </a>
          </p>
          
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} HeartSense AI
          </p>
        </div>
      </div>
    </footer>
  );
}
