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
  goodStartBoost: 0,
  extensiveBoost: 0,
  activeBoost: false,
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
// insbtn.addEventListener("click", insertData);

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
        gamestate.activeBoost = snapshot.val().activeBoost;
        console.log(gamestate.activeBoost);

        if (gamestate.activeBoost == true) {
          console.log("activeBoost");
          gamestate.goodStartBoost = snapshot.val().goodStartBoost;
          gamestate.extensiveBoost = snapshot.val().extensiveBoost;
          gamestate.activeBoost = false;
        } else {
          console.log("no activeBoost");
          gamestate.goodStartBoost = 0;
          gamestate.extensiveBoost = 0;
          gamestate.activeBoost = false;
        }
        console.log(gamestate);

        //Login
        // homescreen.classList.remove("hidden");
        // login.classList.add("hidden");
        // welcomeMessage.innerHTML = "Welcome " + gamestate.username;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error getting data: ", error);
    });

  //after last state was savedchange activeBoost to false, so that, when the user exits without filling form, Streak will be deminished
  setTimeout(() => {
    update(ref(db, "feedbackplanet/" + username.value), {
      activeBoost: gamestate.activeBoost,
      goodStartBoost: gamestate.goodStartBoost,
      extensiveBoost: gamestate.extensiveBoost,
    })
      .then(() => {
        console.log("Data saved successfully");
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
      });
  }, 1000);
}
//Button Event
//selbtn.addEventListener("click", getData);
getData();
setTimeout(() => {
  createPlanet();
}, 350);

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
    goodStartBoost: gamestate.goodStartBoost,
    extensiveBoost: gamestate.extensiveBoost,
    activeBoost: gamestate.activeBoost,
  })
    .then(() => {
      console.log("Data saved successfully");
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });
}
//Button Event
// updbtn.addEventListener("click", updateData);

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
// delbtn.addEventListener("click", removeData);

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

// document.querySelector("#buibtn").addEventListener("click", createPlanet);

//Update Data from Textfield input

// Get the input box
let input = document.getElementById("feedback-input");
let tempPoints = 0;
// Init a timeout variable to be used below
let timeout = null;
let animationStarted = false;
var obj;

// Updating buildings based on inputted points

function updateBuildings() {
  fetch("json/gamestate.json")
    .then((res) => res.json())
    .then((data) => (obj = data))
    .then(() => {
      console.log(obj);
      //check which building is selected
      const currentBuilding = gamestate.buildings[0].slice(0, 3);
      let currentBuildingIndex;
      let currentBuildingStage = gamestate.buildings[0].slice(3, 4);

      for (let i = 0; i < obj.length; i++) {
        if (obj[i].shortcut === currentBuilding) {
          currentBuildingIndex = i;
        }
      }
      const pointsToNextBuildingStage =
        obj[currentBuildingIndex].buildingStages[currentBuildingStage];
      const pointsToNextBuildigStageQuarter = pointsToNextBuildingStage / 4;

      //select random element from array and save it to a const
      const randomElement =
        obj[currentBuildingIndex].trees[
          Math.floor(Math.random() * obj[currentBuildingIndex].trees.length)
        ];

      //check if there are enough points to build the next stage
      if (gamestate.points >= pointsToNextBuildingStage) {
        currentBuildingStage = Number(currentBuildingStage) + 1;
        // check if building is at max stage
        if (currentBuildingStage < 5) {
          gamestate.buildings[0] = currentBuilding + currentBuildingStage + ".no0.no0.no0.no0";
        } else {
          gamestate.buildings[0] =
            currentBuilding +
            currentBuildingStage +
            "." +
            gamestate.buildings[0].split(".")[1] +
            "." +
            gamestate.buildings[0].split(".")[2] +
            "." +
            gamestate.buildings[0].split(".")[3] +
            "." +
            gamestate.buildings[0].split(".")[4];
        }
        gamestate.points = 0;
        createPlanet();
      }

      // build a new tree when one more quarter of points to the next stage is reached
      if (gamestate.points > 0 && gamestate.buildings[0].split(".")[1] === "no0") {
        gamestate.buildings[0] =
          gamestate.buildings[0].split(".")[0] +
          "." +
          randomElement +
          "." +
          gamestate.buildings[0].split(".")[2] +
          "." +
          gamestate.buildings[0].split(".")[3] +
          "." +
          gamestate.buildings[0].split(".")[4];
        createPlanet();
      } else if (
        gamestate.points > pointsToNextBuildigStageQuarter &&
        gamestate.buildings[0].split(".")[2] === "no0"
      ) {
        gamestate.buildings[0] =
          gamestate.buildings[0].split(".")[0] +
          "." +
          gamestate.buildings[0].split(".")[1] +
          "." +
          randomElement +
          "." +
          gamestate.buildings[0].split(".")[3] +
          "." +
          gamestate.buildings[0].split(".")[4];
        createPlanet();
      } else if (
        gamestate.points > pointsToNextBuildigStageQuarter * 2 &&
        gamestate.buildings[0].split(".")[3] === "no0"
      ) {
        gamestate.buildings[0] =
          gamestate.buildings[0].split(".")[0] +
          "." +
          gamestate.buildings[0].split(".")[1] +
          "." +
          gamestate.buildings[0].split(".")[2] +
          "." +
          randomElement +
          "." +
          gamestate.buildings[0].split(".")[4];
        createPlanet();
      } else if (
        gamestate.points > pointsToNextBuildigStageQuarter * 3 &&
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
          randomElement;
        createPlanet();
      }

      if (gamestate.points < 0) {
        const accumulatedPoints =
          obj[currentBuildingIndex].accumulatedStages[currentBuildingStage - 1] + gamestate.points;
        //loop throug all accumulatedstages and check if the accumulated points are higher than the current stage
        for (let i = 0; i < obj[currentBuildingIndex].accumulatedStages.length; i++) {
          if (accumulatedPoints >= obj[currentBuildingIndex].accumulatedStages[i]) {
            currentBuildingStage = i + 1;
          }
        }
        gamestate.points =
          accumulatedPoints - obj[currentBuildingIndex].accumulatedStages[currentBuildingStage - 1];
        gamestate.buildings[0] = currentBuilding + currentBuildingStage + ".no0.no0.no0.no0";
        createPlanet();
      }
    });
}

// analyzing input and updating points

// Auführlichkeitsbewertung
var goodStart = false;
var extensiveFeedback = false;
var boost = 1;
var wordCount = 0;

function analyzeText() {
  wordCount = input.value.split(" ").length;
  console.log("Number of words: " + wordCount);

  gamestate.extensiveBoost >= 3 ? (boost = 3) : (boost = 1);
  gamestate.goodStartBoost >= 2
    ? boost == 3
      ? (boost = 3)
      : (boost = 2)
    : boost == 3
    ? (boost = 3)
    : (boost = 1);

  if (wordCount > 50 && !goodStart) {
    goodStart = true;
    gamestate.points = gamestate.points + 10 * boost;
    gamestate.goodStartBoost = gamestate.goodStartBoost + 1;
    console.log("GUTER START!");
    console.log("boost:" + boost);
  }

  if (wordCount > 100 && !extensiveFeedback) {
    extensiveFeedback = true;
    gamestate.points = gamestate.points + 30 * boost;
    gamestate.extensiveBoost = gamestate.extensiveBoost + 1;
    console.log("RICHTIG AUSFÜHRLICH!");
    console.log("boost:" + boost);
  }
}

input.addEventListener("keyup", function (e) {
  !animationStarted ? planetContainer.classList.add("typing") : null;
  animationStarted = true;
  clearTimeout(timeout);

  timeout = setTimeout(function () {
    planetContainer.classList.remove("typing");
    animationStarted = false;

    // add points and gamestate data to temporary object
    analyzeText();
    updateBuildings();
  }, 250);
});

function submitFeedback() {
  // if basic feedback isn't given, boosts are reset
  if (goodStart) {
    gamestate.activeBoost = true;
  } else {
    gamestate.activeBoost = false;
    gamestate.extensiveBoost = 0;
    gamestate.goodStartBoost = 0;
  }

  // save Gamestate to database
  updateData();

  // reset values
  input.value = "";
  goodStart = false;
  extensiveFeedback = false;
}

//add eventlistener for submitFeedback
document.getElementById("nextq").addEventListener("click", submitFeedback);
