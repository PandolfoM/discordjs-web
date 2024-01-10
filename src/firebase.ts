import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

console.log(import.meta.env.VITE_AUTHDOMAIN);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// const isTestEnvironment = process.env.NODE_ENV === "development";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const functions = getFunctions(getApp());

if (process.env.NODE_ENV === "development") {
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}

// isTestEnvironment && connectAuthEmulator(auth, "http://127.0.0.1:9099");
