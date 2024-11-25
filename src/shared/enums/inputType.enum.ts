export enum InputTypeEnum {
    INPUT = "input",
    TEXT_AREA = "input_area",
    DATE = "input_date",
    INPUT_DROPDOWN = "input_dropDown"
}
export interface ItemLibSwitchInput {
    label: string;
    type: InputTypeEnum;
    typeInput?: string;
    value: string;
    options?: any[];
  }