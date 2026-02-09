/**
 * Social links configuration
 * Reads LinkedIn URL from environment variable and validates it
 */

// Read LinkedIn URL from Vite environment variable
const linkedInUrl = import.meta.env.VITE_LINKEDIN_URL;

/**
 * Validates if a string is a valid LinkedIn profile URL
 */
function isValidLinkedInUrl(url: string | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  
  // Basic validation: check if it's a LinkedIn URL
  const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/.+/i;
  return linkedInPattern.test(url.trim());
}

/**
 * Get the configured LinkedIn URL if valid, otherwise undefined
 */
export function getLinkedInUrl(): string | undefined {
  return isValidLinkedInUrl(linkedInUrl) ? linkedInUrl.trim() : undefined;
}
