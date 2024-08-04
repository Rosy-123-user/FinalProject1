
// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js';



const firebaseConfig = {
    apiKey: "AIzaSyDcpTJCxls7Vi2qR8KqMjGbZXAZeIoERFk",
    authDomain: "e-shuri-4fa54.firebaseapp.com",
    projectId: "e-shuri-4fa54",
    storageBucket: "e-shuri-4fa54.appspot.com",
    messagingSenderId: "318869097966",
    appId: "1:318869097966:web:39107bd9aaf07cc825d2ff",
    measurementId: "G-SDVV6HE6HV"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);