"use client";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./Home";
import { AuthProvider } from "./providers/AuthProvider";
import { NotesProvider } from "./providers/NotesProvider";

const Main: React.FC = () => {
  return (
    <AuthProvider>
      <ChakraProvider>
        <NotesProvider>
          <Home />
        </NotesProvider>
      </ChakraProvider>
    </AuthProvider>
  );
};

export default Main;
