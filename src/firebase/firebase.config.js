// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAY8zO02ViOTEfA8S1e35wE5lAHub2a6NQ",
    authDomain: "atg-world-67b51.firebaseapp.com",
    projectId: "atg-world-67b51",
    storageBucket: "atg-world-67b51.appspot.com",
    messagingSenderId: "517835207941",
    appId: "1:517835207941:web:6def35faef8629a761336c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
