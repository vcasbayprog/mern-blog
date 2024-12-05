// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-c0f54.firebaseapp.com",
  projectId: "mern-blog-c0f54",
  storageBucket: "mern-blog-c0f54.firebasestorage.app",
  messagingSenderId: "470071550954",
  appId: "1:470071550954:web:ad7db21652ee96d1c04893"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);