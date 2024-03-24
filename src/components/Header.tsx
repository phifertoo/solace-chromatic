"use client";
import React from "react";
import Login from "./Login";
import { Flex } from "@chakra-ui/react";
import Logout from "./Logout";
import { useAuth } from "./providers/AuthProvider";

const Header: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <Flex mb={8} justifyContent="flex-end">
      <Flex>
        <Login />
        {currentUser && <Logout />}
      </Flex>
    </Flex>
  );
};

export default Header;
