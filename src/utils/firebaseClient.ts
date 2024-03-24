import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  //   apiKey: "AIzaSyBHynanb2xfXouMlOkQiaduYnu3VH_LKcU",
  //   authDomain: "solace-a0190.firebaseapp.com",
  //   projectId: "solace-a0190",
  //   storageBucket: "solace-a0190.appspot.com",
  //   messagingSenderId: "46273197710",
  //   appId: "1:46273197710:web:ddfec96fc42f7c2a23fbdf",
  //   measurementId: "G-YR0BCN6BM0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("firebase running");

export default app;
