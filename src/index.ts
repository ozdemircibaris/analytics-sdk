/**
 * @ozdemircibaris/analytics-sdk
 * Lightweight JavaScript/TypeScript SDK for sending analytics events
 *
 * Fixed endpoint: https://analytics-nine-azure.vercel.app/api/events
 * Required parameters: apiKey, clientId, clientSecret
 */

export { initAnalytics } from "./core/init";
export { trackEvent } from "./core/track";
export { identifyUser } from "./core/identify";
export { isUserIdentified, isInitialized } from "./core/config";
export type { AnalyticsConfig, EventPayload, UserData } from "./types";
