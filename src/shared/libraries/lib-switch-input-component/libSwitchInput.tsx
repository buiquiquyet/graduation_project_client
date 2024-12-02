import {
  InputTypeEnum,
  ItemLibSwitchInput,
} from "@/shared/enums/inputType.enum";
import { Input, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import { FormikProps } from "formik";
import BaseMessageLog from "../message-log-text-component/MessageLogText";
import "./libSwitchInput.scss";
const { Option } = Select;

interface CustomInputProps {
  item: ItemLibSwitchInput;
  formik: FormikProps<any>;
  onChange?: (field: any, value: any) => void;
}

const LibSwitchInput: React.FC<CustomInputProps> = ({
  item,
  formik,
  onChange: onChange,
}) => {
  // Check if there is an error for the input field
  const checkError = (): boolean => {
    const error = formik?.errors?.[item.value];
    const touched = formik?.touched?.[item.value];

    // Ensure that touched is either boolean or defined
    return typeof error === "string" && !!touched;
  };

  // Render error message
  const renderError = () => {
    if (checkError()) {
      return <BaseMessageLog text={formik?.errors?.[`${item.value}`] ?? ""} />;
    }
    return null;
  };

  // Handle onBlur event
  const handleBlur = (fieldName: string) => {
    formik.setFieldTouched(fieldName, true);
  };

  // Handle onFocus event
  const handleFocus = (fieldName: string) => {
    formik.setFieldTouched(fieldName, false);
  };

  // Format number by adding thousand separators
  const formatNumber = (num: string) => {
    if (!num) return "";
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Handle number change only if the input type is 'number'
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy giá trị nhập vào và loại bỏ dấu chấm
    let rawValue = e.target.value.replace(/\./g, "");

    // Kiểm tra xem giá trị có phải là một số hợp lệ hay không
    if (!isNaN(Number(rawValue)) || rawValue === "") {
      // Nếu là số hợp lệ hoặc là chuỗi trống, cập nhật giá trị vào formik
      formik.setFieldValue(item.value, rawValue);
    }
  };

  // If input type is 'number', apply number formatting
  if (item.type === InputTypeEnum.INPUT) {
    return (
      <div className="w-100 input-switch">
        <Input
          className={`w-100 ${checkError() ? "border-error" : ""}`}
          type="text" // Ensure input type is 'text' to handle formatting
          name={item.value}
          value={
            item.typeInput === "number"
              ? formatNumber(formik.values[item.value] ?? "")
              : formik.values[item.value] ?? ""
          }
          onChange={
            item.typeInput === "number"
              ? handleNumberChange
              : formik.handleChange
          } // Apply number change handler only for type 'number'
          onBlur={() => handleBlur(item.value)}
          onFocus={() => handleFocus(item.value)}
          {...(item.maxLength && { maxLength: item.maxLength })}
          {...(item.min ? { min: item.min } : {})}
          {...(item.max ? { max: item.max } : {})}
        />
        {renderError()}
      </div>
    );
  } else if (item.type === InputTypeEnum.DATE) {
    return (
      <div className="w-100 input-switch">
        <DatePicker
          className={`w-100 ${checkError() ? "border-error" : ""}`}
          value={
            formik.values?.[item?.value]
              ? dayjs(formik.values[item?.value])
              : null
          }
          onChange={(date) =>
            formik.setFieldValue(
              item?.value,
              date ? date.format("YYYY-MM-DD") : ""
            )
          }
          onBlur={() => handleBlur(item.value)}
          onFocus={() => handleFocus(item.value)} // Call handleFocus if defined
          format="DD-MM-YYYY"
        />
        {renderError()}
      </div>
    );
  } else if (item.type === InputTypeEnum.INPUT_DROPDOWN) {
    return (
      <div className="w-100 input-switch">
        <Select
          className={`w-100 ${checkError() ? "border-error" : ""}`}
          showSearch
          value={
            item?.options?.find(
              (option: any) => option.value === formik.values[item?.value]
            )?.label || ""
          }
          onChange={(value) => {
            formik.setFieldValue(item.value, value);
            onChange?.(item.value, value);
          }}
          onBlur={() => handleBlur(item.value)}
          onFocus={() => handleFocus(item.value)} // Call handleFocus if defined
          filterOption={(input, option: any) =>
            option?.children?.toLowerCase().includes(input.toLowerCase())
          }
        >
          {item?.options?.map((option: any, index: number) => (
            <Option key={index} value={option?.value}>
              {option?.label}
            </Option>
          ))}
        </Select>
        {renderError()}
      </div>
    );
  } else if (item.type === InputTypeEnum.TEXT_AREA) {
    return (
      <div className="w-100 input-switch">
        <Input.TextArea
          className={`w-100 custom-textarea ${
            checkError() ? "border-error" : ""
          }`}
          name={item.value}
          value={formik.values[item.value] ?? ""}
          onChange={formik.handleChange}
          onBlur={() => handleBlur(item.value)}
          onFocus={() => handleFocus(item.value)}
          {...(item.maxLength && { maxLength: item.maxLength })}
          {...(item.min ? { min: item.min } : {})}
          {...(item.max ? { max: item.max } : {})}
        />
        {renderError()}
      </div>
    );
  }

  return null;
};

export default LibSwitchInput;
