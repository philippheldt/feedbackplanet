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

var homescreen = document.getElementById("homescreen");
var login = document.getElementById("login");
var welcomeMessage = document.getElementById("welcome-message");

var username = document.getElementById("username");
var building1 = document.getElementById("building1");
var building2 = document.getElementById("building2");
var building3 = document.getElementById("building3");
var building4 = document.getElementById("building4");
var building5 = document.getElementById("building5");
var building6 = document.getElementById("building6");
var building7 = document.getElementById("building7");
var building8 = document.getElementById("building8");
var points = document.getElementById("points");
var planet = document.getElementById("planet");

var insbtn = document.getElementById("insbtn");
var selbtn = document.getElementById("selbtn");
var updbtn = document.getElementById("updbtn");
var delbtn = document.getElementById("delbtn");

const gamestate = {
  username: "",
  points: 0,
  planet: "non",
  buildings: [
    "non0.no0.no0.no0.no0",
    "non0.no0.no0.no0.no0",
    "non0.no0.no0.no0.no0",
    "non0.no0.no0.no0.no0",
    "non0.no0.no0.no0.no0",
    "non0.no0.no0.no0.no0",
    "non0.no0.no0.no0.no0",
    "non0.no0.no0.no0.no0",
  ],
  sky: ["non", "non", "non", "non", "non", "non", "non", "non"],
};

// Insert Data to firebase
function insertData() {
  set(ref(db, "feedbackplanet/" + username.value), {
    username: username.value,
    building1: building1.value,
    building2: building2.value,
    building3: building3.value,
    building4: building4.value,
    building5: building5.value,
    building6: building6.value,
    building7: building7.value,
    building8: building8.value,
    points: points.value,
    planet: planet.value,
  })
    .then(() => {
      console.log("Data saved successfully");
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });
}
//Button Event
insbtn.addEventListener("click", insertData);

//Get data from firebase
function getData() {
  const dbref = ref(db);

  get(child(dbref, "feedbackplanet/" + username.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        building1.value = snapshot.val().building1;
        building2.value = snapshot.val().building2;
        building3.value = snapshot.val().building3;
        building4.value = snapshot.val().building4;
        building5.value = snapshot.val().building5;
        building6.value = snapshot.val().building6;
        building7.value = snapshot.val().building7;
        building8.value = snapshot.val().building8;
        points.value = snapshot.val().points;
        planet.value = snapshot.val().planet;

        homescreen.classList.remove("hidden");
        login.classList.add("hidden");
        welcomeMessage.innerHTML = "Welcome " + snapshot.val().username;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error getting data: ", error);
    });
}
//Button Event
selbtn.addEventListener("click", getData);

//Update data to firebase
function updateData() {
  update(ref(db, "feedbackplanet/" + username.value), {
    building1: building1.value,
    building2: building2.value,
    building3: building3.value,
    building4: building4.value,
    building5: building5.value,
    building6: building6.value,
    building7: building7.value,
    building8: building8.value,
    points: points.value,
    planet: planet.value,
  })
    .then(() => {
      console.log("Data saved successfully");
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });
}
//Button Event
updbtn.addEventListener("click", updateData);

//Delete data from firebase
//Update data to firebase
function removeData() {
  remove(ref(db, "feedbackplanet/" + username.value))
    .then(() => {
      console.log("Data removed successfully");
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });
}
//Button Event
delbtn.addEventListener("click", removeData);
