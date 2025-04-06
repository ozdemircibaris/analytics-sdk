// Import the SDK
import { initAnalytics, identifyUser, trackEvent } from "@ozdemircibaris/analytics-sdk";

// Initialize the SDK with your API key, client ID, and client secret
initAnalytics({
  apiKey: "your-api-key-here",
  clientId: "your-client-id-here",
  clientSecret: "your-client-secret-here",
  debug: true, // Enable debug logs
});

// Example: When a user logs in, identify them
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  // Get user information from the form
  const userId = document.getElementById("user-id").value;
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;

  // Perform login logic here...

  // Identify the user in the analytics SDK
  identifyUser({
    id: userId, // Required: Unique user identifier
    name, // Optional: User's name (explicitly specified in UserData interface)
    email, // Optional: User's email (explicitly specified in UserData interface)
    loginTimestamp: Date.now(), // Additional custom property
  });

  // Note: The SDK automatically triggers an 'identify' event when identifyUser is called
  // The identify event will include all user properties in the event data
  // No need to manually track an identify event

  // Track the login event
  trackEvent("user_logged_in", {
    method: "email", // These properties are specific to this event
    rememberMe: document.getElementById("remember-me").checked,
  });

  // The user data will now be automatically included with all subsequent events
  // without having to pass it to each trackEvent() call
});

// Example: Track a purchase event later in the user session
// The user data will automatically be included
document.getElementById("purchase-button").addEventListener("click", () => {
  trackEvent("purchase_completed", {
    productId: "prod-123",
    price: 99.99,
    currency: "USD",
  });

  // The event will include the user data that was set when identifyUser() was called
});
