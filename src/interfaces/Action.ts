export interface Action {
    type: string;
    value: string | number[];
    index?: number;
    attributeIndex?: number;
  }