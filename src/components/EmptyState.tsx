import React from "react";
import { Text, Center } from "@chakra-ui/react";

const EmptyState = () => {
  return (
    <Center flexDirection="column" mt="20">
      <Text fontSize="lg" mb="4">
        aaa. You have no notes yet. Create your first note below!
      </Text>
    </Center>
  );
};

export default EmptyState;
