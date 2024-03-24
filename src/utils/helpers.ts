import { INote } from "../models/note";

export const isValidContent = (newContent: string) => {
  return !newContent || newContent.length < 20 || newContent.length > 300;
};

export const formatNoteData = (
  response: any,
  setNotes: (value: React.SetStateAction<INote[]>) => void
) => {
  response.map((r: any, i: any) => {
    response[i].updatedAt = new Date(
      r.updatedAt._seconds * 1000 + r.updatedAt._nanoseconds / 1000000
    );
  });
  setNotes(response);
};
