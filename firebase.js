// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVDLUDEyTMWpVbuS0JhcLcctSIG8f-qeI",
  authDomain: "inventorymanagement-b890b.firebaseapp.com",
  projectId: "inventorymanagement-b890b",
  storageBucket: "inventorymanagement-b890b.appspot.com",
  messagingSenderId: "954598339671",
  appId: "1:954598339671:web:da9f83ce08ac48bfe91f12",
  measurementId: "G-YVRSLL9XHH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore};