import { useEffect } from 'react';

/**
 * Development guard component that scans the DOM for banned watermark phrases
 * and logs warnings if detected. Helps enforce watermark-free UI during review.
 */
export default function WatermarkGuard() {
  useEffect(() => {
    // Only run in development or when explicitly enabled
    const isDev = import.meta.env.DEV;
    
    if (!isDev) return;

    const bannedPhrases = [
      'caffeine.ai',
      'caffeine',
      'built with love using caffeine',
      'built with caffeine',
      'powered by caffeine',
    ];

    const checkForWatermarks = () => {
      const bodyText = document.body.innerText.toLowerCase();
      const bodyHTML = document.body.innerHTML.toLowerCase();

      const foundPhrases: string[] = [];

      bannedPhrases.forEach((phrase) => {
        if (bodyText.includes(phrase.toLowerCase()) || bodyHTML.includes(phrase.toLowerCase())) {
          foundPhrases.push(phrase);
        }
      });

      if (foundPhrases.length > 0) {
        console.error(
          '🚨 WATERMARK DETECTED 🚨\n' +
          'The following banned phrases were found in the UI:\n' +
          foundPhrases.map(p => `  - "${p}"`).join('\n') +
          '\n\nPlease remove all watermark/attribution text from the application.'
        );
      } else {
        console.log('✅ Watermark check passed - no banned phrases detected');
      }
    };

    // Run check after a short delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(checkForWatermarks, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
