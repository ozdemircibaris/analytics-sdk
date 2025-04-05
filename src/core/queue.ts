import { EventPayload } from "../types";
import { getConfig } from "./config";
import { debugLog } from "../utils";

// Event queue for batching
let eventQueue: EventPayload[] = [];
let flushInterval: number | null = null;

/**
 * Sets up the event queue and starts the flush interval
 */
export function setupEventQueue(): void {
  const { batchInterval } = getConfig();

  // Clear any existing interval
  if (flushInterval !== null) {
    clearInterval(flushInterval);
  }

  // Set up new flush interval
  flushInterval = window.setInterval(() => {
    flushQueue();
  }, batchInterval);
}

/**
 * Adds an event to the queue and flushes if batch size is reached
 */
export function addToQueue(event: EventPayload): void {
  const config = getConfig();

  eventQueue.push(event);

  debugLog(config.debug || false, "Event added to queue", {
    queueSize: eventQueue.length,
    event,
  });

  // If we've reached the batch size, flush the queue
  if (eventQueue.length >= config.batchSize!) {
    flushQueue();
  }
}

/**
 * Sends queued events to the analytics endpoint
 */
export function flushQueue(): void {
  const config = getConfig();

  if (eventQueue.length === 0) {
    return;
  }

  const eventsToSend = [...eventQueue];
  eventQueue = [];

  debugLog(config.debug || false, "Flushing event queue", {
    count: eventsToSend.length,
  });

  // Send events to endpoint
  fetch(config.endpoint!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": config.apiKey,
      "X-Client-ID": config.clientId,
      "X-Client-Secret": config.clientSecret,
    },
    body: JSON.stringify({ events: eventsToSend }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      debugLog(config.debug || false, "Events sent successfully", {
        count: eventsToSend.length,
      });
      return response.json();
    })
    .catch((error) => {
      console.error("[Analytics SDK] Error sending events:", error);
      // Re-add events back to queue on failure
      // This is a simple retry approach - could be enhanced with exponential backoff
      eventQueue = [...eventsToSend, ...eventQueue];
    });
}
