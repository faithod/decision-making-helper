import { attributeElement } from "../components/DecisionMaker";

export default function getWeights(attr: attributeElement[]) {
    const output = [];
    for (const attribute of attr) {
      output.push(attribute["weight"]);
    }
    return output;
  }