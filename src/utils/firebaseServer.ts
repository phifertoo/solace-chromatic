import * as admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: process.env.REACT_APP_FIREBASE_PRIVATE_KEY!.replace(
          /\\n/g,
          "\n"
        ),
        clientEmail: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL!,
        projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID!,
      }),
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Firebase admin initialization error", error.stack);
    } else {
      console.error(
        "An unexpected error occurred during Firebase initialization"
      );
    }
  }
}

export default admin;
