// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBD3trXOwWVMr5kr-zqScuB--e-NEXOiYY",
  authDomain: "ecommerce-5c1e1.firebaseapp.com",
  projectId: "ecommerce-5c1e1",
  storageBucket: "ecommerce-5c1e1.firebasestorage.app",
  messagingSenderId: "460940564193",
  appId: "1:460940564193:web:e868823f9e81d09708c9a0",
  measurementId: "G-K9JR5XLQH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)