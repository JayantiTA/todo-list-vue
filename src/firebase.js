/* eslint-disable */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAn6787aSVWNAIb9UB6tPn75B6MT_AwTl8",
  authDomain: "vuejs-ac887.firebaseapp.com",
  projectId: "vuejs-ac887",
  storageBucket: "vuejs-ac887.appspot.com",
  messagingSenderId: "210775099487",
  appId: "1:210775099487:web:451930e186bd5ee43673ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
