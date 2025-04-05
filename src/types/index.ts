/**
 * Configuration options for initializing the analytics SDK
 */
export interface AnalyticsConfig {
  /**
   * API key for authentication
   */
  apiKey: string;

  /**
   * Full URL of the endpoint where events will be sent
   */
  endpoint: string;

  /**
   * Optional debug mode flag that enables logging
   */
  debug?: boolean;

  /**
   * Optional batch size for sending events (default: 10)
   */
  batchSize?: number;

  /**
   * Optional batch interval in milliseconds (default: 5000)
   */
  batchInterval?: number;
}

/**
 * Custom properties for an event
 */
export interface EventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Full event payload sent to the server
 */
export interface EventPayload {
  /**
   * Event name/type
   */
  eventName: string;

  /**
   * Custom properties for this event
   */
  properties?: EventProperties;

  /**
   * Timestamp when the event was created
   */
  timestamp: number;

  /**
   * Current page URL
   */
  url: string;

  /**
   * User agent string
   */
  userAgent: string;

  /**
   * Session ID (generated on init)
   */
  sessionId: string;
}
