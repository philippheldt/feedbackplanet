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

// Login references

let userName = document.getElementById("userName");
let logout = document.getElementById("logout");
var currentUser = null;

// get username from local storage

import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    userName.innerHTML = user.email;
  } else {
    window.location.href = "register.html";
  }
});

// Logout user from firebase
function signOutUser() {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html";
    })
    .catch((error) => {});
}
logout.addEventListener("click", signOutUser);

import { gamestate } from "./gamedata/gamestate.js";

const polls = document.querySelectorAll(".poll");

if (
  localStorage.getItem("planetOnboarding") === null ||
  localStorage.getItem("poll1") === null ||
  localStorage.getItem("poll2") === null ||
  localStorage.getItem("poll3") === null ||
  localStorage.getItem("poll4") === null
) {
  localStorage.setItem("planetOnboarding", false);
  localStorage.setItem("poll1", false);
  localStorage.setItem("poll2", false);
  localStorage.setItem("poll3", false);
  localStorage.setItem("poll4", false);
}

for (let index = 0; index < polls.length; index++) {
  const poll = polls[index];

  poll.addEventListener("click", function () {
    openPoll(index);
  });

  if (localStorage.getItem(`poll${index + 1}`) == "true") {
    poll.classList.add("checked");
  }
}

function openPoll(index) {
  if (
    localStorage.getItem("planetOnboarding") == "false" &&
    gamestate.trackingData.testGroup == "A"
  ) {
    localStorage.setItem("pollLocation", index);
    window.location.href = "onboarding_planet.html";
  } else if (
    localStorage.getItem("planetOnboarding") == "true" ||
    gamestate.trackingData.testGroup == "B"
  ) {
    switch (index) {
      case 0:
        window.location.href = "umfrage1.html";
        break;
      case 1:
        window.location.href = "umfrage2.html";
        break;
      case 2:
        window.location.href = "umfrage3.html";
        break;
      case 3:
        window.location.href = "umfrage4.html";
        break;
    }
  }
}
