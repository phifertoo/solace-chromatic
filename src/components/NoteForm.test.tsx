import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import NoteForm from "./NoteForm";
import "@testing-library/jest-dom";

// Mocking useAuth and useNotes hooks
jest.mock("./providers/AuthProvider", () => ({
  useAuth: jest.fn(() => ({ currentUser: { id: "user123" } })),
}));

jest.mock("./providers/NotesProvider", () => ({
  useNotes: jest.fn(() => ({ setNotes: jest.fn() })),
}));

describe("NoteForm Component", () => {
  it("displays error message for invalid data", async () => {
    const { getByPlaceholderText, getByText } = render(<NoteForm />);
    const textarea = getByPlaceholderText("Write your note here...");
    const submitButton = getByText("Submit");

    fireEvent.change(textarea, { target: { value: "Short" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        getByText("Note must be between 20 and 300 characters.")
      ).toBeInTheDocument();
    });
  });
});
