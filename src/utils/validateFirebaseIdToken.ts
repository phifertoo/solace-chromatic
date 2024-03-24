import admin from "./firebaseServer";

interface DecodedToken {
  uid: string;
  // Add other properties from the decoded token that you might need
}

interface ValidateResult {
  decodedToken: DecodedToken | null;
  error: Error | null;
}

const validateFirebaseIdToken = async (
  token: string
): Promise<ValidateResult> => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return { decodedToken, error: null };
  } catch (error) {
    console.error("Error verifying ID token:", error);
    return { decodedToken: null, error: error as Error };
  }
};

export default validateFirebaseIdToken;
