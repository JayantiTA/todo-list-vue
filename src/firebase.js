/* eslint-disable */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9kq09ZFLqmEFQXIp_JJjKyiRMhr0cz4w",
  authDomain: "todo-list-eec87.firebaseapp.com",
  projectId: "todo-list-eec87",
  storageBucket: "todo-list-eec87.appspot.com",
  messagingSenderId: "194081378692",
  appId: "1:194081378692:web:6a1971dfaa5857b8d88dd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
