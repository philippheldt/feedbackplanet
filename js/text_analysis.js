import { gamestate } from "./gamedata/gamestate.js";
import { updateData } from "./planetbuilder_fb.js";
import { feedbackBarCall } from "./planetbuilder_fb.js";

const boostBar = document.querySelector(".boost-container");

// Feedbacktexte
const goodStartTextArray = [
  "Guter Start!",
  "Guter Anfang!",
  "Schöner Start!",
  "Toller Anfang!",
  "20 Wörter!",
  "Solide Basis!",
  "Gute Anzahl!",
];

const extensiveFeedbackTextArray = [
  "Ausführlich!",
  "Detailliert!",
  "Umfangreich!",
  "Gründlich!",
  "Umfassend!",
];

const concretenessArray = ["Konkretes Feedback!", "Spezifisches Feedback!"];

const structuredTextArray = [
  "Gute Struktur!",
  "Gute Gliederung!",
  "Klar Organisiert!",
  "Logisch Aufgebaut!",
];

const containsIchArray = ["Ich-Botschaften!"];

const checkBoxArray = [
  "Danke!",
  "Vielen Dank!",
  "Dankeschön!",
  "Super!",
  "Weiter so!",
  "Das hilft weiter!",
];

// Auführlichkeitsbewertung -------------------------------------------------------------------------------------------

let goodStart = false;
let extensiveFeedback = false;
export let boost = 1;
let prevBoost = 1;
let newBoost = false;
let wordCount = 0;

export function analyzeTextLength(input, index) {
  prevBoost = boost;
  wordCount = input.value.split(" ").length;

  const goodStartText = goodStartTextArray[Math.floor(Math.random() * goodStartTextArray.length)];
  const extensiveFeedbackText =
    extensiveFeedbackTextArray[Math.floor(Math.random() * extensiveFeedbackTextArray.length)];

  if (wordCount > 100 && !extensiveFeedback) {
    extensiveFeedback = true;
    gamestate.goodStartBoost = gamestate.goodStartBoost + 1;

    addPoints(30, extensiveFeedbackText);
    markTextRange(0, 100, index);
  } else if (wordCount > 20 && goodStart == false) {
    goodStart = true;
    gamestate.goodStartBoost = gamestate.goodStartBoost + 1;

    addPoints(10, goodStartText);
    markTextRange(0, 20, index);
  }

  gamestate.goodStartBoost >= 2 ? (boost = 2) : (boost = 1);
}

// Konkretkeitsbewertung -------------------------------------------------------------------------------------------

let concrete = false;
let prevIndexConcrete;

export function analyzeConcreteness(input, index) {
  if (index != prevIndexConcrete) {
    concrete = false;
    prevIndexConcrete = index;
  }
  if (!concrete) {
    const concretenessText =
      concretenessArray[Math.floor(Math.random() * concretenessArray.length)];
    const inputArray = input.value.split(" ");
    let containsNumber = false;
    let concretePosition = [];

    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].match(/\d+/g)) {
        containsNumber = true;
        concretePosition.push(true);
      } else {
        concretePosition.push(false);
      }
    }

    if (containsNumber) {
      addPoints(5, concretenessText, concretePosition, index);
      concrete = true;
    }
  }
}

// ICH-Botschaft -------------------------------------------------------------------------------------------

let contaiunsIch = false;
let prevIndexIch;
export function analyzeIchBotschaft(input, index) {
  if (index != prevIndexIch) {
    contaiunsIch = false;
    prevIndexIch = index;
  }

  if (contaiunsIch != true) {
    const ichBotschaftText = containsIchArray[Math.floor(Math.random() * containsIchArray.length)];
    const inputArray = input.value.split(" ");
    let ich = 0;
    let ichPosition = [];

    for (let i = 0; i < inputArray.length; i++) {
      const currentWord = inputArray[i].toLowerCase();
      if (
        currentWord == "ich" ||
        currentWord == "mir" ||
        currentWord == "mich" ||
        currentWord == "mein" ||
        currentWord == "meine" ||
        currentWord == "meinen" ||
        currentWord == "meiner" ||
        currentWord == "meines" ||
        currentWord == "meinem"
      ) {
        ich++;
        ichPosition.push(true);
      } else {
        ichPosition.push(false);
      }
    }
    const ichProportion = ich / inputArray.length;
    if (ichProportion >= 0.1 && inputArray.length > 25) {
      addPoints(20, ichBotschaftText, ichPosition, index);
      contaiunsIch = true;
    }
  }
}

// Strukturbewertung -------------------------------------------------------------------------------------------

let structuredTextQuery = false;
let prevIndexStructured;
export function analyzeTextStructure(input, index) {
  if (index != prevIndexStructured) {
    structuredTextQuery = false;
    prevIndexStructured = index;
  }
  if (structuredTextQuery != true) {
    const structuredText =
      structuredTextArray[Math.floor(Math.random() * structuredTextArray.length)];
    const enteredText = input.value;
    const inputArray = enteredText.split(" ");
    let textStructurePosition = [];
    const numberOfLineBreaks = (enteredText.match(/\n/g) || []).length;
    const numberOfNumberedBulletpoints = (enteredText.match(/\d\./g) || []).length;
    const numberOfBulletpoints = (enteredText.match(/\*/g) || []).length;
    const numberOfBulletpoints2 = (enteredText.match(/\-\s/g) || []).length;

    if (
      numberOfLineBreaks > 2 ||
      numberOfBulletpoints2 > 2 ||
      numberOfNumberedBulletpoints > 2 ||
      numberOfBulletpoints > 2
    ) {
      addPoints(10, structuredText);
      structuredTextQuery = true;
      for (let i = 0; i < inputArray.length; i++) {
        if (
          inputArray[i].match(/\d\./g) ||
          inputArray[i].match(/\*/g) ||
          inputArray[i].match(/\-\s/g)
        ) {
          textStructurePosition.push(true);
        } else {
          textStructurePosition.push(false);
        }
      }
      markTextPositions(textStructurePosition, index);
    }
  }
}

export function analyzeRadio(radioInput) {
  prevBoost = boost;
  if (radioInput != undefined) {
    goodStart = true;
    const checkBoxText = checkBoxArray[Math.floor(Math.random() * checkBoxArray.length)];
    gamestate.points = gamestate.points + 5 * boost;
    feedbackBarCall(checkBoxText, 5 * boost, "feedback-good");
  } else {
    gamestate.points = gamestate.points - 5 * boost;
    feedbackBarCall("Schade, keine Angabe!", -5 * boost, "feedback-bad");
    goodStart = false;
  }
}

export function addPoints(pointsAdded, successMessage, markPositions, index) {
  gamestate.points = gamestate.points + pointsAdded * boost;
  feedbackBarCall(successMessage, pointsAdded * boost, "feedback-good");
  markPositions != undefined ? markTextPositions(markPositions, index) : null;
}

export function markTextRange(indexFrom, indexTo, inputNumber) {
  const duplicateInput = document.querySelectorAll(".duplicate-text")[inputNumber];
  const inputText = duplicateInput.innerText;
  const inputTextArray = inputText.split(" ");
  let output = "";

  for (let i = 0; i < inputTextArray.length; i++) {
    if (i >= indexFrom && i < indexTo) {
      output += `<div class="marked">${inputTextArray[i]}</div> `;
    } else {
      output += `${inputTextArray[i]} `;
    }
  }

  duplicateInput.innerHTML = output;
}

export function markTextPositions(positions, inputNumber) {
  const duplicateInput = document.querySelectorAll(".duplicate-text")[inputNumber];
  const inputText = duplicateInput.innerText;
  const inputTextArray = inputText.split(" ");
  let output = "";

  for (let i = 0; i < inputTextArray.length; i++) {
    if (positions[i]) {
      output += `<div class="marked">${inputTextArray[i]}</div> `;
    } else {
      output += `${inputTextArray[i]} `;
    }
  }

  duplicateInput.innerHTML = output;
}

export function submitFeedback() {
  // Reset Boost, when no feedback is given
  wordCount == 0 ? (gamestate.goodStartBoost = 0) : null;

  if (gamestate.goodStartBoost >= 2) {
    boost = 2;
    gamestate.trackingData.boostKind.goodStartAmount++;
  } else {
    boost = 1;
  }

  updateData();

  if (boost > prevBoost) {
    boostBar.classList.remove("boost-hidden");
    feedbackBarCall("Neuer Boost!", 0, "feedback-boost");
    gamestate.trackingData.boosts++;
  } else if (boost < prevBoost) {
    boostBar.classList.add("boost-hidden");
    feedbackBarCall("Boost verloren!", 0, "feedback-bad");
  }

  // reset boost values
  prevBoost = boost;
  goodStart = false;
  extensiveFeedback = false;
}
