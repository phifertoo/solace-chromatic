import { NextApiRequest } from "next";
import admin from "./firebaseServer";

export const authenticate = async (req: NextApiRequest): Promise<string> => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    throw new Error("Authorization token not provided");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken.uid;
  } catch (error) {
    console.error("Authentication error", error);
    throw new Error("Invalid or expired token");
  }
};
