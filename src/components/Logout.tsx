import React from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useAuth } from "./providers/AuthProvider";
import { useNotes } from "./providers/NotesProvider";

const Logout: React.FC = () => {
  const { logout } = useAuth();
  const { setNotes } = useNotes();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout(); // Use the logout method from AuthContext
      setNotes([]);
      toast({
        title: "Signed Out Successfully!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error Signing Out",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return <Button onClick={handleLogout}>Sign Out</Button>;
};

export default Logout;
