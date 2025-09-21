// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwqPcThXSz0Af47hnByYFfRLwUzA8LQFY",
  authDomain: "react-firechat-d2f39.firebaseapp.com",
  projectId: "react-firechat-d2f39",
  storageBucket: "react-firechat-d2f39.firebasestorage.app",
  messagingSenderId: "477168156476",
  appId: "1:477168156476:web:c2064121b1874d8d4a2839"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();