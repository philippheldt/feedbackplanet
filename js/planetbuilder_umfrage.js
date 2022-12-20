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
  analyzeTextLength,
  analyzeConcreteness,
  analyzeRadio,
  submitFeedback,
  feedbackBarCall,
} from "./planetbuilder_fb.js";

import { suggestions } from "./suggestions.js";

import { getRadioValue, skalen, freitexte, submitData } from "./google_form_submission.js";

let containerPosition = 0;

const radioContainerPositions = [null, 0, 1, 2, 3, null, null, null, 4, null];
const textfieldContainerPositions = [null, null, null, null, null, 0, 1, 2, null, null];

const nextButton = document.querySelector("#nextq");
const prevButton = document.querySelector("#prevq");
const input = document.querySelectorAll(".feedback-input");
const planetContainer = document.querySelector(".pl-container");
const submitButton = document.querySelector("#submit");
let suggestionTimeout = null;
let textSuggestionCurrent = null;

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
  if (textfieldContainerPositions[containerPosition + 1] != null) {
    textSuggestionCurrent = textfieldContainerPositions[containerPosition + 1];
    displaySuggestions();
  }
  if (textfieldContainerPositions[containerPosition] != null) {
    //console.log(freitexte[textfieldContainerPositions[containerPosition]].value);
    if (freitexte[textfieldContainerPositions[containerPosition]].value != "") {
      getSentiment(freitexte[textfieldContainerPositions[containerPosition]].value);
    }
  }
  containerPosition++;
});

prevButton.addEventListener("click", () => {
  if (textfieldContainerPositions[containerPosition - 1] != null) {
    textSuggestionCurrent = textfieldContainerPositions[containerPosition - 1];
    displaySuggestions();
  }
  containerPosition--;
});

submitButton.addEventListener("click", () => {
  submitData();
});

//check inputs for changes
let timeout = null;

let animationStarted = false;

const textinputs = document.querySelectorAll(".feedback-input");
const duplicates = document.querySelectorAll(".duplicate-text");
const textsuggestion = document.querySelectorAll(".textsuggestion");
const textSuggestionClose = document.querySelectorAll(".close-suggestion");

for (let i = 0; i < input.length; i++) {
  input[i].addEventListener("keyup", function (e) {
    !animationStarted ? planetContainer.classList.add("typing") : null;
    animationStarted = true;
    textSuggestionCurrent != null ? removeSuggestions() : null;
    clearTimeout(timeout);
    clearTimeout(suggestionTimeout);

    timeout = setTimeout(function () {
      planetContainer.classList.remove("typing");
      animationStarted = false;
      for (let i = 0; i < textinputs.length; i++) {
        duplicates[i].innerHTML = textinputs[i].value;
      }
      analyzeTextLength(input[i], i);
      analyzeConcreteness(input[i], i);

      displaySuggestions();
    }, 500);
  });
}

textsuggestion.forEach((element) => {
  element.addEventListener("click", function () {
    textinputs[textSuggestionCurrent].value != ""
      ? (textinputs[textSuggestionCurrent].value += " " + element.innerText)
      : (textinputs[textSuggestionCurrent].value = element.innerText);

    textinputs[textSuggestionCurrent].dispatchEvent(new Event("keyup"));
  });
});

textSuggestionClose.forEach((element) => {
  element.addEventListener("click", function () {
    removeSuggestions();
  });
});

function displaySuggestions() {
  suggestionTimeout = setTimeout(function () {
    textsuggestion[textSuggestionCurrent].style.display = "inline";
    textSuggestionClose[textSuggestionCurrent].style.display = "inline";
    const randomSuggestion = Math.floor(Math.random() * suggestions[textSuggestionCurrent].length);
    textsuggestion[textSuggestionCurrent].innerText =
      suggestions[textSuggestionCurrent][randomSuggestion];
    setTimeout(function () {
      textsuggestion[textSuggestionCurrent].classList.remove("opacity-hidden");
      textSuggestionClose[textSuggestionCurrent].classList.remove("opacity-hidden");
    }, 500);
  }, 15000);
}

function removeSuggestions() {
  for (let i = 0; i < textsuggestion.length; i++) {
    textsuggestion[i].style.display = "none";
    textSuggestionClose[i].style.display = "none";
    textsuggestion[i].classList.add("opacity-hidden");
    textSuggestionClose[i].classList.add("opacity-hidden");
  }
}
