import React from "react";
import {
  FlexProps,
  Text,
  Button,
  Flex,
  useColorModeValue,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { INote } from "@/models/note";
import EditModal from "./EditModal";

export interface NoteProps extends FlexProps {
  note: INote;
  onDelete: (noteId: string) => void;
  onUpdate: (noteId: string, newContent: string) => void;
}

export const Note: React.FC<NoteProps> = ({
  note,
  onDelete,
  onUpdate,
  ...props
}) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const hoverBg = useColorModeValue("gray.200", "gray.600");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Assuming note.updatedAt is an ISO string
  const updatedDateTime = new Date(note.updatedAt).toLocaleString();

  return (
    <Flex
      direction="column"
      p={5}
      rounded="md"
      bg={bg}
      _hover={{ bg: hoverBg }}
      {...props}
    >
      <Flex justify="space-between">
        <Spacer />
        <Text fontSize="sm" color="gray.500">
          {updatedDateTime}
        </Text>
      </Flex>
      <Text fontWeight="semibold" my={4}>
        {note.content}
      </Text>{" "}
      <Flex justify="space-between">
        <Button colorScheme="red" size="sm" onClick={() => onDelete(note.id)}>
          Delete
        </Button>
        <Button colorScheme="blue" size="sm" onClick={onOpen}>
          Edit
        </Button>
        <EditModal
          isOpen={isOpen}
          onClose={onClose}
          initialContent={note.content}
          onUpdate={(newContent) => onUpdate(note.id, newContent)}
        />
      </Flex>
    </Flex>
  );
};

export default Note;
