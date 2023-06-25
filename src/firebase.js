// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpNoyMXiyJEOJikQwOQ35_GU7E-fVA_NA",
  authDomain: "orbital-milestone-2-cfb15.firebaseapp.com",
  projectId: "orbital-milestone-2-cfb15",
  storageBucket: "orbital-milestone-2-cfb15.appspot.com",
  messagingSenderId: "545161554419",
  appId: "1:545161554419:web:ed415499543bd854ac4a86",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export const storage = getStorage(app)


