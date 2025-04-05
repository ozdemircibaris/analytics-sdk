// Import the SDK
import { initAnalytics, trackEvent } from "@your-org/analytics-sdk";

// Initialize the SDK with your API key and endpoint
initAnalytics({
  apiKey: "your-api-key-here",
  endpoint: "https://your-analytics-endpoint.com/events",
  debug: true, // Enable debug logs
  batchSize: 5, // Send events in batches of 5
  batchInterval: 10000, // Or every 10 seconds, whichever comes first
});

// Track a simple page view
trackEvent("page_view", {
  page: window.location.pathname,
  referrer: document.referrer,
});

// Track a button click
document.getElementById("signup-button").addEventListener("click", () => {
  trackEvent("button_click", {
    button_id: "signup-button",
    button_text: "Sign Up",
  });
});

// Track form submission
document.getElementById("contact-form").addEventListener("submit", () => {
  trackEvent("form_submit", {
    form_id: "contact-form",
    form_success: true,
  });
});
