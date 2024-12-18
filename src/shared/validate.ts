import * as Yup from 'yup';

export interface ValidationRules {
  [key: string]: Yup.Schema<any>;
}
export enum ValidateInputTextError {
  ERROR = "Trường bắt buộc nhập"
}
export const createValidationSchema = (
  fields: { [key: string]: any },
  customRules?: ValidationRules
) => {
  const schemaFields = Object.keys(fields).reduce((acc, field) => {
    if (customRules && customRules[field]) {
      acc[field] = customRules[field];
    } else {
      acc[field] = Yup.string().required(ValidateInputTextError.ERROR);
    }
    return acc;
  }, {} as { [key: string]: Yup.Schema<any> });

  return Yup.object(schemaFields);
};
