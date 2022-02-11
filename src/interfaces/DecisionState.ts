import { AttributeElement } from "./AttributeElement";
import { ChoiceValuesElement } from "./ChoiceValuesElement";

export interface DecisionState {
    choices: ChoiceValuesElement[];
    attributes: AttributeElement[];
    winner: undefined | string;
  }