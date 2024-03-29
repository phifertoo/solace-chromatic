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
