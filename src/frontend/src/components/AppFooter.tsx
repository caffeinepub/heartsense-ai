import { Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AppFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/heartsense-logo.dim_512x512.png"
              alt="HeartSense AI"
              className="h-8 w-8"
            />
            <span className="text-sm font-semibold">HeartSense AI</span>
          </div>
          
          <p className="max-w-2xl text-xs text-muted-foreground">
            <strong>Medical Disclaimer:</strong> This tool is for educational and informational purposes only. 
            It does not provide medical advice, diagnosis, or treatment. Always consult with a qualified healthcare 
            professional for medical concerns.
          </p>

          <Separator className="my-2 w-full max-w-xs" />

          <p className="text-xs text-muted-foreground">
            © 2026. Built with <Heart className="inline h-3 w-3 fill-current text-health" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
