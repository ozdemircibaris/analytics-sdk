import { UserData } from "../types";
import { setUserData, getConfig } from "./config";
import { debugLog } from "../utils";
import { trackEvent } from "./track";

/**
 * Identifies a user with the provided user data
 * This allows subsequent events to be associated with this user
 * Automatically triggers an 'identify' event
 *
 * @param userData User identification data
 */
export function identifyUser(userData: UserData): void {
  try {
    const config = getConfig();

    // Validate user data
    if (!userData.id) {
      throw new Error("User ID is required for identification");
    }

    // Store the user data
    setUserData(userData);

    // Create a sanitized version of user data to avoid logging sensitive info
    const userDataForLogging = {
      ...userData,
      id: userData.id,
      // Don't include potentially sensitive fields in logging
      email: userData.email ? "***" : undefined,
    };

    debugLog(config.debug || false, "User identified", {
      userId: userData.id,
      properties: userDataForLogging,
    });

    // Automatically track an identify event
    // This will happen after the user is identified, so the user data will be included
    trackEvent("identify", {
      // Include any properties you want to track with the identify event
      identifyMethod: "explicit", // This was an explicit identification call
      isNewUser: false, // You might want to determine this based on your app logic
      // Include the user data properties directly in the event
      userId: userData.id,
      // Add common user properties directly in the event data
      ...(userData.name ? { name: userData.name } : {}),
      ...(userData.email ? { email: userData.email } : {}),
      // Add any other custom properties from userData
      ...Object.entries(userData)
        .filter(([key]) => !["id", "name", "email"].includes(key))
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {}),
    });
  } catch (error) {
    console.error("[Analytics SDK] Error identifying user:", error);
    throw error;
  }
}
