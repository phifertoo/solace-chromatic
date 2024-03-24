"use client";
import React from "react";
import { Box } from "@chakra-ui/react";
import Main from "./Main";
import Header from "./Header";

const Home: React.FC = () => {
  return (
    <Box width="100%">
      <Header />
      <Main />
    </Box>
  );
};

export default Home;
