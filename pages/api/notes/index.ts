import type { NextApiRequest, NextApiResponse } from "next";
import admin from "../../../src/utils/firebaseServer"; // Ensure you're exporting both admin and db from firebaseAdmin.ts
import { authenticate } from "@/utils/authMiddleware";
import { isValidContent } from "@/utils/helpers";

type Data = { message: string; id?: string } | { message: string } | any; // To allow returning arrays or other types
const db = admin.firestore();

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await authenticate(req);
  } catch (error) {
    console.error("Authentication error", error);
    return res.status(401).json({ message: "Unauthorized" });
  }

  switch (req.method) {
    case "POST":
      const { content, userId } = req.body;

      if (isValidContent(content)) {
        return res.status(400).json({
          message: "Note content must be between 20 and 300 characters.",
        });
      }

      try {
        const docRef = await db.collection("notes").add({
          content,
          userId,
          updatedAt: new Date(), // Use the client's current date and time
        });
        return res
          .status(201)
          .json({ message: "Note added successfully.", id: docRef.id });
      } catch (error) {
        console.error("Failed to add note", error);
        return res.status(500).json({ message: "Failed to add note." });
      }

    case "GET":
      try {
        const userId = req.query.userId as string;
        const querySnapshot = await db
          .collection("notes")
          .where("userId", "==", userId)
          .get();
        const notes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return res.status(200).json(notes);
      } catch (error) {
        console.error("Failed to get notes", error);
        return res.status(500).json({ message: "Failed to get notes." });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
