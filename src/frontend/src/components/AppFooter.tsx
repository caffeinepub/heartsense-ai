import { Separator } from '@/components/ui/separator';
import { Mail } from 'lucide-react';
import { SiLinkedin } from 'react-icons/si';
import { getLinkedInUrl } from '@/config/socialLinks';

export default function AppFooter() {
  const linkedInUrl = getLinkedInUrl();

  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container py-8">
        <div className="flex flex-col items-center gap-6 text-center">
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

          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Project Owner</p>
            <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Sunil Biradar</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:sunilbiradar0066@gmail.com"
                  className="flex items-center gap-1.5 transition-all duration-200 hover:text-foreground hover:scale-105"
                  aria-label="Email Sunil Biradar"
                >
                  <Mail className="h-4 w-4" />
                  <span>sunilbiradar0066@gmail.com</span>
                </a>
                {linkedInUrl && (
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-all duration-200 hover:text-foreground hover:scale-105"
                    aria-label="Sunil Biradar on LinkedIn"
                  >
                    <SiLinkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-2 w-full max-w-xs" />

          <p className="text-xs text-muted-foreground">
            © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
