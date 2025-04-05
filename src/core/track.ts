import { EventProperties, EventPayload } from "../types";
import { getConfig, getSessionId } from "./config";
import { addToQueue } from "./queue";
import { getBrowserInfo, debugLog } from "../utils";

/**
 * Tracks an analytics event with the given name and optional properties
 * @param eventType Type of the event to track
 * @param eventData Optional custom data for this event
 */
export function trackEvent(eventType: string, eventData: EventProperties = {}): void {
  try {
    const config = getConfig();
    const { url, browser, device } = getBrowserInfo();

    // Create the event payload
    const eventPayload: EventPayload = {
      type: eventType,
      data: eventData,
      timestamp: Date.now(),
      url,
      browser,
      device,
      sessionId: getSessionId(),
    };

    debugLog(config.debug || false, "Tracking event", {
      type: eventType,
      data: eventData,
    });

    // Add the event to the queue
    addToQueue(eventPayload);
  } catch (error) {
    console.error("[Analytics SDK] Error tracking event:", error);
  }
}
