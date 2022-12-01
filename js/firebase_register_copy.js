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
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

const auth = getAuth();

// Login references
const email = document.getElementById("userEmail");
const password = document.getElementById("userPassword");
const passwordRepeat = document.getElementById("userPasswordRepeat");
const userEmailAlert = document.getElementById("userEmailAlert");
const userPasswordAlert = document.getElementById("userPasswordAlert");
const submitAlert = document.getElementById("submitAlert");
const googleAuth = document.getElementById("googleAuth");
const appleAuth = document.getElementById("appleAuth");
const githubAuth = document.getElementById("githubAuth");
//validate inputs

function validation() {
  let emailregex = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z]{2,8})?$/;

  if (!emailregex.test(userEmail.value) && userEmail.value.length > 0) {
    userEmailAlert.classList.remove("alert-hidden");
    return false;
  } else {
    userEmailAlert.classList.add("alert-hidden");
  }
  if (
    userPassword.value !== userPasswordRepeat.value &&
    userPassword.value.length > 0 &&
    userPasswordRepeat.value.length > 0
  ) {
    userPasswordAlert.innerText = "Passwörter stimmen nicht überein!";
    userPasswordAlert.classList.remove("alert-hidden");
    return false;
  } else {
    userPasswordAlert.classList.add("alert-hidden");
  }
  if (userPassword.value.length < 6 && userPassword.value.length > 0) {
    userPasswordAlert.innerText = "Das Passwort muss mindestens 6 Zeichen lang sein!";
    userPasswordAlert.classList.remove("alert-hidden");
    return false;
  } else {
    userPasswordAlert.classList.add("alert-hidden");
  }
  return true;
}

function submitValidation() {
  if (userEmail.value === "" || userPassword.value === "" || userPasswordRepeat.value === "") {
    submitAlert.innerText = "Bitte fülle alle Felder aus!";
    submitAlert.classList.remove("alert-hidden");
    return false;
  } else {
    submitAlert.classList.add("alert-hidden");
  }
  return true;
}

// run validation() when user goes to next input field
userEmail.addEventListener("blur", validation);

// run validation() when user stops typing in input field userPasswordRepeat
userPassword.addEventListener("blur", validation);
userPasswordRepeat.addEventListener("blur", validation);

//register user to firebase

function register() {
  document.querySelector(".loading-indicator-overlay").classList.remove("hidden");

  setTimeout(() => {
    document.querySelector(".loading-indicator-overlay").classList.remove("opacity-hidden");
  }, 100);

  if (validation() === true && submitValidation() === true) {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // sendEmailVerification(auth.currentUser).then(() => {
        //   console.log("Email sent!");
        // });

        //TODO: add Loading indicator
        insertData(user.uid);
        userEmailAlert.classList.add("alert-hidden");
        email.value = "";
        password.value = "";
        passwordRepeat.value = "";
        console.log("signed in");

        setTimeout(() => {
          window.location.href = "onboarding.html";
        }, 5000);

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        if (errorCode === "auth/email-already-in-use") {
          userEmailAlert.innerText = "Diese E-Mail Adresse ist bereits registriert!";
          userEmailAlert.classList.remove("alert-hidden");

          document.querySelector(".loading-indicator-overlay").classList.add("opacity-hidden");
          setTimeout(() => {
            document.querySelector(".loading-indicator-overlay").classList.add("hidden");
          }, 100);
        }
        // ..
      });
  } else {
    document.querySelector(".loading-indicator-overlay").classList.add("opacity-hidden");
    setTimeout(() => {
      document.querySelector(".loading-indicator-overlay").classList.add("hidden");
    }, 100);
  }
}

function insertData(newUUID) {
  set(ref(db, "users/" + newUUID), {
    email: email.value,
    uid: newUUID,
  })
    .then(() => {
      console.log("User Created!");
      set(ref(db, "feedbackplanet/" + newUUID), {
        uid: newUUID,
        building1: "non0.no0.no0.no0.no0",
        building2: "non0.no0.no0.no0.no0",
        building3: "non0.no0.no0.no0.no0",
        building4: "non0.no0.no0.no0.no0",
        building5: "non0.no0.no0.no0.no0",
        building6: "non0.no0.no0.no0.no0",
        building7: "non0.no0.no0.no0.no0",
        building8: "non0.no0.no0.no0.no0",
        points: 0,
        planet: "nono",
        extensiveBoost: 0,
        goodStartBoost: 0,
        activeBoost: false,
        planetPosition: 1,
      })
        .then(() => {
          console.log("Gamestate Created!");
        })
        .catch((error) => {
          console.error("Error saving data: ", error);
        });
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

// event listener for register button
const registerSubmit = document.getElementById("registerSubmit");
registerSubmit.addEventListener("click", register);

// Login with Google

import {
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
function signInWithGoogle() {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      insertData(user.uid);
      window.location.href = "home.html";
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

googleAuth.addEventListener("click", signInWithGoogle);
