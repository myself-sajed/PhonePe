// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmDcwJ35AYJ8k82PdRai2Fhb-S8vdBzQA",
    authDomain: "phonepe-e5368.firebaseapp.com",
    projectId: "phonepe-e5368",
    storageBucket: "phonepe-e5368.appspot.com",
    messagingSenderId: "363213824363",
    appId: "1:363213824363:web:fa0938567cf7343720ac2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


export { db, };