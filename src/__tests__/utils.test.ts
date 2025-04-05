import { generateUUID, debugLog } from "../utils";

describe("Utils", () => {
  describe("generateUUID", () => {
    it("should generate a valid UUID v4 string", () => {
      const uuid = generateUUID();
      expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it("should generate unique UUIDs", () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe("debugLog", () => {
    let consoleLogSpy: jest.SpyInstance;

    beforeEach(() => {
      consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
    });

    afterEach(() => {
      consoleLogSpy.mockRestore();
    });

    it("should log when debug is true", () => {
      debugLog(true, "Test message");
      expect(consoleLogSpy).toHaveBeenCalledWith("[Analytics SDK]:", "Test message");
    });

    it("should not log when debug is false", () => {
      debugLog(false, "Test message");
      expect(consoleLogSpy).not.toHaveBeenCalled();
    });
  });
});
