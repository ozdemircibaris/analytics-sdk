import { EventPayload } from "../types";
import { getConfig, API_ENDPOINT } from "./config";
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
 * Sends a single event to the analytics endpoint
 * @param event The event to send
 * @returns Promise resolving to successful response or error
 */
async function sendSingleEvent(event: EventPayload): Promise<boolean> {
  try {
    const config = getConfig();

    // Prepare the event object in the format the API expects
    const eventPayload = {
      type: event.type,
      data: event.data,
      url: event.url,
      browser: event.browser,
      device: event.device,
      user: event.user,
      // Note: API doesn't use sessionId or timestamp, so we don't send them
    };

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": config.apiKey,
        "X-Client-ID": config.clientId,
        "X-Client-Secret": config.clientSecret,
      },
      body: JSON.stringify(eventPayload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("[Analytics SDK] Error sending event:", error);
    return false;
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

  debugLog(config.debug || false, "Flushing event queue", {
    count: eventQueue.length,
    endpoint: API_ENDPOINT,
  });

  // Take a copy of the current queue for processing
  const eventsToProcess = [...eventQueue];
  eventQueue = [];

  // Process events one by one
  (async () => {
    const failedEvents: EventPayload[] = [];

    for (const event of eventsToProcess) {
      const success = await sendSingleEvent(event);

      if (!success) {
        failedEvents.push(event);
      }
    }

    // Add failed events back to the queue for retrying later
    if (failedEvents.length > 0) {
      debugLog(config.debug || false, "Re-queuing failed events", {
        count: failedEvents.length,
      });

      // Add failed events back to the front of the queue
      eventQueue = [...failedEvents, ...eventQueue];
    } else {
      debugLog(config.debug || false, "All events sent successfully", {
        count: eventsToProcess.length,
      });
    }
  })();
}
