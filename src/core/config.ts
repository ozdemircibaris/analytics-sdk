import { AnalyticsConfig, UserData } from "../types";
import { generateUUID } from "../utils";

// Fixed API endpoint
export const API_ENDPOINT = "https://analytics-nine-azure.vercel.app/api/events";

// Default configuration values
const DEFAULT_CONFIG: Partial<AnalyticsConfig> = {
  debug: false,
  batchSize: 10,
  batchInterval: 5000,
};

// Global variable to store the current configuration
let currentConfig: AnalyticsConfig | null = null;

// Session ID that persists during the lifetime of the SDK instance
const sessionId = generateUUID();

// Store identified user data
let currentUser: UserData | null = null;

/**
 * Sets the SDK configuration
 */
export function setConfig(config: AnalyticsConfig): void {
  if (!config.apiKey) {
    throw new Error("API Key is required");
  }

  if (!config.clientId) {
    throw new Error("Client ID is required");
  }

  if (!config.clientSecret) {
    throw new Error("Client Secret is required");
  }

  // Merge provided config with defaults
  currentConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };
}

/**
 * Gets the current SDK configuration
 */
export function getConfig(): AnalyticsConfig {
  if (!currentConfig) {
    throw new Error("Analytics SDK not initialized. Call initAnalytics() first.");
  }

  return currentConfig;
}

/**
 * Gets the current session ID
 */
export function getSessionId(): string {
  return sessionId;
}

/**
 * Sets the current user data
 * @param userData The user data to store
 */
export function setUserData(userData: UserData): void {
  if (!userData.id) {
    throw new Error("User ID is required");
  }

  currentUser = userData;

  // Store in localStorage for persistence if available
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("analytics_user", JSON.stringify(userData));
    }
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Gets the current user data if available
 * @returns The current user data or null if not identified
 */
export function getUserData(): UserData | null {
  // If we have user data in memory, use that
  if (currentUser) {
    return currentUser;
  }

  // Try to get from localStorage if available
  try {
    if (typeof localStorage !== "undefined") {
      const storedUser = localStorage.getItem("analytics_user");
      if (storedUser) {
        currentUser = JSON.parse(storedUser);
        return currentUser;
      }
    }
  } catch {
    // Ignore localStorage errors
  }

  return null;
}

/**
 * Clears the current user data
 */
export function clearUserData(): void {
  currentUser = null;

  // Remove from localStorage if available
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("analytics_user");
    }
  } catch {
    // Ignore localStorage errors
  }
}

/**
 * Checks if a user has been identified
 * @returns boolean indicating if a user has been identified
 */
export function isUserIdentified(): boolean {
  // Check memory first
  if (currentUser) {
    return true;
  }

  // Try to get from localStorage if available
  try {
    if (typeof localStorage !== "undefined") {
      const storedUser = localStorage.getItem("analytics_user");
      if (storedUser) {
        // Don't need to set currentUser here as getUserData() will do that if needed
        return true;
      }
    }
  } catch {
    // Ignore localStorage errors
  }

  return false;
}

/**
 * Checks if the SDK has been initialized
 * @returns boolean indicating if the SDK is initialized
 */
export function isInitialized(): boolean {
  return currentConfig !== null;
}
