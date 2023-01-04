import { gamestate } from "./gamedata/gamestate.js";
//import { getSentiment } from "./sentiment_analysis.js";
import { updateBuildings, feedbackBarCall, openFinalSlide } from "./planetbuilder_fb.js";
import {
  submitFeedback,
  analyzeTextStructure,
  analyzeIchBotschaft,
  analyzeTextLength,
  analyzeTextLengthNoAction,
  analyzeConcreteness,
  analyzeRadio,
} from "./text_analysis.js";

import { suggestions } from "./gamedata/suggestions.js";

import { getRadioValue, skalen, freitexte, submitData } from "./google_form_submission.js";

let containerPosition = 0;
let pointsBefore = 0;
let pointsAcheived = 0;

const radioContainerPositions = [null, 0, 1, 2, 3, null, null, null, null, 4, null];
const textfieldContainerPositions = [null, null, null, null, null, 0, 1, 2, 3, null, null];

const videoMeta = document.querySelector("#video-meta").innerText;

const conatiner = document.querySelector(".container");
const nextPoll = document.querySelector("#nextPoll");
const nextButton = document.querySelector("#nextq");
const prevButton = document.querySelector("#prevq");
const input = document.querySelectorAll(".feedback-input");
const planetContainer = document.querySelector(".pl-container");
const submitButton = document.querySelector("#submit");
let suggestionTimeout = null;
let textSuggestionCurrent = null;

nextButton.addEventListener("click", () => {
  pointsBefore = gamestate.points;
  if (containerPosition == 0) {
    const secondsOutput = document.querySelector(".seconds-output").innerText;
    if (Number(secondsOutput) > 180) {
      gamestate.points = gamestate.points + 30;
      feedbackBarCall("Video angeschaut!", 30, "feedback-good");
    } else if (Number(secondsOutput) > 30) {
      gamestate.points = gamestate.points + 10;
      feedbackBarCall("Video angefangen!", 10, "feedback-good");
    }
  }

  if (radioContainerPositions[containerPosition] != null) {
    analyzeRadio(getRadioValue(skalen[radioContainerPositions[containerPosition]]));
  }
  if (textfieldContainerPositions[containerPosition + 1] != null) {
    textSuggestionCurrent = textfieldContainerPositions[containerPosition + 1];
    displaySuggestions();
  }
  if (textfieldContainerPositions[containerPosition] != null) {
    analyzeTextLengthNoAction(
      input[textfieldContainerPositions[containerPosition]],
      containerPosition
    );
    gamestate.trackingData.wordsWritten =
      gamestate.trackingData.wordsWritten +
      input[textfieldContainerPositions[containerPosition]].value.split(" ").length;
  }

  // if (textfieldContainerPositions[containerPosition] != null) {
  //   //
  //   if (freitexte[textfieldContainerPositions[containerPosition]].value != "") {
  //   //  getSentiment(freitexte[textfieldContainerPositions[containerPosition]].value);
  //   }
  // }
  containerPosition++;
  updateBuildings();
  submitFeedback();

  gamestate.points > pointsBefore
    ? (pointsAcheived = pointsAcheived + (gamestate.points - pointsBefore))
    : null;
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

  conatiner.classList.add("hidden");
  openFinalSlide();

  switch (videoMeta) {
    case "Video 1":
      localStorage.setItem("poll1", true);
      break;
    case "Video 2":
      localStorage.setItem("poll2", true);
      break;
    case "Video 3":
      localStorage.setItem("poll3", true);
      break;
    case "Video 4":
      localStorage.setItem("poll4", true);
      break;
  }
});

nextPoll.addEventListener("click", function () {
  switch (videoMeta) {
    case "Video 1":
      window.location.href = "umfrage2.html";
      break;
    case "Video 2":
      window.location.href = "umfrage3.html";
      break;
    case "Video 3":
      window.location.href = "umfrage4.html";
      break;
    case "Video 4":
      window.location.href = "umfrage1.html";
      break;
  }
});

//check inputs for changes
let timeout = null;

let animationStarted = false;

const textinputs = document.querySelectorAll(".feedback-input");
const duplicates = document.querySelectorAll(".duplicate-text");
let duplicateTextWithLinebraks = "";
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

      analyzeConcreteness(input[i], i);
      analyzeIchBotschaft(input[i], i);
      analyzeTextStructure(input[i], i);
      analyzeTextLength(input[i], i);

      displaySuggestions();
    }, 500);
  });
}

textsuggestion.forEach((element) => {
  element.addEventListener("click", function () {
    textinputs[textSuggestionCurrent].value != ""
      ? (textinputs[textSuggestionCurrent].value += " " + element.innerText.split(".").join(""))
      : (textinputs[textSuggestionCurrent].value = element.innerText.split(".").join(""));

    textinputs[textSuggestionCurrent].dispatchEvent(new Event("keyup"));
    gamestate.trackingData.suggestionClicks++;
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
