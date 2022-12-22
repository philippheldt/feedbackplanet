import { gamestate } from "./gamedata/gamestate.js";
import { updateData } from "./planetbuilder_fb.js";
import { feedbackBarCall } from "./planetbuilder_fb.js";

const boostBar = document.querySelector(".boost-container");

// Feedbacktexte
const goodStartTextArray = [
  "Guter Start!",
  "Vielversprechender Beginn.",
  "Schöner Start!",
  "Das fängt schön an!",
  "Toller Anfang!",
  "Schon 20 Wörter!",
  "Solide Basis.",
  "Gute Wortanzahl!",
];

const extensiveFeedbackTextArray = [
  "Richtig ausführlich!",
  "Sehr detailliert!",
  "Überaus umfangreich!",
  "Gründliche Darstellung!",
  "Detailliertes Feedback.",
  "Ausführliche Beschreibung!",
  "Umfassendes Feedback!",
];

const concretenessArray = ["Konkretes Feedback!", "Spezifisches Feedback!"];

const structuredTextArray = [
  "Gute Struktur!",
  "Logische Gliederung!",
  "Klare Organisation!",
  "Verständliche Struktur!",
  "Logische Aufbauweise!",
];

const containsIchArray = ["Gute Ich-Botschaften!", "Hilfreiche Ich-Botschaften!"];

const checkBoxArray = [
  "Danke fürs Feedback!",
  "Vielen Dank!",
  "Danke schön!",
  "Danke für deine Zeit!",
  "Danke für deine Hilfe!",
  "Danke für die Unterstützung!",
  "Danke für deine Beteiligung!",
  "Danke für deine Teilnahme!",
  "Danke für deine Mitwirkung!",
  "Danke für deine Mithilfe!",
];

// Auführlichkeitsbewertung
let goodStart = false;
let extensiveFeedback = false;
export let boost = 1;
let prevBoost = 1;
let newBoost = false;
let wordCount = 0;

export function analyzeTextLength(input, index) {
  prevBoost = boost;
  const goodStartText = goodStartTextArray[Math.floor(Math.random() * goodStartTextArray.length)];
  const extensiveFeedbackText =
    extensiveFeedbackTextArray[Math.floor(Math.random() * extensiveFeedbackTextArray.length)];
  wordCount = input.value.split(" ").length;
  console.log("Number of words: " + wordCount);
  console.log("Before analyzeTextLength: " + newBoost);

  if (gamestate.goodStartBoost >= 2) {
    boost = 2;
  } else {
    boost = 1;
  }

  if (wordCount > 20 && !goodStart) {
    goodStart = true;
    gamestate.points = gamestate.points + 10 * boost;
    gamestate.goodStartBoost = gamestate.goodStartBoost + 1;
    markTextRange(0, 20, index);
    feedbackBarCall(goodStartText, 10 * boost, "feedback-good");
  }

  if (wordCount > 100 && !extensiveFeedback) {
    extensiveFeedback = true;
    gamestate.points = gamestate.points + 30 * boost;
    gamestate.extensiveBoost = gamestate.extensiveBoost + 1;
    markTextRange(0, 100, index);
    feedbackBarCall(extensiveFeedbackText, 30 * boost, "feedback-good");
  }
}

let concrete = false;
let prevIndexConcrete;
export function analyzeConcreteness(input, index) {
  if (index != prevIndexConcrete) {
    concrete = false;
    prevIndexConcrete = index;
  }
  if (concrete != true) {
    const concretenessText =
      concretenessArray[Math.floor(Math.random() * concretenessArray.length)];
    const inputArray = input.value.split(" ");
    let containsNumber = false;
    let concretePosition = [];
    //check is string in array contains number
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].match(/\d+/g)) {
        containsNumber = true;
        concretePosition.push(true);
      } else {
        concretePosition.push(false);
      }
    }

    if (containsNumber) {
      gamestate.points = gamestate.points + 5 * boost;
      feedbackBarCall(concretenessText, 5 * boost, "feedback-good");
      markTextPositions(concretePosition, index);
      concrete = true;
    }
  }
}

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
      if (
        inputArray[i].toLowerCase() == "ich" ||
        inputArray[i].toLowerCase() == "mir" ||
        inputArray[i].toLowerCase() == "mich" ||
        inputArray[i].toLowerCase() == "mein" ||
        inputArray[i].toLowerCase() == "meine" ||
        inputArray[i].toLowerCase() == "meinen" ||
        inputArray[i].toLowerCase() == "meiner" ||
        inputArray[i].toLowerCase() == "meines" ||
        inputArray[i].toLowerCase() == "meinem"
      ) {
        ich++;
        ichPosition.push(true);
      } else {
        ichPosition.push(false);
      }

      const ichProportion = ich / inputArray.length;
      if (ichProportion >= 0.1 && inputArray.length > 25) {
        gamestate.points = gamestate.points + 20 * boost;
        feedbackBarCall("Ich-Botschaft!", 20 * boost, "feedback-good");

        markTextPositions(ichPosition, index);

        contaiunsIch = true;
      }
    }
  }
}

let structuredText = false;
let prevIndexStructured;
export function analyzeTextStructure(input, index) {
  if (index != prevIndexStructured) {
    structuredText = false;
    prevIndexStructured = index;
  }
  if (structuredText != true) {
    const enteredText = input.value;
    const inputArray = enteredText.split(" ");
    let textStructurePosition = [];
    //count number of line breaks
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
      gamestate.points = gamestate.points + 10 * boost;
      feedbackBarCall("Textstruktur!", 10 * boost, "feedback-good");
      structuredText = true;

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

export function analyzeRadio(radioInput) {
  if (radioInput != undefined) {
    const checkBoxText = checkBoxArray[Math.floor(Math.random() * checkBoxArray.length)];
    gamestate.points = gamestate.points + 5 * boost;
    feedbackBarCall(checkBoxText, 5 * boost, "feedback-good");
    goodStart = true;
  } else {
    gamestate.points = gamestate.points - 5 * boost;
    feedbackBarCall("Schade, keine Angabe!", -5 * boost, "feedback-bad");
    goodStart = false;
  }
}

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
