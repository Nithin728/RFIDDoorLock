// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyATVSl0L8kOLP_m48mATfcq_72-FqtxrQo",
  authDomain: "rfiddoorlock-e0d8c.firebaseapp.com",
  projectId: "rfiddoorlock-e0d8c",
  storageBucket: "rfiddoorlock-e0d8c.appspot.com",
  messagingSenderId: "629291503558",
  appId: "1:629291503558:web:b5d0181d4ed4ca5623ecc7",
  measurementId: "G-5XKJ98RD3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db }