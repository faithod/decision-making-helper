import { AttributeElement } from "../interfaces/AttributeElement";
import { ChoiceValuesElement } from "../interfaces/ChoiceValuesElement";
import calculateTotal from "../utils/calculateTotal";
import getRatings from "../utils/getRatings";
import getWeights from "../utils/getWeights";

export default function calculateScores(attributes: AttributeElement[], choices: ChoiceValuesElement[]) {
    const output = [];
    const weights = getWeights(attributes);
    const arrOfRatings = getRatings(choices);
    for (const rating of arrOfRatings) {
      if (weights) {
        const total = calculateTotal(weights, rating);
        output.push(total);
      }
    }
    return output;
  }