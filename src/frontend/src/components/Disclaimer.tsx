import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <Alert variant="default" className="border-health/30 bg-health/5">
      <AlertTriangle className="h-5 w-5 text-health" />
      <AlertTitle className="text-base font-semibold">Important Medical Disclaimer</AlertTitle>
      <AlertDescription className="mt-2 text-sm leading-relaxed">
        This risk assessment tool is designed for <strong>educational and informational purposes only</strong>. 
        It does not constitute medical advice, diagnosis, or treatment. The results are based on a simplified 
        algorithm and should not be used as a substitute for professional medical consultation. Always seek the 
        advice of your physician or other qualified health provider with any questions you may have regarding a 
        medical condition. Never disregard professional medical advice or delay in seeking it because of something 
        you have read or calculated using this tool.
      </AlertDescription>
    </Alert>
  );
}
