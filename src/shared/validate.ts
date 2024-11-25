import { MessageError } from "./enums/responseDataDTO.enum";
import * as Yup from "yup";
export const createValidationSchema = (fields: { [key: string]: any }) => {
    const schemaFields = Object.keys(fields).reduce((acc, field) => {
      // Tùy vào kiểu dữ liệu hoặc tên trường mà bạn áp dụng quy tắc khác nhau
      // if (field === UserFields.BIRTH_DAY) {
      //   acc[field] = Yup.string().required(MessageError.INPUT_ERROR_NULL);;
      // } else {
      acc[field] = Yup.string().required(MessageError.INPUT_ERROR_NULL);
      // }
      return acc;
    }, {} as { [key: string]: Yup.Schema<any> });

    return Yup.object(schemaFields);
  };