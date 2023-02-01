/**
 * Generate random number between min/max values.
 */
export function getRandomNumber(min: number = 0, max: number = 19) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate a link from URL and label.
 */
export function generateLink(url: string, label: string): string {
  if (!url || !label) {
    return '';
  }
  return `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}
