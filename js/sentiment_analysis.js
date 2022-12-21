import { apikey } from "./api-key.js";
import { gamestate } from "./gamestate.js";
import { feedbackBarCall } from "./planetbuilder_fb.js";

let options = {
  method: "POST",
  url: "https://api.edenai.run/v2/text/sentiment_analysis",
  headers: {
    authorization: "Bearer " + apikey,
  },
  data: {
    providers: "amazon",
    text: "",
    language: "de",
  },
};

const setimentArray = [
  "Wertungsfreie Sprache!",
  "Wertungsfreie Sprache hilft.",
  "Neutrales Feedback!",
  "Keine Wertung!",
];

export function getSentiment(input) {
  const sentimentText = setimentArray[Math.floor(Math.random() * setimentArray.length)];
  options.data.text = input.toString();
  axios
    .request(options)
    .then((response) => {
      console.log("Bewertung von Google: " + response.data.amazon.general_sentiment);
      console.log("Sentiment rate: " + response.data.amazon.general_sentiment_rate);
      const sentimentRate = response.data.amazon.general_sentiment;

      if (sentimentRate == "Neutral" || sentimentRate == "Mixed") {
        gamestate.points = gamestate.points + 30;
        feedbackBarCall(sentimentText, 30, "feedback-good");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
