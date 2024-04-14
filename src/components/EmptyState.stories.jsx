// EmptyState.stories.jsx
import React from "react";
import { Center, Text } from "@chakra-ui/react";
import EmptyState from "./EmptyState";

export default {
  title: "Components/EmptyState",
  component: EmptyState,
  argTypes: {
    // This helps with controlling types for args in Storybook's controls panel
    additionalText: { control: "text" },
  },
};

// Template function to create instances of EmptyState
const Template = (args) => <EmptyState {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
  additionalText: "Hello, ", // Example text that could be dynamically added
};

// Another variant with different additional text
export const CustomMessage = Template.bind({});
CustomMessage.args = {
  additionalText: "Welcome back, ",
};

// A story without any additional text
export const NoAdditionalText = Template.bind({});
NoAdditionalText.args = {
  additionalText: "",
};

// // EmptyState.stories.jsx
// import React from "react";
// import { ChakraProvider, CSSReset } from "@chakra-ui/react";
// import EmptyState from "./EmptyState";

// export default {
//   title: "Components/EmptyState",
//   component: EmptyState,
// };

// const Template = (args) => (
//   <ChakraProvider>
//     <CSSReset />
//     <EmptyState {...args} />
//   </ChakraProvider>
// );

// export const Default = Template.bind({});
