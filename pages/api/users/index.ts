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
    const firebaseId = await authenticate(req);
    // res.status(200).json({ message: "You are authenticated", userId });
    const { name, email, userId }: UserRequestBody = req.body;

    switch (req.method) {
      case "POST": {
        if (!name || !email) {
          return res
            .status(400)
            .json({ message: "Missing name or email in request body." });
        }

        try {
          const docRef = await db.collection("users").add({
            name,
            email,
            firebaseId,
          });

          return res
            .status(201)
            .json({ message: "User created successfully.", id: docRef.id });
        } catch (error) {
          console.error("Error creating user:", error);
          if (error instanceof Error) {
            return res
              .status(500)
              .json({ message: "Error creating user", error: error.message });
          } else {
            return res.status(500).json({ message: "Error creating user" });
          }
        }
      }

      // case "GET": {
      //   if (!userId) {
      //     return res
      //       .status(400)
      //       .json({ message: "userId query parameter is required." });
      //   }

      //   try {
      //     const userDocRef = await db.collection("users").doc(userId).get();

      //     if (!userDocRef.exists) {
      //       return res.status(404).json({ message: "User not found." });
      //     }

      //     // Return the found user document data
      //     return res.status(200).json({
      //       message: "User data",
      //       data: userDocRef.data() as UserRequestBody,
      //     });
      //   } catch (error) {
      //     console.error("Error getting user:", error);
      //     return res.status(500).json({
      //       message: "Error getting user",
      //       error: error instanceof Error ? error.message : "",
      //     });
      //   }
      // }

      // case "PUT": {
      //   if (!userId) {
      //     return res
      //       .status(400)
      //       .json({ message: "userId is required in request body." });
      //   }
      //   if (!name || !email) {
      //     return res
      //       .status(400)
      //       .json({ message: "Missing name or email in request body." });
      //   }

      //   try {
      //     // Use the userId to locate the document and perform the update
      //     await db.collection("users").doc(userId).update({ name, email });
      //     return res
      //       .status(200)
      //       .json({ message: "User updated successfully." });
      //   } catch (error) {
      //     console.error("Error updating user:", error);
      //     return res.status(500).json({
      //       message: "Error updating user",
      //       error: error instanceof Error ? error.message : "An error occurred",
      //     });
      //   }
      // }

      // case "DELETE": {
      //   if (!userId) {
      //     return res
      //       .status(400)
      //       .json({ message: "userId is required in the request body." });
      //   }

      //   try {
      //     // Use the userId to locate the document and perform the delete operation
      //     await db.collection("users").doc(userId).delete();
      //     return res
      //       .status(200)
      //       .json({ message: "User deleted successfully." });
      //   } catch (error) {
      //     console.error("Error deleting user:", error);
      //     return res.status(500).json({
      //       message: "Error deleting user",
      //       error: error instanceof Error ? error.message : "An error occurred",
      //     });
      //   }
      // }

      default: {
        return res
          .setHeader("Allow", ["POST", "GET", "PUT", "DELETE"])
          .status(405)
          .end(`Method ${req.method} Not Allowed`);
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
  }
}
