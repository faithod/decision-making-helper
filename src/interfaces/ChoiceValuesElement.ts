export interface ChoiceValuesElement {
  choiceName: string | number[] | undefined; //remove number[]
  ratings: (number | undefined)[];
  score: undefined | number;
}
