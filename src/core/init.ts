import { AnalyticsConfig } from "../types";
import { setConfig } from "./config";
import { setupEventQueue } from "./queue";
import { debugLog } from "../utils";

/**
 * Initializes the Analytics SDK with the provided configuration
 * @param config Configuration options for the SDK
 */
export function initAnalytics(config: AnalyticsConfig): void {
  try {
    // Set configuration
    setConfig(config);

    // Initialize the event queue
    setupEventQueue();

    debugLog(config.debug || false, "Analytics SDK initialized successfully", {
      apiKey: config.apiKey ? "****" : undefined,
      clientId: config.clientId ? "****" : undefined,
      clientSecret: config.clientSecret ? "****" : undefined,
      batchSize: config.batchSize,
      batchInterval: config.batchInterval,
    });
  } catch (error) {
    console.error("[Analytics SDK] Initialization error:", error);
    throw error;
  }
}
