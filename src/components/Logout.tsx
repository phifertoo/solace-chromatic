import React from "react";
import { Button } from "@chakra-ui/react";
import { useAuth } from "./providers/AuthProvider"; // Adjust the import path according to your file structure
import { useNotes } from "./providers/NotesProvider";

const Logout: React.FC = () => {
  const { logout } = useAuth(); // Destructure the logout method from the context
  const { setNotes } = useNotes();
  const handleLogout = async () => {
    try {
      await logout(); // Use the logout method from AuthContext
      setNotes([]);
      console.log("User signed out successfully.");
      // Optionally, handle any post-logout logic here (e.g., updating local state, redirecting)
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle errors (e.g., show a notification to the user)
    }
  };

  return <Button onClick={handleLogout}>Sign Out</Button>;
};

export default Logout;
