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
  onChange: (field: any, value: any) => void;
}
const LibSwitchInput: React.FC<CustomInputProps> = ({
  item,
  formik,
  onChange: onChange,
}) => {
  // xử lý message error
  const renderError = () => {
    if (
      formik?.errors?.[`${item.value}`] &&
      typeof formik?.errors?.[`${item.value}`] === "string" &&
      formik?.touched?.[`${item.value}`]
    ) {
      return <BaseMessageLog text={formik?.errors?.[`${item.value}`] ?? ""} />;
    }
    return null;
  };
  // hàm blur
  const handleBlur = (fieldName: string) => {
    formik.setFieldTouched(fieldName, true);
  };
  // hàm focus
  const  handleFocus = (fieldName: string) => {
    formik.setFieldTouched(fieldName, false);
  };

  if (item.type === InputTypeEnum.INPUT) {
    return (
      <div className="w-100">
        <Input
          className="w-100"
          type={item.typeInput}
          name={item.value}
          value={formik.values[item.value] ?? ""}
          onChange={formik.handleChange}
          onBlur={() => handleBlur(item.value)}
          onFocus={() => handleFocus(item.value)}
        />
        {renderError()}
      </div>
    );
  } else if (item.type === InputTypeEnum.DATE) {
    return (
      <div className="w-100">
        <DatePicker
          className="w-100"
          
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
      <div className="w-100">
        <Select
          className="w-100"
          showSearch
          value={
            item?.options?.find(
              (option: any) => option.value === formik.values[item?.value]
            )?.label || ""
          }
          onChange={(value) => {
            formik.setFieldValue(item.value, value);
            onChange(item.value, value);
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
      <div className="w-100">
        <Input.TextArea
          className="w-100 custom-textarea"
          name={item.value}
          value={formik.values[item.value] ?? ""}
          onChange={formik.handleChange}
          onBlur={() => handleBlur(item.value)}
          onFocus={() => handleFocus(item.value)}
        />
        {renderError()}
      </div>
    );
  }

  return null;
};

export default LibSwitchInput;
