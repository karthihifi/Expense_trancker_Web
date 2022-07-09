import { initializeApp } from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBWQZQypyh7XXAzMf69GfFA27mu3Oz_jYE",
    authDomain: "expensetracker-karthihifi.firebaseapp.com",
    databaseURL: "https://expensetracker-karthihifi-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expensetracker-karthihifi",
    storageBucket: "expensetracker-karthihifi.appspot.com",
    messagingSenderId: "424562408008",
    appId: "1:424562408008:web:bb86a558f75c5f4e1a767d",
    measurementId: "G-4T7SSLEKCL"
};

// Initialize Firebase
const firebase_Expeseapp = initializeApp(firebaseConfig);

export default firebase_Expeseapp 
