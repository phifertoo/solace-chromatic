import React from "react";
import { Text, Center } from "@chakra-ui/react";

const EmptyState: React.FC<{ additionalText: string }> = ({
  additionalText,
}) => {
  return (
    <Center flexDirection="column" mt="20">
      <Text fontSize="lg" mb="4">
        {additionalText} You have no notes yet. Create your first note below!
      </Text>
    </Center>
  );
};

export default EmptyState;
