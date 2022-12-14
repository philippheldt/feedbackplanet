import { gamestate } from "./gamestate.js";
import { getSentiment } from "./sentiment_analysis.js";
import {
  buildingSelectorBar,
  calculateBuildingNumber,
  createPlanet,
  getData,
  planetSelectorBar,
  updateBuildings,
  updateData,
  analyzeText,
  analyzeRadio,
  submitFeedback,
  feedbackBarCall,
} from "./planetbuilder_fb.js";

import { getRadioValue, skalen, freitexte, submitData } from "./google_form_submission.js";

let containerPosition = 0;

const radioContainerPositions = [null, 0, 1, 2, 3, null, null, null, 4, null];
const textfieldContainerPositions = [null, null, null, null, null, 0, 1, 2, null, null];

const nextButton = document.querySelector("#nextq");
const input = document.querySelectorAll(".feedback-input");
const planetContainer = document.querySelector(".pl-container");
const submitButton = document.querySelector("#submit");

nextButton.addEventListener("click", () => {
  if (containerPosition == 0) {
    const secondsOutput = document.querySelector(".seconds-output").innerText;
    if (Number(secondsOutput) > 360) {
      gamestate.points = gamestate.points + 20;
      feedbackBarCall("Video angeschaut!", 20, "feedback-good");
    } else if (Number(secondsOutput) > 10) {
      gamestate.points = gamestate.points + 5;
      feedbackBarCall("Video angefangen!", 5, "feedback-good");
    }
  }
  console.log("button submit");
  updateBuildings();
  submitFeedback();

  if (radioContainerPositions[containerPosition] != null) {
    analyzeRadio(getRadioValue(skalen[radioContainerPositions[containerPosition]]));
  }
  if (textfieldContainerPositions[containerPosition] != null) {
    //console.log(freitexte[textfieldContainerPositions[containerPosition]].value);
    getSentiment(freitexte[textfieldContainerPositions[containerPosition]].value);
  }
  containerPosition++;
});

submitButton.addEventListener("click", () => {
  submitData();
});

//check inputs for changes
let timeout = null;
let animationStarted = false;

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("keyup", function (e) {
    !animationStarted ? planetContainer.classList.add("typing") : null;
    animationStarted = true;
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      planetContainer.classList.remove("typing");
      animationStarted = false;
      analyzeText(input[i]);
    }, 250);
  });
}
