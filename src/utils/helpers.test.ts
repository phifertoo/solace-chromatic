// pathToYourFunction.test.ts
import { isValidContent } from "./helpers"; // Adjust the import path accordingly

describe("isValidContent", () => {
  test("returns true for empty string", () => {
    expect(isValidContent("")).toBe(true);
  });

  test("returns true for content less than 20 characters", () => {
    expect(isValidContent("short")).toBe(true);
  });

  test("returns false for content of 20 characters", () => {
    const twentyChars: string = "12345678901234567890"; // exactly 20 characters
    expect(isValidContent(twentyChars)).toBe(false);
  });

  test("returns false for content between 20 and 300 characters", () => {
    const validContent: string = "a".repeat(25); // 25 characters long, which is valid
    expect(isValidContent(validContent)).toBe(false);
  });

  test("returns false for content of 300 characters", () => {
    const threeHundredChars: string = "a".repeat(300); // exactly 300 characters
    expect(isValidContent(threeHundredChars)).toBe(false);
  });

  test("returns true for content more than 300 characters", () => {
    const longContent: string = "a".repeat(301); // 301 characters long, which is invalid
    expect(isValidContent(longContent)).toBe(true);
  });
});
