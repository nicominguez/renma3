import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCS8D8aIYhmy9ie3FBlTqTW1fVkTnxIdwE",
  authDomain: "renma-2.firebaseapp.com",
  projectId: "renma-2",
  storageBucket: "renma-2.firebasestorage.app",
  messagingSenderId: "623758460353",
  appId: "1:623758460353:web:b7cbcf191aa5eee5d71b40",
  measurementId: "G-F4EVNQ3LTQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
