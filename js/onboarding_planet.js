const prevQ = document.querySelector("#prevq");
const nextQ = document.querySelector("#nextq");
const sliderOnboard = document.querySelector(".onboarding_collection");
const statusAmount = document.querySelector(".status-amount");
const readyBtn = document.querySelector("#widebtn");
const onboardingLength = document.querySelectorAll(".onboarding_content").length;

let slide = 0;
let progress = 100 / onboardingLength;

statusAmount.style = `width: ${progress}%`;

nextQ.addEventListener("click", function () {
  if (slide < onboardingLength - 1) {
    progress = progress + 100 / onboardingLength;
    slide++;
    sliderOnboard.classList.add(`pos${slide}`);
    sliderOnboard.classList.remove(`pos${slide - 1}`);
    statusAmount.style = `width: ${progress}%`;

    if (slide === 1) {
      prevQ.classList.remove("transparent");
    }
    if (slide === 4) {
      nextQ.classList.add("transparent");
    }
  }
});

prevQ.addEventListener("click", function () {
  if (slide > 0) {
    progress = progress - 100 / onboardingLength;
    slide--;
    sliderOnboard.classList.add(`pos${slide}`);
    sliderOnboard.classList.remove(`pos${slide + 1}`);
    statusAmount.style = `width: ${progress}%`;

    if (slide === 0) {
      prevQ.classList.add("transparent");
    }
    if (slide === 3) {
      nextQ.classList.remove("transparent");
    }
  }
});

readyBtn.addEventListener("click", function () {
  localStorage.setItem("planetOnboarding", true);
  switch (localStorage.getItem("pollLocation")) {
    case "0":
      window.location.href = "umfrage1.html";
      break;
    case "1":
      window.location.href = "umfrage2.html";
      break;
    case "2":
      window.location.href = "umfrage3.html";
      break;
    case "3":
      window.location.href = "umfrage4.html";
      break;
  }
});
