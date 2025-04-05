import { AnalyticsConfig } from "../types";
import { generateUUID } from "../utils";

// Default configuration values
const DEFAULT_CONFIG: Partial<AnalyticsConfig> = {
  debug: false,
  batchSize: 10,
  batchInterval: 5000,
  endpoint: "https://analytics-nine-azure.vercel.app/api/events",
};

// Global variable to store the current configuration
let currentConfig: AnalyticsConfig | null = null;

// Session ID that persists during the lifetime of the SDK instance
const sessionId = generateUUID();

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
