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
  // check xem có phải error input ko
  const checkError = (): boolean => {
    const error = formik?.errors?.[item.value];
    const touched = formik?.touched?.[item.value];

    // Đảm bảo rằng touched là boolean hoặc được xác định
    return typeof error === "string" && !!touched;
  };
  // xử lý message error
  const renderError = () => {
    if (checkError()) {
      return <BaseMessageLog text={formik?.errors?.[`${item.value}`] ?? ""} />;
    }
    return null;
  };
  // hàm blur
  const handleBlur = (fieldName: string) => {
    formik.setFieldTouched(fieldName, true);
  };
  // hàm focus
  const handleFocus = (fieldName: string) => {
    formik.setFieldTouched(fieldName, false);
  };

  if (item.type === InputTypeEnum.INPUT) {
    return (
      <div className="w-100 input-switch">
        <Input
          className={`w-100 ${checkError() ? "border-error" : ""}`}
          type={item.typeInput}
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
          onFocus={() => handleFocus(item.value)} // Gọi hàm handleFocus nếu có
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
          onFocus={() => handleFocus(item.value)} // Gọi hàm handleFocus nếu có
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
