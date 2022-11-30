// Get the input box
let input = document.getElementById("feedback-input");
let planet = document.querySelector(".pl-container");

// Init a timeout variable to be used below
let timeout = null;
let animationStarted = false;

// Listen for keystroke events
input.addEventListener("keyup", function (e) {
  // Clear the timeout if it has already been set.
  // This will prevent the previous task from executing
  // if it has been less than <MILLISECONDS>
  !animationStarted ? planet.classList.add("typing") : null;
  animationStarted = true;
  clearTimeout(timeout);

  // Make a new timeout set to go off in 1000ms (1 second)
  timeout = setTimeout(function () {
    planet.classList.remove("typing");
    animationStarted = false;
  }, 250);
});

