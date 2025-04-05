import { EventProperties, EventPayload } from "../types";
import { getConfig, getSessionId } from "./config";
import { addToQueue } from "./queue";
import { getBrowserInfo, debugLog } from "../utils";

/**
 * Tracks an analytics event with the given name and optional properties
 * @param eventName Name of the event to track
 * @param properties Optional custom properties for this event
 */
export function trackEvent(eventName: string, properties?: EventProperties): void {
  try {
    const config = getConfig();
    const { url, userAgent } = getBrowserInfo();

    // Create the event payload
    const eventPayload: EventPayload = {
      eventName,
      properties,
      timestamp: Date.now(),
      url,
      userAgent,
      sessionId: getSessionId(),
    };

    debugLog(config.debug || false, "Tracking event", {
      eventName,
      properties,
    });

    // Add the event to the queue
    addToQueue(eventPayload);
  } catch (error) {
    console.error("[Analytics SDK] Error tracking event:", error);
  }
}
