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
    providers: "google",
    text: "",
    language: "de",
  },
};

export function getSentiment(input) {
  options.data.text = input.toString();
  axios
    .request(options)
    .then((response) => {
      console.log("Bewertung von Google: " + response.data.google.general_sentiment);
      console.log("Sentiment rate: " + response.data.google.general_sentiment_rate);
      const sentimentRate = response.data.google.general_sentiment_rate;

      if (sentimentRate < 0.4 && sentimentRate > -0.2) {
        gamestate.points = gamestate.points + 30;
        feedbackBarCall("Wertungsfreie Sprache!", 30, "feedback-good");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
