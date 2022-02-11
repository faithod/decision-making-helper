import { AttributeElement } from "../interfaces/AttributeElement";

export default function getWeights(attr: AttributeElement[]) {
    const output = [];
    for (const attribute of attr) {
      output.push(attribute["weight"]);
    }
    return output;
  }