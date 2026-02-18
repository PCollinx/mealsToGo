import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgGs8qdeAriwP9mVVYApYnP7j-6VTrW9Y",
  authDomain: "mealstogo-a0a42.firebaseapp.com",
  projectId: "mealstogo-a0a42",
  storageBucket: "mealstogo-a0a42.firebasestorage.app",
  messagingSenderId: "1079693038304",
  appId: "1:1079693038304:web:c994c3791fb10ae9243685",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
