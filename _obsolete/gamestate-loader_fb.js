import { gamestate } from "../js/planetbuilder_fb.js";
import { updateData } from "../js/planetbuilder_fb.js";

//Insert Data
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
    gamestate.points = input.value.length;
    console.log(gamestate.points);
    updateData();
  }, 250);
});
