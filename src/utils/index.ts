/**
 * Generates a random UUID v4
 */
export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Safely access browser APIs with fallbacks for non-browser environments
 */
export function getBrowserInfo(): { url: string; userAgent: string } {
  const isBrowser = typeof window !== "undefined";

  return {
    url: isBrowser ? window.location.href : "",
    userAgent: isBrowser ? navigator.userAgent : "",
  };
}

/**
 * Debug logging function that only logs if debug mode is enabled
 */
export function debugLog(debug: boolean, ...args: unknown[]): void {
  if (debug && console && console.log) {
    console.log("[Analytics SDK]:", ...args);
  }
}
