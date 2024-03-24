import React from "react";
import { Button, Text, Flex } from "@chakra-ui/react";
import { useAuth } from "./providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";

const Login: React.FC = () => {
  const { currentUser, loginWithGoogle } = useAuth();

  return currentUser ? (
    <Flex alignItems="center" mr={4}>
      <Text>Welcome, {currentUser.name}</Text>
    </Flex>
  ) : (
    <Button leftIcon={<FcGoogle />} onClick={loginWithGoogle}>
      Sign in with Google
    </Button>
  );
};

export default Login;
