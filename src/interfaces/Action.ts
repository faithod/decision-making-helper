export interface Action {
  type: string;
  value?: string | number[] | unknown;
  index?: number;
  attributeIndex?: number;
}
