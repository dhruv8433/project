// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  // apiKey: "AIzaSyCr8Waf3WJjiWKsx-6BxBvLOKdGb3FXgQE",
  // authDomain: "edemand-79907.firebaseapp.com",
  // projectId: "edemand-79907",
  // storageBucket: "edemand-79907.appspot.com",
  // messagingSenderId: "811828125363",
  // appId: "1:811828125363:web:5b177d6625c3e3731f5ac6",
  // measurementId: "G-J4RWHNVBG0",
  // vapidKey:
  //   "BNh8i559_RYdfpgtS50AJPtUNrXCEPijSYd2LlYRhKpoWWt2KYjkAWudKAmz_sKwIhOZphj98TtnbFGU-SjfHPA",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
