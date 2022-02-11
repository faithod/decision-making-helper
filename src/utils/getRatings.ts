import { choiceValuesElement } from "../components/DecisionMaker";

export default function getRatings(choices: choiceValuesElement[]) {
    const output = [];
    for (const choice of choices) {
      output.push(choice["ratings"]);
    }
    return output;
  }