import { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../src/utils/firebaseServer"; // Adjust the import path as necessary

const db = admin.firestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
    body,
  } = req;

  switch (method) {
    case "PUT":
      const { newContent } = body;
      if (!newContent || newContent.length < 20 || newContent.length > 300) {
        res
          .status(400)
          .json({ message: "Content must be between 20 and 300 characters." });
        return;
      }

      // Check if ID is provided and correctly formatted
      if (!id || Array.isArray(id)) {
        res.status(400).json({ message: "Invalid or missing note ID." });
        return;
      }

      try {
        const noteRef = db.collection("notes").doc(id.toString());
        await noteRef.update({ content: newContent });
        res.status(200).json({ message: "Note updated successfully." });
      } catch (error) {
        console.error("Failed to update note:", error);
        res.status(500).json({ message: "Failed to update note." });
      }
      break;

    case "DELETE":
      // Validate ID
      if (!id || Array.isArray(id)) {
        res.status(400).json({ message: "Invalid or missing note ID." });
        return;
      }

      try {
        const noteRef = db.collection("notes").doc(id.toString());
        // Check if the document exists before attempting to delete
        const doc = await noteRef.get();
        if (!doc.exists) {
          res.status(404).json({ message: "Note not found." });
          return;
        }

        await noteRef.delete(); // Delete the document
        res.status(200).json({ message: "Note deleted successfully." });
      } catch (error) {
        console.error("Failed to delete note:", error);
        res.status(500).json({ message: "Failed to delete note." });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import { Note } from "@/models/note";
// import admin from "../../../src/utils/firebaseServer"; // Ensure you're exporting both admin and db from firebaseAdmin.ts
// const db = admin.firestore();

// let notes: Note[]; // This should be imported from a shared location

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const {
//     query: { id },
//     method,
//   } = req;

//   const noteIndex = notes.findIndex((n) => n.id === id);
//   if (noteIndex === -1) {
//     res.status(404).json({ message: "Note not found" });
//     return;
//   }

//   switch (method) {
//     case "PUT":
//       // Validate and update note content
//       // const { content } = req.body;
//       // if (!content || content.length < 20 || content.length > 300) {
//       //   res
//       //     .status(400)
//       //     .json({ message: "Content must be between 20 and 300 characters." });
//       //   return;
//       // }
//       // notes[noteIndex].content = content;
//       const { newContent } = req.body;

//       if (
//         !id ||
//         !newContent ||
//         newContent.length < 20 ||
//         newContent.length > 300
//       ) {
//         return res.status(400).json({
//           message:
//             "Missing note ID or new content is not within the required length.",
//         });
//       }

//       try {
//         const noteRef = db
//           .collection("notes")
//           .doc(Array.isArray(id) ? id[0] : id);
//         await noteRef.update({ content: newContent });
//         return res.status(200).json({ message: "Note updated successfully." });
//       } catch (error) {
//         console.error("Failed to update note", error);
//         return res.status(500).json({ message: "Failed to update note." });
//       }
//       res.status(200).json(notes[noteIndex]);
//       break;
//     case "DELETE":
//       notes.splice(noteIndex, 1);
//       res.status(204).end();
//       break;
//     default:
//       res.setHeader("Allow", ["PUT", "DELETE"]);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
