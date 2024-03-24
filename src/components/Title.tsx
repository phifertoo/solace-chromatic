import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const Title: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <Flex justifyContent="center" my={12}>
      <Text fontSize="48px" fontWeight="bold">
        {title}
      </Text>
    </Flex>
  );
};

export default Title;
