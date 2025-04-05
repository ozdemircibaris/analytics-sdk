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
 * Detect browser from user agent
 */
export function detectBrowser(userAgent: string): string {
  if (!userAgent) return "unknown";

  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("SamsungBrowser")) return "Samsung Browser";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  if (userAgent.includes("Trident")) return "Internet Explorer";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Safari")) return "Safari";

  return "unknown";
}

/**
 * Detect device type from user agent
 */
export function detectDevice(userAgent: string): string {
  if (!userAgent) return "unknown";

  if (/iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) {
    return "iOS";
  }

  if (/android/i.test(userAgent)) return "Android";
  if (/windows phone/i.test(userAgent)) return "Windows Phone";

  // Check for desktop operating systems
  if (/Win/.test(userAgent)) return "Windows";
  if (/Mac/.test(userAgent)) return "Mac";
  if (/Linux/.test(userAgent)) return "Linux";

  return "unknown";
}

/**
 * Safely access browser APIs with fallbacks for non-browser environments
 */
export function getBrowserInfo(): { url: string; userAgent: string; browser: string; device: string } {
  const isBrowser = typeof window !== "undefined";
  const userAgent = isBrowser ? navigator.userAgent : "";

  return {
    url: isBrowser ? window.location.href : "",
    userAgent: userAgent,
    browser: detectBrowser(userAgent),
    device: detectDevice(userAgent),
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
