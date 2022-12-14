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

const feedbackBar = document.querySelector(".feedback-bar");
const feedbackContainer = document.querySelector(".feedback-container");
var homescreen = document.getElementById("homescreen");
var login = document.getElementById("login");
var welcomeMessage = document.getElementById("welcome-message");

var uid = document.getElementById("username");
var planet = document.getElementById("planet");
let skySet = false;

//expot gamestate constant

import { gamestate } from "./gamestate.js";

import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log("uid: " + uid);
    gamestate.uid = uid;
    // ...
    getData();
    setTimeout(() => {
      createPlanet();
    }, 350);
  } else {
    // User is signed out
    // ...
  }
});

// Insert Data to firebase
function insertData() {
  set(ref(db, "feedbackplanet/" + gamestate.uid), {
    uid: uid.value,
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
export function getData() {
  const dbref = ref(db);

  get(child(dbref, "feedbackplanet/" + gamestate.uid))
    .then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        gamestate.uid = snapshot.val().uid;
        for (let i = 0; i < 8; i++) {
          gamestate.buildings[i] = snapshot.val()["building" + (i + 1)];
        }
        gamestate.planetPosition = snapshot.val().planetPosition;
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

        //trackingData
        gamestate.trackingData.testGroup = snapshot.val().testGroup;
        gamestate.trackingData.planetClicks = snapshot.val().planetClicks;
        gamestate.trackingData.editTreeClicks = snapshot.val().editTreeClicks;
        gamestate.trackingData.turnClicks = snapshot.val().turnClicks;
        gamestate.trackingData.boosts = snapshot.val().boosts;
        gamestate.trackingData.goodStartAmount = snapshot.val().goodStartAmount;
        gamestate.trackingData.extensiveAmount = snapshot.val().extensiveAmount;
        gamestate.trackingData.email = snapshot.val().email;
        gamestate.trackingData.contactQuery = snapshot.val().contactQuery;
        gamestate.trackingData.bannerInteractions = snapshot.val().bannerInteractions;

        console.log(gamestate);

        //Login
        // homescreen.classList.remove("hidden");
        // login.classList.add("hidden");
        // welcomeMessage.innerHTML = "Welcome " + gamestate.uid;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error("Error getting data: ", error);
    });

  //after last state was savedchange activeBoost to false, so that, when the user exits without filling form, Streak will be deminished
  setTimeout(() => {
    update(ref(db, "feedbackplanet/" + gamestate.uid), {
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

//Update data to firebase
export function updateData() {
  update(ref(db, "feedbackplanet/" + gamestate.uid), {
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
    planetPosition: gamestate.planetPosition,

    //trackingData
    planetClicks: gamestate.trackingData.planetClicks,
    editTreeClicks: gamestate.trackingData.editTreeClicks,
    turnClicks: gamestate.trackingData.turnClicks,
    boosts: gamestate.trackingData.boosts,
    goodStartAmount: gamestate.trackingData.boostKind.goodStartAmount,
    extensiveAmount: gamestate.trackingData.boostKind.extensiveAmount,
    contactQuery: gamestate.trackingData.contactQuery,
    bannerInteractions: gamestate.trackingData.bannerInteractions,
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
  remove(ref(db, "feedbackplanet/" + gamestate.uid))
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

import { getBrowser } from "./checkBrowser.js";

var planetContainer = document.querySelector(".pl-container");

if (getBrowser() == "Safari") {
  planetContainer.innerHTML =
    '<div class="sky"> <img id="background-image-sky" src="" ></img></div> <div class="tree-back"></div><div class="building"></div><div class="tree-front"></div><div class="planet"><img class="pl-asset" src="assets/planet_assets/planets/nono.png" id="planet-background"></div><div class="bush"></div>';
} else {
  planetContainer.innerHTML =
    '<div class="sky"> <video id="background-video-sky" src="" autoplay loop muted></video></div> <div class="tree-back"></div><div class="building"></div><div class="tree-front"></div><div class="planet"><img class="pl-asset" src="assets/planet_assets/planets/nono.png" id="planet-background"></div><div class="bush"></div>';
}
var planet = document.querySelector(".planet");
var building = document.querySelector(".building");
var treeBack = document.querySelector(".tree-back");
var treeFront = document.querySelector(".tree-front");
var bushFront = document.querySelector(".bush");
const pointsView = document.querySelector("#current-points");
const nextStageView = document.querySelector("#next-stage");

function checkTestGroup() {}

export function createPlanet() {
  //setup
  //create planet
  planet.innerHTML = `<img class="pl-asset" src="assets/planet_assets/planets/${gamestate.planet}.png" id="planet-background" alt="">`;
  planetContainer.classList.add("pos-" + gamestate.planetPosition);
  pointsView.innerHTML = gamestate.points;

  if (gamestate.trackingData.testGroup == "A") {
    planetContainer.classList.remove("hidden");
    feedbackContainer.classList.remove("hidden");
    pointsFloating.classList.remove("hidden");
    userNameOutput.style.pointerEvents = "none";
    userIcon.style.pointerEvents = "none";
  }
  //TODO Add random video element

  if (gamestate.planet == "nono") {
    planetSelectorBar();
    return;
  } else if (!skySet) {
    addRandomSky();
  }

  console.log(gamestate);
  //create all objects
  building.innerHTML = "";
  treeBack.innerHTML = "";
  treeFront.innerHTML = "";

  for (let i = 0; i < gamestate.buildings.length; i++) {
    let buildingSetup = gamestate.buildings[i].split(".");
    const buildingSetupPrevious = buildingChanged.split(".");
    //adding building to scene
    if (buildingSetup[0] != "non0") {
      addAndAnimateAssets(
        buildingSetup[0],
        buildingSetupPrevious[0],
        building,
        "building-",
        i,
        i + 1,
        "assets/planet_assets/buildings/",
        ".png"
      );
    }
    //adding trees to scene
    for (let tree = 1; tree <= 4; tree++) {
      if (buildingSetup[tree] != "no0" && tree <= 2) {
        addAndAnimateAssets(
          buildingSetup[tree],
          buildingSetupPrevious[tree],
          treeBack,
          "tree-back-",
          i,
          i + i + tree,
          "assets/planet_assets/trees_back/",
          ".png"
        );
      } else if (buildingSetup[tree] != "no0" && tree === 3) {
        if (getBrowser() == "Safari") {
          addAndAnimateAssets(
            buildingSetup[tree],
            buildingSetupPrevious[tree],
            treeFront,
            "tree-front-",
            i,
            i + tree - 2,
            "assets/planet_assets/trees_back/",
            ".png"
          );
        } else {
          addAndAnimateAssets(
            buildingSetup[tree],
            buildingSetupPrevious[tree],
            treeFront,
            "tree-front-",
            i,
            i + tree - 2,
            "assets/planet_assets/trees_back/",
            ".webm"
          );
        }
      } else if (buildingSetup[tree] != "no0" && tree === 4) {
        addAndAnimateAssets(
          buildingSetup[tree],
          buildingSetupPrevious[tree],
          treeFront,
          "bush-",
          i,
          i + tree - 3,
          "assets/planet_assets/trees_front/bush/",
          ".png"
        );
      }
    }
  }
}

export function addAndAnimateAssets(
  newAsset,
  previousAsset,
  placement,
  assetClassName,
  i,
  iCalculated,
  filePath,
  fileExtention
) {
  let builingImage;
  if (fileExtention == ".png") {
    builingImage = document.createElement("img");
  } else if (fileExtention == ".webm") {
    builingImage = document.createElement("video");
    builingImage.setAttribute("autoplay", "");
    builingImage.setAttribute("loop", "");
    builingImage.setAttribute("muted", "");
  }
  let animationContainer = document.createElement("div");
  if (
    newAsset != previousAsset &&
    i == calculateBuildingNumber(gamestate.planetPosition) &&
    previousAsset != ""
  ) {
    animationContainer.classList.add("animate-disappear");
    animationContainer.classList.add(`pl-asset`);
    builingImage.classList.add(`pl-asset`);
    builingImage.classList.add(`${assetClassName}${iCalculated}`);

    animationContainer.appendChild(builingImage);
    placement.appendChild(animationContainer);

    if (previousAsset != "non0" && previousAsset != "no0" && previousAsset != undefined) {
      builingImage.setAttribute("src", `${filePath}${previousAsset}${fileExtention}`);
    }
    setTimeout(() => {
      animationContainer.classList.remove("animate-disappear");
      document
        .querySelector(`.${assetClassName}${iCalculated}`)
        .setAttribute("src", `${filePath}${newAsset}${fileExtention}`);
      animationContainer.classList.add("animate-appear");
      buildingChanged = gamestate.buildings[i];
    }, 500);
  } else {
    builingImage.setAttribute("src", `${filePath}${newAsset}${fileExtention}`);
    animationContainer.classList.add(`pl-asset`);
    builingImage.classList.add(`pl-asset`);
    builingImage.classList.add(`${assetClassName}${iCalculated}`);
    animationContainer.appendChild(builingImage);
    placement.appendChild(animationContainer);
  }
}

//select progress element
const progressElement = document.querySelector(".progress-segment");

// Updating buildings based on inputted points

let buildingChanged = "";

import { buildingCollection } from "./building_collection.js";

export function updateBuildings() {
  setTimeout(() => {
    console.log(gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)]);
    // if (
    //   gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] ===
    //     "non0.no0.no0.no0.no0" &&
    //   deletedBuilding == false &&
    //   gamestate.points >= 10
    // ) {
    //   console.log("building added");
    //   buildingSelectorBar();
    // }
  }, 500);
  if (
    gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] != "non0.no0.no0.no0.no0"
  ) {
    const progressElement = document.querySelector(".progress-segment");
    console.log(buildingCollection);
    //check which building is selected
    const currentBuilding = gamestate.buildings[
      calculateBuildingNumber(gamestate.planetPosition)
    ].slice(0, 3);
    let currentBuildingIndex;
    let currentBuildingStage = gamestate.buildings[
      calculateBuildingNumber(gamestate.planetPosition)
    ].slice(3, 4);

    changeBuildingStageIndicator(currentBuildingStage - 1);

    for (let i = 0; i < buildingCollection.length; i++) {
      if (buildingCollection[i].shortcut === currentBuilding) {
        currentBuildingIndex = i;
      }
    }
    const pointsToNextBuildingStage =
      buildingCollection[currentBuildingIndex].buildingStages[currentBuildingStage];
    const pointsToNextBuildigStageQuarter = pointsToNextBuildingStage / 4;

    nextStageView.innerHTML = ` / ${pointsToNextBuildingStage}`;
    //select random element from array and save it to a const
    const randomTree =
      buildingCollection[currentBuildingIndex].trees[
        Math.floor(Math.random() * buildingCollection[currentBuildingIndex].trees.length)
      ];
    const randomBush =
      buildingCollection[currentBuildingIndex].bushes[
        Math.floor(Math.random() * buildingCollection[currentBuildingIndex].bushes.length)
      ];

    //check if there are enough points to build the next stage
    if (gamestate.points >= pointsToNextBuildingStage) {
      buildingChanged = gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)];
      currentBuildingStage = Number(currentBuildingStage) + 1;
      // check if building is at max stage
      if (currentBuildingStage < 5) {
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] =
          currentBuilding + currentBuildingStage + ".no0.no0.no0.no0";
      } else {
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] =
          currentBuilding +
          currentBuildingStage +
          "." +
          gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[1] +
          "." +
          gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[2] +
          "." +
          gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[3] +
          "." +
          gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[4];
      }
      gamestate.points = 0;
      createPlanet();
    }

    const percentageToNextBuildingStage = gamestate.points / pointsToNextBuildingStage;
    progressElement.style.background = `repeating-conic-gradient(from 230deg, #ddebe4 0% ${
      percentageToNextBuildingStage * 70
    }%, #ffffff00 0% 100%)`;
    console.log(percentageToNextBuildingStage);

    // build a new tree when one more quarter of points to the next stage is reached
    if (
      gamestate.points > 0 &&
      gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[1] === "no0"
    ) {
      gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] =
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[0] +
        "." +
        randomTree +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[2] +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[3] +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[4];
      createPlanet();
    } else if (
      gamestate.points > pointsToNextBuildigStageQuarter &&
      gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[2] === "no0"
    ) {
      gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] =
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[0] +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[1] +
        "." +
        randomTree +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[3] +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[4];
      createPlanet();
    } else if (
      gamestate.points > pointsToNextBuildigStageQuarter * 2 &&
      gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[3] === "no0"
    ) {
      gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] =
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[0] +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[1] +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[2] +
        "." +
        randomTree +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[4];
      createPlanet();
    } else if (
      gamestate.points > pointsToNextBuildigStageQuarter * 3 &&
      gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[4] === "no0"
    ) {
      gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] =
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[0] +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[1] +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[2] +
        "." +
        gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)].split(".")[3] +
        "." +
        randomBush;
      createPlanet();
    }

    if (gamestate.points < 0) {
      const accumulatedPoints =
        buildingCollection[currentBuildingIndex].accumulatedStages[currentBuildingStage - 1] +
        gamestate.points;
      //loop throug all accumulatedstages and check if the accumulated points are higher than the current stage
      for (let i = 0; i < buildingCollection[currentBuildingIndex].accumulatedStages.length; i++) {
        if (accumulatedPoints >= buildingCollection[currentBuildingIndex].accumulatedStages[i]) {
          currentBuildingStage = i + 1;
        }
      }
      gamestate.points =
        accumulatedPoints -
        buildingCollection[currentBuildingIndex].accumulatedStages[currentBuildingStage - 1];
      gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] =
        currentBuilding + currentBuildingStage + ".no0.no0.no0.no0";
      createPlanet();
    }
  }
}

// Auführlichkeitsbewertung
var goodStart = false;
var goodStartTextArray = [
  "Guter Start!",
  "Schöner Start!",
  "Das fängt schön an!",
  "Toller Anfang!",
  "Schon 20 Wörter!",
];
var extensiveFeedback = false;
var extensiveFeedbackTextArray = [
  "Richtig ausführlich!",
  "Sehr detailliert!",
  "Überaus umfangreich!",
];
var boost = 1;
var prevBoost = 1;
var newBoost = false;
var wordCount = 0;
const pointsFloating = document.querySelector(".points-floating");
const boostBar = document.querySelector(".boost-container");

export function analyzeText(input) {
  prevBoost = boost;
  const goodStartText = goodStartTextArray[Math.floor(Math.random() * goodStartTextArray.length)];
  const extensiveFeedbackText =
    extensiveFeedbackTextArray[Math.floor(Math.random() * extensiveFeedbackTextArray.length)];
  wordCount = input.value.split(" ").length;
  console.log("Number of words: " + wordCount);
  console.log("Before analyzeText: " + newBoost);

  if (gamestate.extensiveBoost >= 2) {
    boost != 3 ? (newBoost = true) : (newBoost = false);
    boost = 3;
  } else {
    //   boost == 3 ? feedbackBarCall("Boost verloren!", boost + "x", "feedback-bad") : null;
    boost = 1;
  }

  if (gamestate.goodStartBoost >= 3) {
    if (boost == 3) {
      boost != 3 ? (newBoost = true) : (newBoost = false);
      boost = 3;
    } else {
      boost != 2 ? (newBoost = true) : (newBoost = false);
      boost = 2;
    }
  } else {
    if (boost == 3) {
      boost != 3 ? (newBoost = true) : (newBoost = false);
      boost = 3;
    } else {
      boost = 1;
    }
  }

  console.log("analyzeText: " + newBoost);

  if (wordCount > 20 && !goodStart) {
    goodStart = true;
    gamestate.points = gamestate.points + 10 * boost;
    gamestate.goodStartBoost = gamestate.goodStartBoost + 1;

    feedbackBarCall(goodStartText, 10 * boost, "feedback-good");
  }

  if (wordCount > 100 && !extensiveFeedback) {
    extensiveFeedback = true;
    gamestate.points = gamestate.points + 30 * boost;
    gamestate.extensiveBoost = gamestate.extensiveBoost + 1;

    feedbackBarCall(extensiveFeedbackText, 30 * boost, "feedback-good");
  }
}

export function analyzeRadio(radioInput) {
  if (radioInput != undefined) {
    gamestate.points = gamestate.points + 5 * boost;
    feedbackBarCall("Danke für das Feedback!", 5 * boost, "feedback-good");
    goodStart = true;
  } else {
    gamestate.points = gamestate.points - 5 * boost;
    feedbackBarCall("Schade, keine Angabe!", -5 * boost, "feedback-bad");
    goodStart = false;
  }
}

export function feedbackBarCall(message, acheivedPoints, color) {
  feedbackBar.innerHTML = `<div class="feedback-content">${message}</div>`;
  feedbackBar.classList.remove("feedback-bad");
  feedbackBar.classList.remove("feedback-good");
  feedbackBar.classList.remove("feedback-boost");
  feedbackBar.classList.add(color);
  feedbackBar.classList.remove("bar-closed");
  setTimeout(() => {
    feedbackBar.classList.add("bar-closed");
    if (acheivedPoints != 0) {
      setTimeout(() => {
        pointsFloating.innerText = `${acheivedPoints}`;
        pointsFloating.style.color = color == "feedback-good" ? "#76b093" : "#de576e";
        pointsFloating.classList.add("points-floating-animation-add");
        feedbackBar.innerHTML = `<img src="./assets/icons/plus.png" class="feedback-icon" alt=""><div class="feedback-content">${
          gamestate.points - acheivedPoints
        }</div>`;
        boost > 1 ? feedbackBar.classList.add("feedback-boost") : null;
        feedbackBar.classList.remove("bar-closed");
        countTo(acheivedPoints, ".feedback-content", 20, 900);
        setTimeout(() => {
          feedbackBar.classList.add("bar-closed");
          pointsFloating.classList.remove("points-floating-animation-add");
          boost > 1 ? feedbackBar.classList.remove("feedback-boost") : null;
          setTimeout(() => {
            if (
              gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] ===
                "non0.no0.no0.no0.no0" &&
              deletedBuilding == false &&
              gamestate.points >= 10
            ) {
              buildingSelectorBar();
            }
            updateBuildings();
          }, 300);
        }, 2600 + 20 * acheivedPoints);
      }, 300);
    }
  }, 2000);
}

import { submitData, researchData } from "./google_form_submission.js";

export function submitFeedback() {
  // if basic feedback isn't given, boosts are reset
  if (goodStart) {
    gamestate.activeBoost = true;
  } else {
    gamestate.activeBoost = false;
    gamestate.extensiveBoost = 0;
    gamestate.goodStartBoost = 0;
  }

  if (gamestate.extensiveBoost >= 2) {
    boost != 3 ? (newBoost = true) : (newBoost = false);
    boost = 3;
    gamestate.trackingData.boostKind.extensiveAmount++;
  } else {
    boost = 1;
  }

  if (gamestate.goodStartBoost >= 3) {
    if (boost == 3) {
      boost != prevBoost ? (newBoost = true) : (newBoost = false);
      boost = 3;
    } else {
      boost != prevBoost ? (newBoost = true) : (newBoost = false);
      boost = 2;
      gamestate.trackingData.boostKind.goodStartAmount++;
    }
  } else {
    if (boost == 3) {
      boost != prevBoost ? (newBoost = true) : (newBoost = false);
      boost = 3;
    } else {
      boost = 1;
    }
  }

  // save Gamestate to database
  updateData();

  if (boost > prevBoost) {
    boostBar.classList.remove("boost-hidden");
    feedbackBarCall("Neuer Boost!", 0, "feedback-boost");
    gamestate.trackingData.boosts++;
    console;
  } else if (boost < prevBoost) {
    boostBar.classList.add("boost-hidden");
    feedbackBarCall("Boost verloren!", 0, "feedback-bad");
  } else if (boost == prevBoost) {
  }

  // reset values
  prevBoost = boost;
  goodStart = false;
  extensiveFeedback = false;
}

//add eventlistener for submitFeedback
// document.getElementById("submit").addEventListener("click", submitFeedback);

export function countTo(addedPoints, place, interval, timeout) {
  let from = gamestate.points - addedPoints;
  let to = gamestate.points;
  let step = to > from ? 1 : -1;

  const feedbackContent = document.querySelector(place);

  setTimeout(function () {
    if (from == to) {
      feedbackContent.textContent = from;
      return;
    }

    let counter = setInterval(function () {
      from += step;
      feedbackContent.textContent = from;
      if (from == to) {
        clearInterval(counter);
      }
    }, interval);
  }, timeout);
}

//Building and Planet selector boxes

export function planetSelectorBar() {
  feedbackBar.classList.add("planet-selector");

  setTimeout(() => {
    const planetStyles = ["ma", "ve", "sa", "ne", "mo"];

    let randomNumber = Math.floor(Math.random() * planetStyles.length);
    let pl1Random = planetStyles[randomNumber];

    planetStyles.splice(randomNumber, 1);
    randomNumber = Math.floor(Math.random() * planetStyles.length);
    let pl2Random = planetStyles[randomNumber];

    planetStyles.splice(randomNumber, 1);
    randomNumber = Math.floor(Math.random() * planetStyles.length);
    let pl3Random = planetStyles[randomNumber];

    feedbackBar.innerHTML = ` 
      <div class="feedback-content ">Wähle einen Planeten:</div>
      <img src="./assets/planet_assets/planets/preview/${pl1Random}no.png" class="planet-icon" id="pl1">
      <img src="./assets/planet_assets/planets/preview/${pl2Random}no.png" class="planet-icon" id="pl2">
      <img src="./assets/planet_assets/planets/preview/${pl3Random}no.png" class="planet-icon" id="pl3">`;
    planetEmbedded.classList.add("no-action");
    feedbackBar.classList.add("feedback-good");
    feedbackBar.classList.remove("bar-closed");

    document.querySelector("#pl1").addEventListener("click", function () {
      planetSelector(pl1Random);
    });
    document.querySelector("#pl2").addEventListener("click", function () {
      planetSelector(pl2Random);
    });
    document.querySelector("#pl3").addEventListener("click", function () {
      planetSelector(pl3Random);
    });
  }, 100);
}

export function planetSelector(selected) {
  gamestate.trackingData.bannerInteractions++;
  gamestate.planet = selected;
  console.log("Planet selected: " + selected);
  document.querySelector(
    "#planet-background"
  ).src = `./assets/planet_assets/planets/${selected}no.png`;
  feedbackBar.classList.add("bar-closed");
  setTimeout(() => {
    colorSelectorBar(selected);
  }, 1000);
}

export function colorSelectorBar(pSelected) {
  feedbackBar.innerHTML = ` 
  <div class="feedback-content ">Wähle eine Farbe:</div>
      <img src="./assets/planet_assets/planets/preview/pu.png" class="planet-icon" id="pu">
      <img src="./assets/planet_assets/planets/preview/bl.png" class="planet-icon" id="bl">
      <img src="./assets/planet_assets/planets/preview/ye.png" class="planet-icon" id="ye">
      <img src="./assets/planet_assets/planets/preview/br.png" class="planet-icon" id="br">
      <img src="./assets/planet_assets/planets/preview/gr.png" class="planet-icon" id="gr">
      <img src="./assets/planet_assets/planets/preview/re.png" class="planet-icon" id="re">`;
  feedbackBar.classList.remove("bar-closed");

  //see which element has been clicked
  document.querySelector("#pu").addEventListener("click", function () {
    colorSelector(pSelected + "pu");
  });
  document.querySelector("#bl").addEventListener("click", function () {
    colorSelector(pSelected + "bl");
  });
  document.querySelector("#ye").addEventListener("click", function () {
    colorSelector(pSelected + "ye");
  });
  document.querySelector("#br").addEventListener("click", function () {
    colorSelector(pSelected + "br");
  });
  document.querySelector("#gr").addEventListener("click", function () {
    colorSelector(pSelected + "gr");
  });
  document.querySelector("#re").addEventListener("click", function () {
    colorSelector(pSelected + "re");
  });
}

export function colorSelector(selected) {
  gamestate.trackingData.bannerInteractions++;
  gamestate.planet = selected;
  console.log("Color selected: " + selected);
  document.querySelector(
    "#planet-background"
  ).src = `./assets/planet_assets/planets/${selected}.png`;
  feedbackBar.classList.add("bar-closed");
  feedbackBar.classList.remove("planet-selector");
  planetEmbedded.classList.remove("no-action");
  updateData();
  setTimeout(() => {
    addRandomSky();
    createPlanet();
  }, 1000);
}

export function addRandomSky() {
  const skyStyles = ["day1"];

  let randomNumber = Math.floor(Math.random() * skyStyles.length);
  let skyRandom = skyStyles[randomNumber];

  if (getBrowser() === "Safari") {
    document.querySelector(
      "#background-image-sky"
    ).src = `./assets/planet_assets/sky/${skyRandom}.png`;
  } else {
    document.querySelector(
      "#background-video-sky"
    ).src = `./assets/planet_assets/sky/${skyRandom}.webm`;
  }
  skySet = true;
}

export function buildingSelectorBar() {
  feedbackBar.classList.add("planet-selector");
  setTimeout(() => {
    //get all building styles from the building collection and add them to an array
    let buildingStyles = [];
    for (let i = 0; i < buildingCollection.length; i++) {
      buildingStyles.push(i);
    }

    let randomNumber = Math.floor(Math.random() * buildingStyles.length);
    let b1Index = buildingStyles[randomNumber];

    buildingStyles.splice(randomNumber, 1);
    randomNumber = Math.floor(Math.random() * buildingStyles.length);
    let b2Index = buildingStyles[randomNumber];

    buildingStyles.splice(randomNumber, 1);
    randomNumber = Math.floor(Math.random() * buildingStyles.length);
    let b3Index = buildingStyles[randomNumber];

    feedbackBar.innerHTML = ` 
      <div class="feedback-content ">Wähle ein Gebäude:</div>
      <div class="first-building-container">
        
        <img src="./assets/planet_assets/planets/preview/${buildingCollection[b1Index].shortcut}.png" class="planet-icon" id="b1">
        <div id="countdown">
            <svg>
                <circle r="18" cx="20" cy="20"></circle>
            </svg>
        </div>
      </div>
      <img src="./assets/planet_assets/planets/preview/${buildingCollection[b2Index].shortcut}.png" class="planet-icon" id="b2">
      <img src="./assets/planet_assets/planets/preview/${buildingCollection[b3Index].shortcut}.png" class="planet-icon" id="b3">`;
    planetEmbedded.classList.add("no-action");
    feedbackBar.classList.add("feedback-good");
    feedbackBar.classList.remove("bar-closed");

    document.querySelector("#b1").addEventListener("click", function () {
      buildingSelector(buildingCollection[b1Index].shortcut);
    });
    document.querySelector("#b2").addEventListener("click", function () {
      buildingSelector(buildingCollection[b2Index].shortcut);
    });
    document.querySelector("#b3").addEventListener("click", function () {
      buildingSelector(buildingCollection[b3Index].shortcut);
    });

    priceReveal(
      buildingCollection[b1Index],
      buildingCollection[b2Index],
      buildingCollection[b3Index]
    );

    setTimeout(() => {
      buildingSelector(buildingCollection[b1Index].shortcut);
    }, 20000);
  }, 100);
}

function priceReveal(building1, building2, building3) {
  const buildingPreviews = document.querySelectorAll(".planet-icon");
  const stage1PriceLabel = document.querySelector(".price-preview:nth-child(1)");
  const stage1Price = document.querySelector("#stage-1-price");
  const stage2PriceLabel = document.querySelector(".price-preview:nth-child(2)");
  const stage2Price = document.querySelector("#stage-2-price");

  document.querySelector("#b1").addEventListener("mouseover", function () {
    stage1PriceLabel.classList.add("price-preview-active");
    stage2PriceLabel.classList.add("price-preview-active");
    stage1Price.innerHTML = building1.buildingStages[1];
    stage2Price.innerHTML = building1.accumulatedStages[4];
  });

  document.querySelector("#b2").addEventListener("mouseover", function () {
    stage1PriceLabel.classList.add("price-preview-active");
    stage2PriceLabel.classList.add("price-preview-active");
    stage1Price.innerHTML = building2.buildingStages[1];
    stage2Price.innerHTML = building2.accumulatedStages[4];
  });

  document.querySelector("#b3").addEventListener("mouseover", function () {
    stage1PriceLabel.classList.add("price-preview-active");
    stage2PriceLabel.classList.add("price-preview-active");
    stage1Price.innerHTML = building3.buildingStages[1];
    stage2Price.innerHTML = building3.accumulatedStages[4];
  });

  buildingPreviews.forEach((buildingPreview) => {
    buildingPreview.addEventListener("mouseleave", function () {
      stage1PriceLabel.classList.remove("price-preview-active");
      stage2PriceLabel.classList.remove("price-preview-active");
    });
  });
}

export function buildingSelector(selected) {
  gamestate.trackingData.bannerInteractions++;

  gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] =
    selected + "1.no0.no0.no0.no0";

  console.log(gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)]);

  feedbackBar.classList.add("bar-closed");
  feedbackBar.classList.remove("planet-selector");
  planetEmbedded.classList.remove("no-action");
  updateData();
  updateBuildings();
  console.log("Building selected: " + selected);
}

// Planet Rotation

const rotateRight = document.querySelector("#rotate-right");
const rotateLeft = document.querySelector("#rotate-left");

rotateRight.addEventListener("click", rotatePlanetRight);
rotateLeft.addEventListener("click", rotatePlanetLeft);

export function rotatePlanetRight() {
  gamestate.trackingData.turnClicks++;
  editToolbarOpen ? toggleTrees() : null;
  planetContainer.classList.remove("rotate-animation");
  planetContainer.classList.add("rotate-on-click-animation");

  setTimeout(() => {
    planetContainer.classList.remove("pos-" + gamestate.planetPosition);
    if (gamestate.planetPosition >= 8) {
      gamestate.planetPosition++;
      planetContainer.classList.add("pos-" + gamestate.planetPosition);

      setTimeout(() => {
        planetContainer.classList.remove("rotate-on-click-animation");
        planetContainer.classList.remove("pos-" + gamestate.planetPosition);
        gamestate.planetPosition = 1;
        planetContainer.classList.add("pos-" + gamestate.planetPosition);
        console.log("Position: " + gamestate.planetPosition);
        console.log("Position up: " + calculateBuildingNumber(gamestate.planetPosition));
        buildingChanged = gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)];
        nextStageView.innerHTML = ` / ${0}`;
        deletedBuilding = true;
        updateBuildings();
      }, 501);
    } else {
      gamestate.planetPosition++;
      planetContainer.classList.add("pos-" + gamestate.planetPosition);
      console.log("Position: " + gamestate.planetPosition);
      console.log("Position up: " + calculateBuildingNumber(gamestate.planetPosition));
      buildingChanged = gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)];
      nextStageView.innerHTML = ` / ${0}`;
      deletedBuilding = true;
      updateBuildings();
    }
  }, 50);
}

export function rotatePlanetLeft() {
  gamestate.trackingData.turnClicks++;
  editToolbarOpen ? toggleTrees() : null;
  planetContainer.classList.remove("rotate-animation");
  planetContainer.classList.add("rotate-on-click-animation");

  if (gamestate.planetPosition <= 1) {
    planetContainer.classList.remove("rotate-on-click-animation");
    planetContainer.classList.remove("pos-" + gamestate.planetPosition);
    gamestate.planetPosition = 9;
    planetContainer.classList.add("pos-" + gamestate.planetPosition);
    setTimeout(() => {
      planetContainer.classList.add("rotate-on-click-animation");
      planetContainer.classList.remove("pos-" + gamestate.planetPosition);
      gamestate.planetPosition--;
      planetContainer.classList.add("pos-" + gamestate.planetPosition);
      console.log("Position: " + gamestate.planetPosition);
      console.log("Position up: " + calculateBuildingNumber(gamestate.planetPosition));
      buildingChanged = gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)];
      nextStageView.innerHTML = ` / ${0}`;
      deletedBuilding = true;
      updateBuildings();
    }, 50);
  } else {
    planetContainer.classList.remove("pos-" + gamestate.planetPosition);
    gamestate.planetPosition--;
    planetContainer.classList.add("pos-" + gamestate.planetPosition);
    console.log("Position: " + gamestate.planetPosition);
    console.log("Position up: " + calculateBuildingNumber(gamestate.planetPosition));
    buildingChanged = gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)];
    nextStageView.innerHTML = ` / ${0}`;
    deletedBuilding = true;
    updateBuildings();
  }
}

export function calculateBuildingNumber(plPosition) {
  let buildingNumber = 0;
  if (plPosition == 1) {
    buildingNumber = 1;
    buildingNumber = buildingNumber - 1;
  } else {
    buildingNumber = 10 - plPosition;
    buildingNumber = buildingNumber - 1;
  }
  return buildingNumber;
}

// Overlay Toggle
const overlay = document.querySelector(".dark-overlay");
const closeDetails = document.querySelector("#close-details");
const planetEmbedded = document.querySelector(".pl-embedded");
const plButtons = document.querySelector(".pl-buttons");
const userNameOutput = document.querySelector("#userName");
const userIcon = document.querySelector("#userIcon");

export function closeOverlay() {
  overlay.classList.add("opacity-hidden");
  plButtons.classList.add("opacity-hidden");
  planetContainer.classList.remove("rotate-animation");
  planetEmbedded.classList.remove("pl-extended");

  setTimeout(() => {
    overlay.classList.add("hidden");
    plButtons.classList.add("hidden");
    boostBar.classList.remove("opacity-hidden");
    progressElement.classList.remove("opacity-hidden");
    deletedBuilding = false;

    if (
      gamestate.buildings[calculateBuildingNumber(gamestate.planetPosition)] ===
        "non0.no0.no0.no0.no0" &&
      gamestate.points >= 10
    ) {
      buildingSelectorBar();
    }
    updateBuildings();
    updateData();
  }, 500);
}

export function openOverlay() {
  gamestate.trackingData.planetClicks++;
  createPlanet();
  updateBuildings();
  overlay.classList.remove("hidden");
  plButtons.classList.remove("hidden");
  boostBar.classList.add("opacity-hidden");
  progressElement.classList.add("opacity-hidden");
  if (gamestate.planetPosition == 1) {
    planetContainer.classList.add("rotate-animation");
  }
  planetEmbedded.classList.add("pl-extended");
  setTimeout(() => {
    overlay.classList.remove("opacity-hidden");
    plButtons.classList.remove("opacity-hidden");
  }, 100);
}

overlay.addEventListener("click", closeOverlay);
closeDetails.addEventListener("click", closeOverlay);

planetContainer.addEventListener("click", openOverlay);
userNameOutput.addEventListener("click", openOverlay);
userIcon.addEventListener("click", openOverlay);

// open trees toolbar on edit click

const editView = document.querySelector(".edit-view");
const editImgWhite = document.querySelector(".edit-view img:nth-child(1)");
const editImgGreen = document.querySelector(".edit-view img:nth-child(2)");
let editToolbarOpen = false;

export function toggleTrees() {
  const buildingPosition = calculateBuildingNumber(gamestate.planetPosition);
  const buildingArray = gamestate.buildings[buildingPosition].split(".");

  for (let i = 0; i < buildingArray.length; i++) {
    if (i > 0) {
      const currentTree = document.querySelector("#tree-" + i);
      const currentTreeImage = document.querySelector("#tree-" + i + " .icons-stacking img");
      if (buildingArray[i] != "no0") {
        currentTreeImage.src = "./assets/planet_assets/tree_icons/" + buildingArray[i] + ".png";
      } else {
        currentTree.classList.add("hidden");
      }
    }
  }

  for (let i = 1; i <= 4; i++) {
    const currentTree = document.querySelector("#tree-" + i);
    const currentTreeImage = document.querySelector("#tree-" + i + " .icons-stacking img");

    if (editToolbarOpen) {
      currentTree.classList.remove("selected");
      currentTree.classList.remove("hidden");
    } else {
      currentTree.classList.add("selected");
    }
  }
  editToolbarOpen = !editToolbarOpen;
  if (!editToolbarOpen) {
    editImgWhite.setAttribute("src", "./assets/icons/tree/tree_white.png");
    editImgGreen.setAttribute("src", "./assets/icons/tree/tree_green.png");
  } else {
    editImgWhite.setAttribute("src", "./assets/icons/tree/close_white.png");
    editImgGreen.setAttribute("src", "./assets/icons/tree/close_green.png");
  }
}

editView.addEventListener("click", toggleTrees);

// exchange trees

const tree1 = document.querySelector("#tree-1");
const tree2 = document.querySelector("#tree-2");
const tree3 = document.querySelector("#tree-3");
const tree4 = document.querySelector("#tree-4");

export function exchangeTree(treeNumber) {
  const treeStyles = [
    "ei1",
    "ei2",
    "ei3",
    "ei4",
    "ei5",
    "ei6",
    "ma1",
    "ma2",
    "ma3",
    "ma4",
    "ma5",
    "ma6",
    "pa1",
    "pa2",
    "pa3",
    "pi1",
    "pi2",
    "pi3",
  ];
  const bushStyles = ["bu1", "bu2", "bu3", "gr1", "gr2", "gr3", "ro1", "ro2", "ro3"];
  const buildingPosition = calculateBuildingNumber(gamestate.planetPosition);
  const randomTree = Math.floor(Math.random() * treeStyles.length);
  const randomBush = Math.floor(Math.random() * bushStyles.length);
  const buildingArray = gamestate.buildings[buildingPosition].split(".");
  let newBuildingCode = "";

  gamestate.trackingData.editTreeClicks++;

  if (gamestate.points >= 10) {
    if (buildingArray[treeNumber] != "no0") {
      for (let i = 0; i < buildingArray.length; i++) {
        if (i == 0) {
          newBuildingCode = newBuildingCode + buildingArray[i];
        } else if (i == 1 && i == treeNumber) {
          newBuildingCode = newBuildingCode + "." + treeStyles[randomTree];
        } else if (i == 1 && i != treeNumber) {
          newBuildingCode = newBuildingCode + "." + buildingArray[i];
        } else if (i == 2 && i == treeNumber) {
          newBuildingCode = newBuildingCode + "." + treeStyles[randomTree];
        } else if (i == 2 && i != treeNumber) {
          newBuildingCode = newBuildingCode + "." + buildingArray[i];
        } else if (i == 3 && i == treeNumber) {
          newBuildingCode = newBuildingCode + "." + treeStyles[randomTree];
        } else if (i == 3 && i != treeNumber) {
          newBuildingCode = newBuildingCode + "." + buildingArray[i];
        } else if (i == 4 && i == treeNumber) {
          newBuildingCode = newBuildingCode + "." + bushStyles[randomBush];
        } else if (i == 4 && i != treeNumber) {
          newBuildingCode = newBuildingCode + "." + buildingArray[i];
        }
      }
      gamestate.points = gamestate.points - 10;
      countTo(-10, "#current-points", 50, 100);
      toggleTrees();
      setTimeout(() => {
        gamestate.buildings[buildingPosition] = newBuildingCode;
        console.log(treeNumber);
        console.log(newBuildingCode);
        updateBuildings();
        createPlanet();
        updateData();
      }, 1000);
    } else {
      return;
    }
  }
}

tree1.addEventListener("click", () => exchangeTree(1));
tree2.addEventListener("click", () => exchangeTree(2));
tree3.addEventListener("click", () => exchangeTree(3));
tree4.addEventListener("click", () => exchangeTree(4));

// remove building

const removeBuildingButton = document.querySelector(".delete-view");
let deletedBuilding = false;
const confirmAlert = document.querySelector("#confirm-alert");
const cancelAlert = document.querySelector("#cancel-alert");
const alertOverlay = document.querySelector(".alert-overlay");

export function removeBuilding() {
  const buildingPosition = calculateBuildingNumber(gamestate.planetPosition);
  gamestate.buildings[buildingPosition] = "non0.no0.no0.no0.no0";
  deletedBuilding = true;
  updateBuildings();
  createPlanet();
  updateData();
}

export function removeBuildingConfirmation() {
  alertOverlay.classList.remove("hidden");
  setTimeout(() => {
    alertOverlay.classList.remove("opacity-hidden");
  }, 100);
}

export function cancelRemoveBuilding() {
  alertOverlay.classList.add("opacity-hidden");
  setTimeout(() => {
    alertOverlay.classList.add("hidden");
  }, 500);
}

removeBuildingButton.addEventListener("click", removeBuildingConfirmation);
confirmAlert.addEventListener("click", removeBuilding);
cancelAlert.addEventListener("click", cancelRemoveBuilding);
alertOverlay.addEventListener("click", cancelRemoveBuilding);

function changeBuildingStageIndicator(buildingStage) {
  const deleteviewIcon = document.querySelector(".delete-view img:nth-child(2)");
  deleteviewIcon.setAttribute("src", "./assets/icons/house/stage" + buildingStage + "_green.png");
}
