import { ChoiceValuesElement } from "../interfaces/ChoiceValuesElement";

export default function getRatings(choices: ChoiceValuesElement[]) {
    const output = [];
    for (const choice of choices) {
      output.push(choice["ratings"]);
    }
    return output;
  }