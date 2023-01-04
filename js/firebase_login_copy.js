document.addEventListener;
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPfrNzUfMGmugq4YPVntrs1s5k0NWDj_s",
  authDomain: "feedbackplanet-6e805.firebaseapp.com",
  databaseURL: "https://feedbackplanet-6e805-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "feedbackplanet-6e805",
  storageBucket: "feedbackplanet-6e805.appspot.com",
  messagingSenderId: "1062690527293",
  appId: "1:1062690527293:web:a958d4af13bc00dbbd3254",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  set,
  child,
  update,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

const db = getDatabase();

// create firebase authentication

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

const auth = getAuth();

// Login references
const email = document.getElementById("userEmail");
const password = document.getElementById("userPassword");
const userEmailAlert = document.getElementById("userEmailAlert");
const userPasswordAlert = document.getElementById("userPasswordAlert");
const submitAlert = document.getElementById("submitAlert");

//Login user to firebase

function login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.href = "overview.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      userPasswordAlert.classList.add("alert-hidden");
      userEmailAlert.classList.add("alert-hidden");
      if (errorCode === "auth/wrong-password") {
        userPasswordAlert.innerText = "Passwort falsch eingegeben";
        userPasswordAlert.classList.remove("alert-hidden");
      }
      if (errorCode === "auth/user-not-found") {
        userEmailAlert.innerText = "Benutzer existiert nicht";
        userEmailAlert.classList.remove("alert-hidden");
      }
    });
}

import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
function signInWithGoogle() {
  signInWithRedirect(auth, new GoogleAuthProvider())
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      window.location.href = "overview.html";
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;
    window.location.href = "overview.html";
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

googleAuth.addEventListener("click", signInWithGoogle);

// event listener for register button
const registerSubmit = document.getElementById("registerSubmit");
registerSubmit.addEventListener("click", login);
password.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    login();
  }
});
