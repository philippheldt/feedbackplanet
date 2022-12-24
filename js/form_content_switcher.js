const feedbackFormContainer = document.querySelector(".feedback-form-container");
const nextQ = document.querySelector("#nextq");
const prevQ = document.querySelector("#prevq");
const submitButton = document.querySelector("#submit");
const statusAmount = document.querySelector(".status-amount");

let containerPosition = 1;
const containerPositionMax = 11;

statusAmount.style.width = (100 / containerPositionMax) * containerPosition + "%";

nextQ.addEventListener("click", () => {
  if (containerPosition < containerPositionMax) {
    feedbackFormContainer.style.transform =
      "translateX(calc( -" + containerPosition + "00% - " + 50 * containerPosition + "px))";
    containerPosition++;
    statusAmount.style.width = (100 / containerPositionMax) * containerPosition + "%";
  }
  if (containerPosition > 1) {
    prevQ.classList.remove("no-click");
  }
  if (containerPosition == containerPositionMax) {
    submitButton.classList.remove("hidden");
    nextQ.classList.add("hidden");
  }
});

prevQ.addEventListener("click", () => {
  if (containerPosition > 1) {
    containerPosition--;
    feedbackFormContainer.style.transform =
      "translateX(calc( -" +
      (containerPosition - 1) +
      "00% - " +
      50 * (containerPosition - 1) +
      "px))";
    statusAmount.style.width = (100 / containerPositionMax) * containerPosition + "%";
  }

  if (containerPosition == 1) {

    prevQ.classList.add("no-click");
  }

  if (containerPosition == containerPositionMax - 1) {
    submitButton.classList.add("hidden");
    nextQ.classList.remove("hidden");
  }
});
