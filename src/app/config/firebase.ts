// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYw4ijMko2eRCSWyoyJIo5qVNaBn4ArXc",
  authDomain: "bes-t21.firebaseapp.com",
  databaseURL: "https://bes-t21-default-rtdb.firebaseio.com",
  projectId: "bes-t21",
  storageBucket: "bes-t21.appspot.com",
  messagingSenderId: "881541933675",
  appId: "1:881541933675:web:53f8d27df20894dcd85f2e",
  measurementId: "G-KR598ZEJEC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
// const analytics = getAnalytics(app);
