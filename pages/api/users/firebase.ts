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
    // getting the user data based on the firebaseId
    const firebaseId = await authenticate(req);

    switch (req.method) {
      case "GET": {
        try {
          const querySnapshot = await db
            .collection("users")
            .where("firebaseId", "==", firebaseId)
            .get();

          if (querySnapshot?.empty) {
            return res.status(404).json({ message: "User not found." });
          }

          // Assuming you're looking for a single user match
          const userData = querySnapshot?.docs[0].data() as UserRequestBody;
          return res.status(200).json({
            message: "User data",
            data: { id: querySnapshot.docs[0].id, ...userData },
          });
        } catch (error) {
          console.error("Error getting user:", error);
          return res.status(500).json({
            message: "Error getting user",
            error: error instanceof Error ? error.message : "",
          });
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
