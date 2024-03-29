// pages/api/users/[id].ts

import type { NextApiRequest, NextApiResponse } from "next";
import admin from "@/utils/firebaseServer";
import { authenticate } from "@/utils/authMiddleware";
import { UserRequestBody, UserResponseData } from "@/models/user";

const db = admin.firestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponseData>
) {
  try {
    await authenticate(req);

    // Extract the user ID from the URL
    const { id: userId } = req.query;

    if (!userId || typeof userId !== "string") {
      return res.status(400).json({ message: "Invalid user ID." });
    }

    const { name, email }: UserRequestBody = req.body;

    switch (req.method) {
      case "GET":
        try {
          const userDocRef = await db.collection("users").doc(userId).get();

          if (!userDocRef.exists) {
            return res.status(404).json({ message: "User not found." });
          }

          return res.status(200).json({
            message: "User data",
            data: userDocRef.data() as UserRequestBody,
          });
        } catch (error) {
          console.error("Error getting user:", error);
          return res.status(500).json({
            message: "Error getting user",
            error: error instanceof Error ? error.message : "",
          });
        }

      case "PUT":
        if (!name || !email) {
          return res
            .status(400)
            .json({ message: "Missing name or email in request body." });
        }

        try {
          await db.collection("users").doc(userId).update({ name, email });
          return res
            .status(200)
            .json({ message: "User updated successfully." });
        } catch (error) {
          console.error("Error updating user:", error);
          return res.status(500).json({
            message: "Error updating user",
            error: error instanceof Error ? error.message : "An error occurred",
          });
        }

      case "DELETE":
        try {
          await db.collection("users").doc(userId).delete();
          return res
            .status(200)
            .json({ message: "User deleted successfully." });
        } catch (error) {
          console.error("Error deleting user:", error);
          return res.status(500).json({
            message: "Error deleting user",
            error: error instanceof Error ? error.message : "An error occurred",
          });
        }

      default:
        return res
          .setHeader("Allow", ["GET", "PUT", "DELETE"])
          .status(405)
          .end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
