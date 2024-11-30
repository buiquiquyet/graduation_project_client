import { ETableColumnType } from "../libraries/lib-table-component/constants/LibTable.enum";

export enum InputTypeEnum {
  INPUT = "input",
  TEXT_AREA = "input_area",
  DATE = "input_date",
  INPUT_DROPDOWN = "input_dropDown",
}

// base input
export interface ItemLibSwitchInput {
  label: string;
  type: InputTypeEnum; // loại input
  typeInput?: string;
  value: string;
  options?: any[];
  maxLength?: number,
  min?: number,
  max?: number
}
// base table
export interface ColumnFields {
    accessor: string, // controlName
    type: ETableColumnType,
    label: string,
}