import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import NoteList from "./Notelist";
import { useNotes } from "./providers/NotesProvider";

// Mock the useNotes hook
jest.mock("./providers/NotesProvider", () => ({
  useNotes: jest.fn(),
}));

// Mock the fetchData function
jest.mock("@/utils/api", () => ({
  fetchData: jest.fn(),
}));

describe("NoteList Component", () => {
  // Define mocked notes data
  const mockedNotes = [
    { id: "1", content: "Note 1", updatedAt: "2024-03-25T12:00:00Z" },
    { id: "2", content: "Note 2", updatedAt: "2024-03-25T12:00:00Z" },
  ];

  beforeEach(() => {
    // Mock the return value of useNotes for each test case
    (
      jest.requireMock("./providers/NotesProvider") as any
    ).useNotes.mockReturnValue({
      notes: mockedNotes,
      removeNote: jest.fn(),
      searchQuery: "",
      setNotes: jest.fn(),
    });
  });

  it("calls removeNote when delete button is clicked", async () => {
    const { getAllByText } = render(<NoteList />);
    const deleteButtons = getAllByText("Delete");
    fireEvent.click(deleteButtons[0]); // Click the first delete button
    // Ensure that removeNote is called with the correct note id
    await waitFor(() => {
      expect(useNotes().removeNote).toHaveBeenCalledWith(mockedNotes[0].id);
    });
  });
});
