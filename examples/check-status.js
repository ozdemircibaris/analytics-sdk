// Import the SDK
import {
  initAnalytics,
  identifyUser,
  trackEvent,
  isInitialized,
  isUserIdentified,
} from "@ozdemircibaris/analytics-sdk";

// Check if SDK is initialized before any operations
if (!isInitialized()) {
  console.log("SDK is not initialized yet. Initializing now...");

  // Initialize the SDK with your API key, client ID, and client secret
  initAnalytics({
    apiKey: "your-api-key-here",
    clientId: "your-client-id-here",
    clientSecret: "your-client-secret-here",
    debug: true, // Enable debug logs
  });

  console.log("SDK is now initialized:", isInitialized());
} else {
  console.log("SDK was already initialized");
}

// Example: Conditional user identification
function handleLogin(userId, userData) {
  // First check if the user is already identified
  if (!isUserIdentified()) {
    console.log("User is not identified. Identifying now...");

    // Identify the user
    identifyUser({
      id: userId,
      name: userData.name,
      email: userData.email,
      // Additional properties
      loginCount: userData.loginCount,
      isPremium: userData.isPremium,
    });

    console.log("User is now identified:", isUserIdentified());

    // Track a login event
    trackEvent("user_logged_in", {
      method: "email",
      timestamp: Date.now(),
    });
  } else {
    console.log("User was already identified");

    // Just track the login event
    trackEvent("user_logged_in_again", {
      method: "auto",
      timestamp: Date.now(),
    });
  }
}

// Example usage in a form submission
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const userId = document.getElementById("user-id").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  handleLogin(userId, {
    name,
    email,
    loginCount: 1,
    isPremium: false,
  });
});
