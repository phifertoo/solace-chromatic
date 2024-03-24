import { isValidContent } from "./helpers";

describe("isValidContent", () => {
  test("returns true for empty string", () => {
    expect(isValidContent("")).toBe(true);
  });

  test("returns true for content less than 20 characters", () => {
    expect(isValidContent("short")).toBe(true);
  });

  test("returns false for content of 20 characters", () => {
    const twentyChars: string = "12345678901234567890";
    expect(isValidContent(twentyChars)).toBe(false);
  });

  test("returns false for content between 20 and 300 characters", () => {
    const validContent: string = "a".repeat(25);
    expect(isValidContent(validContent)).toBe(false);
  });

  test("returns false for content of 300 characters", () => {
    const threeHundredChars: string = "a".repeat(300);
    expect(isValidContent(threeHundredChars)).toBe(false);
  });

  test("returns true for content more than 300 characters", () => {
    const longContent: string = "a".repeat(301);
    expect(isValidContent(longContent)).toBe(true);
  });
});
