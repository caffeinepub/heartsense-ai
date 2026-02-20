import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Medical Disclaimer</AlertTitle>
      <AlertDescription>
        This risk assessment tool is for educational and informational purposes only. 
        It does not constitute medical advice, diagnosis, or treatment. Always seek the 
        advice of your physician or other qualified health provider with any questions 
        you may have regarding a medical condition.
      </AlertDescription>
    </Alert>
  );
}
