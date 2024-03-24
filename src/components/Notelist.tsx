"use client";
import React from "react";
import { Box, useToast } from "@chakra-ui/react";
import { useNotes } from "./providers/NotesProvider";
import { fetchData } from "@/utils/api";
import Note from "./Note";
import { INote } from "@/models/note";

const NoteList = () => {
  const { notes, removeNote, searchQuery, setNotes } = useNotes();
  const toast = useToast();

  const onDelete = async (noteId: string) => {
    try {
      removeNote(noteId);

      await fetchData(`http://localhost:3000/api/notes?noteId=${noteId}`, {
        method: "DELETE",
      });

      toast({
        title: "Note Deleted Successfully!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Deleting Note",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  const onUpdate = async (noteId: string, newContent: string) => {
    try {
      // Call the API to update the note
      const response = await fetchData(
        `http://localhost:3000/api/notes/${noteId}`,
        {
          method: "PUT",
          body: { newContent },
        }
      );

      setNotes((currentNotes: INote[]): INote[] =>
        currentNotes.map((note: INote) =>
          note.id === noteId
            ? {
                ...note,
                content: newContent,
                updatedAt: new Date().toISOString(),
              }
            : note
        )
      );

      toast({
        title: "Note Updated Successfully!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Updating Note",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      {notes
        .filter((n) => n.content.toLocaleLowerCase().includes(searchQuery))
        .map((note, i) => (
          <Note
            note={note}
            onDelete={onDelete}
            mt={i !== 0 ? 4 : 0}
            onUpdate={onUpdate}
          />
        ))}
    </Box>
  );
};

export default NoteList;
