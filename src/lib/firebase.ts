// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_nv-aXX8Ls7fuUwyVb-yeliRGssSDkp0",
  authDomain: "renma-0.firebaseapp.com",
  projectId: "renma-0",
  storageBucket: "renma-0.firebasestorage.app",
  messagingSenderId: "410778507454",
  appId: "1:410778507454:web:eae3bda9ee41edacd966ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);