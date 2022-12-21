var tag = document.createElement("script");
const videoMeta = document.querySelector("#video-meta").innerText;

function getVideoId() {
  switch (videoMeta) {
    case "Video 1":
      return "B38viYbl0j0";
    case "Video 2":
      return "-9qf8spzcsc";
    case "Video 3":
      return "Y6m5EODSQ_o";
    case "Video 4":
      return "2xphcuk7SLo";
  }
}

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: getVideoId(),
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: null,
      onStateChange: onPlayerStateChange,
    },
  });
}

var done = false;
var playing = false;

function onPlayerStateChange(event) {
  !playing ? videoStarted(countSeconds, 1000) : videoPaused();
  secondsOutput.innerHTML = seconds;
  playing = !playing;
}
function stopVideo() {
  player.stopVideo();
  videoPaused();
}

var interval = null;
var videoPlaying = false;

function videoStarted(func, time) {
  interval = setInterval(func, time);
}

function videoPaused() {
  clearInterval(interval);
}

let seconds = 0;
const secondsOutput = document.querySelector(".seconds-output");

function countSeconds() {
  seconds++;
}
