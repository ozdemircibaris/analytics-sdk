/**
 * @ozdemircibaris/analytics-sdk
 * Lightweight JavaScript/TypeScript SDK for sending analytics events
 *
 * Default endpoint: http://localhost:3000/api/track
 * Required parameters: apiKey, clientId, clientSecret
 */

export { initAnalytics } from "./core/init";
export { trackEvent } from "./core/track";
export type { AnalyticsConfig, EventPayload } from "./types";
