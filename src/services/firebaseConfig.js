import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdP1F5e7s3IIMSNz5tBQeGHytWiZhdZ5s",
  authDomain: "rn-todo-app-103de.firebaseapp.com",
  projectId: "rn-todo-app-103de",
  storageBucket: "rn-todo-app-103de.appspot.com",
  messagingSenderId: "876955355740",
  appId: "1:876955355740:web:063042930ca281f0beb499",
  measurementId: "G-GG6SX39ZXM"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

