import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwZnzVjZ4kFQa8yHmjiXCvFRPMN96vnSw",
  authDomain: "smartquiz-app-59260.firebaseapp.com",
  projectId: "smartquiz-app-59260",
  storageBucket: "smartquiz-app-59260.firebasestorage.app",
  messagingSenderId: "822141961857",
  appId: "1:822141961857:web:9ecc9a098e8b9b20706f80"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
