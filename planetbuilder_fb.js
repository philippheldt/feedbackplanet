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
        //console.log(snapshot.val());
        gamestate.username = snapshot.val().username;
        for (let i = 0; i < 8; i++) {
          gamestate.buildings[i] = snapshot.val()["building" + (i + 1)];
        }
        gamestate.points = snapshot.val().points;
        gamestate.planet = snapshot.val().planet;
        console.log(gamestate);

        //Login
        homescreen.classList.remove("hidden");
        login.classList.add("hidden");
        welcomeMessage.innerHTML = "Welcome " + gamestate.username;
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
    building1: gamestate.buildings[0],
    building2: gamestate.buildings[1],
    building3: gamestate.buildings[2],
    building4: gamestate.buildings[3],
    building5: gamestate.buildings[4],
    building6: gamestate.buildings[5],
    building7: gamestate.buildings[6],
    building8: gamestate.buildings[7],
    points: gamestate.points,
    planet: gamestate.planet,
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

///////////////////////////////////////////////////////////////////////////////////

var planetContainer = document.querySelector(".pl-container");
planetContainer.innerHTML =
  '<div class="sky"></div> <div class="tree-back"></div><div class="building"></div><div class="tree-front"></div><div class="planet"><img class="pl-asset" src="assets/img/planets/non.png" alt=""></div><div class="bush"></div>';

var planet = document.querySelector(".planet");
var building = document.querySelector(".building");
var treeBack = document.querySelector(".tree-back");
var treeFront = document.querySelector(".tree-front");
var bushFront = document.querySelector(".bush");

function createPlanet() {
  //setup
  //create planet
  planet.innerHTML = `<img class="pl-asset" src="assets/img/planets/${gamestate.planet}.png" alt="">`;

  console.log(gamestate);
  //create all objects
  building.innerHTML = "";
  treeBack.innerHTML = "";
  treeFront.innerHTML = "";
  for (let i = 0; i < gamestate.buildings.length; i++) {
    let buildingSetup = gamestate.buildings[i].split(".");
    //adding building to scene
    if (buildingSetup[0] != "non0") {
      let builingImage = document.createElement("img");
      builingImage.setAttribute("src", `assets/img/buildings/${buildingSetup[0]}.png`);
      builingImage.classList.add(`pl-asset`);
      builingImage.classList.add(`building-${i + 1}`);
      building.appendChild(builingImage);
    }
    //adding trees to scene
    for (let tree = 1; tree <= 4; tree++) {
      if (buildingSetup[tree] != "no0" && tree <= 2) {
        let treeImage = document.createElement("img");
        treeImage.setAttribute("src", `assets/img/trees_back/${buildingSetup[tree]}.png`);
        treeImage.classList.add(`pl-asset`);
        treeImage.classList.add(`tree-back-${i + i + tree}`);
        treeBack.appendChild(treeImage);
      } else if (buildingSetup[tree] != "no0" && tree === 3) {
        let treeImage = document.createElement("img");
        treeImage.setAttribute("src", `assets/img/trees_front/${buildingSetup[tree]}.png`);
        treeImage.classList.add(`pl-asset`);
        treeImage.classList.add(`tree-front-${i + tree - 2}`);
        treeFront.appendChild(treeImage);
      } else if (buildingSetup[tree] != "no0" && tree === 4) {
        let treeImage = document.createElement("img");
        treeImage.setAttribute("src", `assets/img/trees_front/${buildingSetup[tree]}.png`);
        treeImage.classList.add(`pl-asset`);
        treeImage.classList.add(`bush-${i + tree - 3}`);
        treeFront.appendChild(treeImage);
      }
    }
  }
}

document.querySelector("#buibtn").addEventListener("click", createPlanet);

//Update Data from Textfield input

// Get the input box
let input = document.getElementById("feedback-input");
let tempPoints = 0;
// Init a timeout variable to be used below
let timeout = null;
let animationStarted = false;

// Listen for keystroke events
input.addEventListener("keyup", function (e) {
  // Clear the timeout if it has already been set.
  // This will prevent the previous task from executing
  // if it has been less than <MILLISECONDS>
  !animationStarted ? planetContainer.classList.add("typing") : null;
  animationStarted = true;
  clearTimeout(timeout);

  // Make a new timeout set to go off in 1000ms (1 second)
  timeout = setTimeout(function () {
    planetContainer.classList.remove("typing");
    animationStarted = false;
    gamestate.points += input.value.length - tempPoints;
    tempPoints += input.value.length - tempPoints;
    console.log(gamestate.points);
    updateData();
    updateBuildings();
  }, 250);
});

function updateBuildings() {
  const currentBuilding = gamestate.buildings[0].split(".")[0];
  const buildingStage = Math.floor(gamestate.points / 100 + 1);
  const pointsFromLastBuilding = gamestate.points - (buildingStage - 1) * 100;
  console.log("From last Stage: " + pointsFromLastBuilding);
  let newBuilding = "iba" + Math.floor(gamestate.points / 100 + 1);
  if (currentBuilding != newBuilding && gamestate.points <= 500) {
    gamestate.buildings[0] = newBuilding + ".no0.no0.no0.no0";
    updateData();
    createPlanet();
  }

  if (pointsFromLastBuilding < 25 && gamestate.buildings[0].split(".")[1] === "no0") {
    gamestate.buildings[0] =
      gamestate.buildings[0].split(".")[0] +
      "." +
      "pi1" +
      "." +
      gamestate.buildings[0].split(".")[2] +
      "." +
      gamestate.buildings[0].split(".")[3] +
      "." +
      gamestate.buildings[0].split(".")[4];
    updateData();
    createPlanet();
  } else if (
    pointsFromLastBuilding >= 25 &&
    pointsFromLastBuilding < 50 &&
    gamestate.buildings[0].split(".")[2] === "no0"
  ) {
    gamestate.buildings[0] =
      gamestate.buildings[0].split(".")[0] +
      "." +
      gamestate.buildings[0].split(".")[1] +
      "." +
      "pi1" +
      "." +
      gamestate.buildings[0].split(".")[3] +
      "." +
      gamestate.buildings[0].split(".")[4];
    updateData();
    createPlanet();
  } else if (
    pointsFromLastBuilding >= 50 &&
    pointsFromLastBuilding < 75 &&
    gamestate.buildings[0].split(".")[3] === "no0"
  ) {
    gamestate.buildings[0] =
      gamestate.buildings[0].split(".")[0] +
      "." +
      gamestate.buildings[0].split(".")[1] +
      "." +
      gamestate.buildings[0].split(".")[2] +
      "." +
      "pi1" +
      "." +
      gamestate.buildings[0].split(".")[4];
    updateData();
    createPlanet();
  } else if (
    pointsFromLastBuilding >= 75 &&
    pointsFromLastBuilding < 100 &&
    gamestate.buildings[0].split(".")[4] === "no0"
  ) {
    gamestate.buildings[0] =
      gamestate.buildings[0].split(".")[0] +
      "." +
      gamestate.buildings[0].split(".")[1] +
      "." +
      gamestate.buildings[0].split(".")[2] +
      "." +
      gamestate.buildings[0].split(".")[3] +
      "." +
      "pi1";
    updateData();
    createPlanet();
  }
}
