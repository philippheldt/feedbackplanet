// https://docs.google.com/forms/d/e/1FAIpQLSfPu3SLdPx0RcX_L30IJn4DmZeS32LWOZH_5r3GZFeP4qHqTw/formResponse
// entry.479648863=email-999
// entry.650300513=Ja
// entry.51650865=A

// entry.245781336=1
// entry.289552610=2
// entry.819056584=3
// entry.1038952400=4
// entry.1252338745=freitext1-999
// entry.1669997417=freitext2-999
// entry.498440518=freitext3-999
// entry.1309987470=5

// entry.1048153492=buildings-999
// entry.1811621375=planet-999
// entry.1120390467=points-999
// entry.788632169=planet-clicks-999
// entry.583259031=bannerinteractions-123
// entry.1576277417=edit-tree-clicks-999
// entry.978435924=turn-clicks-999
// entry.864032000=time-spent-999
// entry.263251967=boosts-999
// entry.868385044=boost-kind-999
// entry.215728538=points-per-slide-999
//entry.99034290=wordswritten

// entry.429392267=video+1
// &entry.1252854881=Ja
// entry.1352185246=hjashjashjas

import { gamestate } from "./gamedata/gamestate.js";

export const researchData = {
  contactData: {
    email: ["entry.479648863", "test@email.de"],
    contactQuery: ["entry.650300513", "Nein"],
    winQuery: ["entry.1252854881", "Nein"],
    testGroup: ["entry.51650865", "A"],
    video: ["entry.429392267", "Testnachricht"],
  },
  formFields: {
    skala1: ["entry.245781336", ""],
    skala2: ["entry.289552610", ""],
    skala3: ["entry.819056584", ""],
    skala4: ["entry.1038952400", ""],
    freitext1: ["entry.1252338745", "freitext1"],
    freitext2: ["entry.1669997417", "freitext2"],
    freitext3: ["entry.498440518", "freitext3"],
    freitext4: ["entry.1352185246", "freitext4"],
    skala5: ["entry.1309987470", ""],
  },
  gameData: {
    buildings: ["entry.1048153492", ""],
    planet: ["entry.1811621375", "planet-999"],
    points: ["entry.1120390467", "points-999"],
    planetClicks: ["entry.788632169", 0],
    bannerInteractions: ["entry.583259031", 0],
    editTreeClicks: ["entry.1576277417", 0],
    turnClicks: ["entry.978435924", 0],
    timeSpent: ["entry.864032000", "time-spent-999"],
    boosts: ["entry.263251967", 0],
    boostKind: ["entry.868385044", ""],
    suggestionClicks: ["entry.215728538", 0],
    wordsWritten: ["entry.99034290", 0],
  },
};

// Submit URL
let submitURL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfPu3SLdPx0RcX_L30IJn4DmZeS32LWOZH_5r3GZFeP4qHqTw/formResponse?";
let boostKindLister = "";

const videoMeta = document.querySelector("#video-meta");

//buttons and ELements
const submitButton = document.querySelector("#submit");
//Contact Data
const contactQuery = document.querySelector(
  'input[name="' + researchData.contactData.contactQuery[0] + '"]'
);
const winQuery = document.querySelector(
  'input[name="' + researchData.contactData.winQuery[0] + '"]'
);

//radio buttons
const skala1 = document.querySelectorAll('input[name="' + researchData.formFields.skala1[0] + '"]');
const skala2 = document.querySelectorAll('input[name="' + researchData.formFields.skala2[0] + '"]');
const skala3 = document.querySelectorAll('input[name="' + researchData.formFields.skala3[0] + '"]');
const skala4 = document.querySelectorAll('input[name="' + researchData.formFields.skala4[0] + '"]');
const skala5 = document.querySelectorAll('input[name="' + researchData.formFields.skala5[0] + '"]');

export const skalen = [skala1, skala2, skala3, skala4, skala5];

//textareas
// const freitext1 = document.querySelector("#freitext-1");
const freitext1 = document.querySelector("#freitext-1");
const freitext2 = document.querySelector("#freitext-2");
const freitext3 = document.querySelector("#freitext-3");
const freitext4 = document.querySelector("#freitext-4");

export const freitexte = [freitext1, freitext2, freitext3, freitext4];

//submitButton.addEventListener("click", submitData);

export function submitData() {
  //Update contact data values
  //Contact Data
  researchData.contactData.email[1] = gamestate.trackingData.email;
  contactQuery.checked
    ? (researchData.contactData.contactQuery[1] = contactQuery.value)
    : (researchData.contactData.contactQuery[1] = "Nein");
  winQuery.checked
    ? (researchData.contactData.winQuery[1] = winQuery.value)
    : (researchData.contactData.winQuery[1] = "Nein");
  researchData.contactData.testGroup[1] = gamestate.trackingData.testGroup;
  researchData.contactData.video[1] = videoMeta.innerText;

  // formFields
  getRadioValue(skala1) != undefined
    ? (researchData.formFields.skala1[1] = getRadioValue(skala1))
    : null;
  getRadioValue(skala2) != undefined
    ? (researchData.formFields.skala2[1] = getRadioValue(skala2))
    : null;
  getRadioValue(skala3) != undefined
    ? (researchData.formFields.skala3[1] = getRadioValue(skala3))
    : null;
  getRadioValue(skala4) != undefined
    ? (researchData.formFields.skala4[1] = getRadioValue(skala4))
    : null;
  getRadioValue(skala5) != undefined
    ? (researchData.formFields.skala5[1] = getRadioValue(skala5))
    : null;

  researchData.formFields.freitext1[1] = freitext1.value;
  researchData.formFields.freitext2[1] = freitext2.value;
  researchData.formFields.freitext3[1] = freitext3.value;
  researchData.formFields.freitext4[1] = freitext4.value;

  //gameData
  for (let i = 0; i < gamestate.buildings.length; i++) {
    researchData.gameData.buildings[1] += gamestate.buildings[i] + "----";
  }
  researchData.gameData.planet[1] = gamestate.planet;
  researchData.gameData.points[1] = gamestate.points;
  researchData.gameData.planetClicks[1] = gamestate.trackingData.planetClicks;
  researchData.gameData.bannerInteractions[1] = gamestate.trackingData.bannerInteractions;
  researchData.gameData.editTreeClicks[1] = gamestate.trackingData.editTreeClicks;
  researchData.gameData.turnClicks[1] = gamestate.trackingData.turnClicks;
  researchData.gameData.boosts[1] = gamestate.trackingData.boosts;
  researchData.gameData.suggestionClicks[1] = gamestate.trackingData.suggestionClicks;

  for (const boostKind in gamestate.trackingData.boostKind) {
    researchData.gameData.boostKind[1] +=
      boostKind + "-" + gamestate.trackingData.boostKind[boostKind] + "----";
  }

  //researchData.gameData.wordsWritten[1] = gamestate.wordsWritten;

  for (const property in researchData) {
    if (researchData.hasOwnProperty(property)) {
      for (const property2 in researchData[property]) {
        if (researchData[property].hasOwnProperty(property2)) {
          submitURL +=
            "&" + researchData[property][property2][0] + "=" + researchData[property][property2][1];
        }
      }
    }
  }

  window.open(submitURL, "_blank").focus();
  //
}

export function getRadioValue(radioButtons) {
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i].value;
    }
  }
}
