// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOPFXtl8qPLcjO-FQLsF3DdKmEvhynKrU",
  authDomain: "dustin-lic-bb575.firebaseapp.com",
  projectId: "dustin-lic-bb575",
  storageBucket: "dustin-lic-bb575.appspot.com",
  messagingSenderId: "351699807943",
  appId: "1:351699807943:web:af4c8e3a2ea0c5819b18e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);