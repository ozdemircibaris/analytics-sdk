/**
 * Configuration options for initializing the analytics SDK
 */
export interface AnalyticsConfig {
  /**
   * API key for authentication
   */
  apiKey: string;

  /**
   * Client ID for authentication
   */
  clientId: string;

  /**
   * Client Secret for authentication
   */
  clientSecret: string;

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
 * User identification data
 */
export interface UserData {
  /**
   * User's unique identifier
   */
  id: string;

  /**
   * User's name (optional)
   */
  name?: string;

  /**
   * User's email (optional)
   */
  email?: string;

  /**
   * Additional user properties
   */
  [key: string]: string | number | boolean | null | undefined;
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
   * Event type
   */
  type: string;

  /**
   * Event data (properties)
   */
  data: EventProperties;

  /**
   * Current page URL
   */
  url: string;

  /**
   * Browser information
   */
  browser: string;

  /**
   * Device information
   */
  device: string;

  /**
   * Session ID (generated on init)
   */
  sessionId: string;

  /**
   * Timestamp when the event was created
   */
  timestamp: number;

  /**
   * User data if available
   */
  user?: UserData;
}
