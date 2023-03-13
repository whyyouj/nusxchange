// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaTCK3fplFLx5K-o7nezZf1tgHyifkA9I",
  authDomain: "nusxchange-f600d.firebaseapp.com",
  projectId: "nusxchange-f600d",
  storageBucket: "nusxchange-f600d.appspot.com",
  messagingSenderId: "654067477835",
  appId: "1:654067477835:web:50feee9ff85285ab0c8cce"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;