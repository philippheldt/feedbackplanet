import { gamestate } from "./gamestate.js";
import {
  buildingSelectorBar,
  calculateBuildingNumber,
  getData,
  planetSelectorBar,
  updateBuildings,
  updateData,
} from "./planetbuilder_fb.js";

getData();

setTimeout(() => {
  if (gamestate.planet === "nono") {
    planetSelectorBar();
    console.log("no planet selected");
  }
}, 5000);
