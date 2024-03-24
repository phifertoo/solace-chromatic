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

// Define the type for the note

// Define the type for the context
interface NotesContextType {
  notes: INote[];
  // filteredNotes: INote[];
  isLoading: boolean;
  error: Error | null;
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
  removeNote: (noteId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Create the context
const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Define the provider props
interface NotesProviderProps {
  children: ReactNode;
}

// Provider component
export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState<INote[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);
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
          //   const response = await getNotes(currentUser.id);
          const response = await fetchData(
            `http://localhost:3000/api/notes?userId=${currentUser?.id}`,
            {
              // Assuming this endpoint accepts POST to fetch notes
              method: "GET",
            }
          );
          response.map((r: any, i: any) => {
            response[i].updatedAt = new Date(
              r.updatedAt._seconds * 1000
            ).toLocaleDateString();
          });
          setNotes(response);
        } catch (err) {
          if (err instanceof Error) setError(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchNotes();
  }, [currentUser?.id]); // Dependency array to re-fetch when userId changes
  useEffect(() => {
    // Filter notes whenever the searchQuery changes or the notes list changes
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = notes.filter((note) =>
      note.content.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredNotes(filtered);
  }, [notes, searchQuery]);
  return (
    <NotesContext.Provider
      value={{
        notes,
        // filteredNotes,
        isLoading,
        error,
        setNotes,
        removeNote,
        searchQuery,
        setSearchQuery, // Allow consumers to set the search query
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

// Custom hook to use the context
export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};
