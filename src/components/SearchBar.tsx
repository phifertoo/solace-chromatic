import React, { useState } from "react";
import { useNotes } from "./providers/NotesProvider";
import { Input } from "@chakra-ui/react";

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const { setSearchQuery } = useNotes();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    setSearchQuery(newValue); // Update the search query in the context
  };

  return (
    <Input
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Search notes..."
      size="md"
      mt={6}
      mb={8}
    />
  );
};

export default SearchBar;
