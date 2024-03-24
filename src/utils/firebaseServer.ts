import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY!.replace(
          /\\n/g,
          "\n"
        ), // Using non-null assertion for simplicity
        clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL!,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
      }),
    });
  } catch (error: unknown) {
    // Explicitly marking the error type as 'unknown'
    if (error instanceof Error) {
      console.error("Firebase admin initialization error", error.stack); // Safe to access error.stack here
    } else {
      // Handle or log the error appropriately if it's not an instance of Error
      console.error(
        "An unexpected error occurred during Firebase initialization"
      );
    }
  }
}

export default admin;
