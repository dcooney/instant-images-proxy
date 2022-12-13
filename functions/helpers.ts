/**
 * Generate random number between min/max values.
 */
export function getRandomNumber(min: number = 0, max: number = 19) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
