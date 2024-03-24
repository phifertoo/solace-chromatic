import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditModal from "./EditModal";

describe("EditModal", () => {
  const mockOnClose = jest.fn();
  const mockOnUpdate = jest.fn();

  beforeEach(() => {
    render(
      <EditModal
        isOpen={true}
        onClose={mockOnClose}
        initialContent="This is a test note"
        onUpdate={mockOnUpdate}
      />
    );
  });

  it("should display initial content in textarea", () => {
    expect(screen.getByRole("textbox")).toHaveValue("This is a test note");
  });

  it("validates content length and displays an error message for short content", async () => {
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "short" } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(
        screen.getByText("Content must be at least 20 characters")
      ).toBeInTheDocument();
    });
  });
});
