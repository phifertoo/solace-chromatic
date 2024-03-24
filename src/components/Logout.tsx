import React from "react";
import { Button } from "@chakra-ui/react";
import { useAuth } from "./providers/AuthProvider";
import { useNotes } from "./providers/NotesProvider";

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const { setNotes } = useNotes();
  const handleLogout = async () => {
    try {
      await logout(); // Use the logout method from AuthContext
      setNotes([]);
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return <Button onClick={handleLogout}>Sign Out</Button>;
};

export default Logout;
