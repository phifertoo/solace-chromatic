import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Note, { NoteProps } from "./Note";
import { INote } from "@/models/note"; // Make sure to adjust the path as needed
import "@testing-library/jest-dom";

// Mock EditModal component
jest.mock("./EditModal", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="edit-modal" />),
}));

// Sample note data
const sampleNote: INote = {
  id: "1",
  userId: "user123", // Add the userId property with a sample value
  content: "Sample note content",
  updatedAt: "2024-03-25T12:00:00Z", // Assuming updatedAt is in ISO string format
};

describe("Note Component", () => {
  let onDelete: jest.Mock;
  let onUpdate: jest.Mock;
  let props: NoteProps;

  beforeEach(() => {
    onDelete = jest.fn();
    onUpdate = jest.fn();
    props = {
      note: sampleNote,
      onDelete,
      onUpdate,
    };
  });

  it("renders note content and buttons correctly", () => {
    const { getByText, getByTestId } = render(<Note {...props} />);

    expect(getByText(sampleNote.content)).toBeInTheDocument();
    expect(getByText("Delete")).toBeInTheDocument();
    expect(getByText("Edit")).toBeInTheDocument();
    expect(getByTestId("edit-modal")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    const { getByText } = render(<Note {...props} />);

    fireEvent.click(getByText("Delete"));

    expect(onDelete).toHaveBeenCalledWith(sampleNote.id);
  });
});
