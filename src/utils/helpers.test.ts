import { isValidContent, formatNoteData } from "./helpers";

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

describe("formatNoteData", () => {
  it("should format note data correctly", () => {
    // Mock setNotes function
    const setNotesMock = jest.fn();

    // Sample response data
    const response = [
      {
        id: "1",
        content: "Sample content",
        updatedAt: { _seconds: 1711268584, _nanoseconds: 907000000 },
      },
    ];

    formatNoteData(response, setNotesMock);

    expect(response[0].updatedAt).toEqual(new Date("2024-03-24T08:23:04.907Z"));
  });
});
