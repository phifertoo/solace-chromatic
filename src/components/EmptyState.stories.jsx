// EmptyState.stories.jsx
import React from "react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import EmptyState from "./EmptyState";

export default {
  title: "Components/EmptyState",
  component: EmptyState,
};

const Template = (args) => (
  <ChakraProvider>
    <CSSReset />
    <EmptyState {...args} />
  </ChakraProvider>
);

export const Default = Template.bind({});
