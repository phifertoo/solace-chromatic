import React from "react";
import { useState } from "react";
import {
  Button,
  Textarea,
  FormControl,
  FormErrorMessage,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormFields } from "@/models/form";
import { fetchData } from "@/utils/api";
import { FormBody } from "@/models/form";
import { useAuth } from "./providers/AuthProvider";
import { useNotes } from "./providers/NotesProvider";
import { formatNoteData } from "@/utils/helpers";

const NoteForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<FormFields>();
  const toast = useToast();

  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { setNotes } = useNotes();

  const onSubmit = async (values: FormFields) => {
    // make post request to
    try {
      setIsLoading(true);
      const notesBody: FormBody = {
        content: watch("content"),
        userId: currentUser?.id || "",
      };
      await fetchData("/api/notes", {
        method: "POST",
        body: notesBody,
      });

      //   fetch all posts
      const response = await fetchData(`/api/notes?userId=${currentUser?.id}`, {
        method: "GET",
      });
      setValue("content", "");
      formatNoteData(response, setNotes);
      setIsLoading(false);
      toast({
        title: "Note Created Successfully!",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (creationError) {
      setIsLoading(false);
      toast({
        title: "Error Creating Note",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.stopPropagation();
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
    >
      {" "}
      <FormControl isRequired isInvalid={!!errors.content}>
        <Textarea
          placeholder="Write your note here..."
          size="md"
          mb={4}
          {...register("content", {
            validate: (value) => {
              if (!currentUser) {
                return "Please sign in";
              }
              return (
                (value.length >= 20 && value.length <= 200) ||
                "Note must be between 20 and 200 characters."
              );
            },
          })}
        />
        <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
      </FormControl>
      <Flex justifyContent="center">
        <Button colorScheme="blue" type="submit" isLoading={isLoading}>
          Submit
        </Button>
      </Flex>
    </form>
  );
};

export default NoteForm;
