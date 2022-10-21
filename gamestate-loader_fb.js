window.addEventListener("load", () => {
  //Insert Data
  var planetContainer = document.querySelector(".pl-container");
  planetContainer.innerHTML =
    '<div class="sky"></div> <div class="tree-back"></div><div class="building"></div><div class="tree-front"></div><div class="planet"><img class="pl-asset" src="assets/img/planets/non.png" alt=""></div><div class="bush"></div>';
  var obj;
  var planet = document.querySelector(".planet");
  var building = document.querySelector(".building");
  var treeBack = document.querySelector(".tree-back");
  var treeFront = document.querySelector(".tree-front");
  var bushFront = document.querySelector(".bush");

  fetch("json/gamestate.json")
    .then((res) => res.json())
    .then((data) => (obj = data))
    .then(() => {
      obj.points;
      console.log(obj.planet);

      //setup
      //create planet
      planet.innerHTML = `<img class="pl-asset" src="assets/img/planets/${obj.planet}.png" alt="">`;

      //create all objects

      for (let i = 0; i < obj.buildings.length; i++) {
        let buildingSetup = obj.buildings[i].split(".");
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
    });
});
