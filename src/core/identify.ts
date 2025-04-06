import { UserData } from "../types";
import { setUserData, getConfig } from "./config";
import { debugLog } from "../utils";

/**
 * Identifies a user with the provided user data
 * This allows subsequent events to be associated with this user
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

    debugLog(config.debug || false, "User identified", {
      userId: userData.id,
      properties: { ...userData, id: undefined },
    });
  } catch (error) {
    console.error("[Analytics SDK] Error identifying user:", error);
    throw error;
  }
}
