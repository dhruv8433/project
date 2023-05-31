// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDwN1-e_XrV2M29tyb2NmAj5uGpaxcQP9Q",

  authDomain: "something-4f3a3.firebaseapp.com",

  projectId: "something-4f3a3",

  storageBucket: "something-4f3a3.appspot.com",

  messagingSenderId: "1029203055914",

  appId: "1:1029203055914:web:0363e73566d66175eaba53",

  measurementId: "G-N3MREBEQZK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
