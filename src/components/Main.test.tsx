import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./Main";

// Mock the useNotes hook
jest.mock("./providers/NotesProvider", () => ({
  useNotes: jest.fn(),
}));

// Mock the useAuth hook
jest.mock("./providers/AuthProvider", () => ({
  useAuth: jest.fn(),
}));

describe("Main Component", () => {
  it("displays the loading state correctly", () => {
    // Mock the return value of useNotes to simulate loading state
    (
      jest.requireMock("./providers/NotesProvider") as any
    ).useNotes.mockReturnValue({ isLoading: true, notes: [] });
    // Mock the return value of useAuth to simulate loading state
    (
      jest.requireMock("./providers/AuthProvider") as any
    ).useAuth.mockReturnValue({ isLoading: true });

    const { getByTestId, getByText } = render(<Main />);

    // Assert that loading skeleton is displayed
    expect(getByTestId("loading-skeleton")).toBeInTheDocument(); // Correct assertion

    // Example: assert that the title is displayed
    expect(getByText("Lance Watanabe's Notes Project")).toBeInTheDocument();
  });
});
