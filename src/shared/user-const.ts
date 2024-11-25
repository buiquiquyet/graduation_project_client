import { ItemLibSwitchInput } from "./enums/inputType.enum";

// update lại options của dropdown
export const updateOptionsFormInputs = (
  formInputs: ItemLibSwitchInput[],
  controlName: string,
  options: any[]
) => {
  return formInputs.map((item: ItemLibSwitchInput) => {
    if (item.value === controlName) {
      return {
        ...item,
        options: options, // Cập nhật options mới
      };
    }
    return item;
  });
};
// chuyển thành options label - value
export const convertToCommonOptions = (options: any[]) => {
  return options?.map((item: any) => {
    return {
      label: item?.name,
      value: item?.id,
    };
  });
};
