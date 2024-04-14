import React from "react";
import { Text, Center } from "@chakra-ui/react";

const EmptyState = () => {
  return (
    <Center flexDirection="column" mt="20">
      <Text fontSize="lg" mb="4">
        You have no notes yet. abc. Create your first note below!
      </Text>
    </Center>
  );
};

export default EmptyState;
