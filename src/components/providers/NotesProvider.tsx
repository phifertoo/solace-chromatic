import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "./AuthProvider";
import { fetchData } from "@/utils/api";
import { INote } from "@/models/note";
import { formatNoteData } from "@/utils/helpers";

interface NotesContextType {
  notes: INote[];
  isLoading: boolean;
  error: Error | null;
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  removeNote: (noteId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

interface NotesProviderProps {
  children: ReactNode;
}

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState<INote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const removeNote = (noteId: string) => {
    setNotes((currentNotes) =>
      currentNotes.filter((note) => note.id !== noteId)
    );
  };
  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setError(null);
      if (currentUser?.id) {
        try {
          const response = await fetchData(
            `/api/notes?userId=${currentUser?.id}`,
            {
              method: "GET",
            }
          );
          formatNoteData(response, setNotes);
        } catch (err) {
          if (err instanceof Error) setError(err);
        }
      }
      setIsLoading(false);
    };

    fetchNotes();
  }, [currentUser?.id]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        error,
        setNotes,
        removeNote,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
