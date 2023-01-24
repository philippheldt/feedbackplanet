document.addEventListener;
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyBPfrNzUfMGmugq4YPVntrs1s5k0NWDj_s",
  authDomain: "feedbackplanet-6e805.firebaseapp.com",
  databaseURL: "https://feedbackplanet-6e805-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "feedbackplanet-6e805",
  storageBucket: "feedbackplanet-6e805.appspot.com",
  messagingSenderId: "1062690527293",
  appId: "1:1062690527293:web:a958d4af13bc00dbbd3254",
};

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

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

const auth = getAuth();

const email = document.getElementById("userEmail");
const password = document.getElementById("userPassword");
const passwordRepeat = document.getElementById("userPasswordRepeat");
const age = document.getElementById("userAge");
const occupation = document.getElementById("occupation-selector");
const terms = document.getElementById("terms");

const termsLabel = document.getElementById("terms-label");
const termsLink = document.querySelector("#terms-label a");
const userEmailAlert = document.getElementById("userEmailAlert");
const userPasswordAlert = document.getElementById("userPasswordAlert");
const ageAlert = document.getElementById("ageAlert");
const occupationAlert = document.getElementById("occupationAlert");
const submitAlert = document.getElementById("submitAlert");
const googleAuth = document.getElementById("googleAuth");
const appleAuth = document.getElementById("appleAuth");
const githubAuth = document.getElementById("githubAuth");

const testGroup = Math.random() < 0.6;

const selectedTestGroup = testGroup ? "A" : "A";

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

  if ((Number(age.value) < 18 && age.value != "") || (Number(age.value) > 30 && age.value != "")) {
    ageAlert.classList.remove("alert-hidden");

    return false;
  } else {
    ageAlert.classList.add("alert-hidden");
  }

  if (occupation.value === "arbeitnehmer" && occupation.value != "default") {
    occupationAlert.innerHTML = "Leider gehörst du nicht zur Zielgruppe!";
    occupationAlert.classList.remove("alert-hidden");
    console.log("occupationAlert");
    return false;
  } else {
    occupationAlert.classList.add("alert-hidden");
  }

  if (terms.checked === false) {
    termsLabel.classList.add("alert-terms");
    termsLink.classList.add("alert-terms");
    return false;
  }
  return true;
}

function submitValidation() {
  if (
    userEmail.value === "" ||
    userPassword.value === "" ||
    userPasswordRepeat.value === "" ||
    occupation.value == "default"
  ) {
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
        const user = userCredential.user;
        insertData(user.uid, email.value);
        userEmailAlert.classList.add("alert-hidden");
        email.value = "";
        password.value = "";
        passwordRepeat.value = "";

        setTimeout(() => {
          selectedTestGroup === "A"
            ? (window.location.href = "onboarding_a.html")
            : (window.location.href = "onboarding_b.html");
        }, 5000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/email-already-in-use") {
          userEmailAlert.innerText = "Diese E-Mail Adresse ist bereits registriert!";
          userEmailAlert.classList.remove("alert-hidden");

          document.querySelector(".loading-indicator-overlay").classList.add("opacity-hidden");
          setTimeout(() => {
            document.querySelector(".loading-indicator-overlay").classList.add("hidden");
          }, 100);
        }
      });
  } else {
    document.querySelector(".loading-indicator-overlay").classList.add("opacity-hidden");
    setTimeout(() => {
      document.querySelector(".loading-indicator-overlay").classList.add("hidden");
    }, 100);
  }
}

function insertData(newUUID, newEmail) {
  set(ref(db, "users/" + newUUID), {
    email: newEmail,
    uid: newUUID,
  })
    .then(() => {
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
        testGroup: selectedTestGroup,
        planetClicks: 0,
        bannerInteractions: 0,
        editTreeClicks: 0,
        turnClicks: 0,
        boosts: 0,
        suggestionClicks: 0,
        goodStartAmount: 0,
        extensiveAmount: 0,
        email: newEmail,
        contactQuery: false,
        age: age.value,
      })
        .then(() => {})
        .catch((error) => {
          console.error("Error saving data: ", error);
        });
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
}

const registerSubmit = document.getElementById("registerSubmit");
registerSubmit.addEventListener("click", register);
password.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    register();
  }
});

import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
function signInWithGoogle() {
  signInWithRedirect(auth, new GoogleAuthProvider())
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      document.querySelector(".loading-indicator-overlay").classList.remove("hidden");

      setTimeout(() => {
        document.querySelector(".loading-indicator-overlay").classList.remove("opacity-hidden");
      }, 100);

      insertData(user.uid, user.email);

      setTimeout(() => {
        selectedTestGroup === "A"
          ? (window.location.href = "onboarding_a.html")
          : (window.location.href = "onboarding_b.html");
      }, 5000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

getRedirectResult(auth)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    // The signed-in user info.
    const user = result.user;

    document.querySelector(".loading-indicator-overlay").classList.remove("hidden");

    setTimeout(() => {
      document.querySelector(".loading-indicator-overlay").classList.remove("opacity-hidden");
    }, 100);

    insertData(user.uid, user.email);

    setTimeout(() => {
      selectedTestGroup === "A"
        ? (window.location.href = "onboarding_a.html")
        : (window.location.href = "onboarding_b.html");
    }, 5000);
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
