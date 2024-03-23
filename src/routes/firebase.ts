// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdyqyDmRehM5G1-RJSaaJTHe3VYPE5LVw",
    authDomain: "linkly-2024.firebaseapp.com",
    projectId: "linkly-2024",
    storageBucket: "linkly-2024.appspot.com",
    messagingSenderId: "994219367309",
    appId: "1:994219367309:web:d9485afe7d2fc19f45bbc4",
    measurementId: "G-DPQSHYTPE6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

