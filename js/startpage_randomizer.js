const skyElement = document.querySelector(".sky video");
const planetElement = document.querySelector(".planet img");
const treeBackElements = document.querySelectorAll(".tree-back div video");
const treeFrontElements = document.querySelectorAll(".tree-front div video");
const buildingELements = document.querySelectorAll(".building img");

const planetsArray = [
  "mabl",
  "mabr",
  "magr",
  "mapu",
  "maye",
  "mare",
  "mobl",
  "mobr",
  "mogr",
  "mopu",
  "moye",
  "more",
  "nebl",
  "nebr",
  "negr",
  "nepu",
  "neye",
  "nere",
  "sabl",
  "sabr",
  "sagr",
  "sapu",
  "saye",
  "sare",
  "vebl",
  "vebr",
  "vegr",
  "vepu",
  "veye",
  "vere",
];
const treesArray = [
  "pi1",
  "pi2",
  "pi3",
  "ei1",
  "ei2",
  "ei3",
  "ma1",
  "ma2",
  "ma3",
  "ma4",
  "ma5",
  "ma6",
  "pa1",
  "pa2",
  "pa3",
];
const buildingsArray = [
  "aba5",
  "bbt5",
  "bbt4",
  "bft5",
  "bre5",
  "brr5",
  "csr5",
  "dhl5",
  "dhr4",
  "ekf5",
  "etp5",
  "ghb5",
  "hhh5",
  "hhm5",
  "iba4",
  "iba5",
  "kkf5",
  "mtf5",
  "rhg5",
  "rhh4",
  "rhl5",
  "rhm4",
  "scf5",
  "sch5",
  "scl5",
  "scm4",
  "scr3",
  "ssh5",
  "ssr4",
];
const skyArray = ["dar1", "dar2", "dar2", "day1", "day2", "day3", "day4"];

planetElement.src = `./assets/planet_assets/planets/${
  planetsArray[Math.floor(Math.random() * planetsArray.length)]
}.png`;

skyElement.src = `./assets/planet_assets/sky/${
  skyArray[Math.floor(Math.random() * skyArray.length)]
}.webm`;

treeBackElements.forEach((element) => {
  element.src = `./assets/planet_assets/trees/${
    treesArray[Math.floor(Math.random() * treesArray.length)]
  }.webm`;
});

treeFrontElements.forEach((element) => {
  element.src = `./assets/planet_assets/trees/${
    treesArray[Math.floor(Math.random() * treesArray.length)]
  }.webm`;
});

buildingELements.forEach((element) => {
  element.src = `./assets/planet_assets/buildings/${
    buildingsArray[Math.floor(Math.random() * buildingsArray.length)]
  }.png`;
});
