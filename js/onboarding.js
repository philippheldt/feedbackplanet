const prevQ = document.querySelector("#prevq");
const nextQ = document.querySelector("#nextq");
const sliderOnboard = document.querySelector(".onboarding_collection");
const statusAmount = document.querySelector(".status-amount");
const readyBtn = document.querySelector("#widebtn");
const onboardingLength = document.querySelectorAll(".onboarding_content").length;
console.log("🚀 ~ file: onboarding.js:7 ~ onboardingLength", onboardingLength);
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
  localStorage.setItem("planetOnboarding", false);
  localStorage.setItem("poll1", false);
  localStorage.setItem("poll2", false);
  localStorage.setItem("poll3", false);
  localStorage.setItem("poll4", false);
  window.location.href = "overview.html";
});
