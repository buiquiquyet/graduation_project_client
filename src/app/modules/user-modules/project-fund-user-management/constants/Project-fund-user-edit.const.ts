import {
  InputTypeEnum,
  ItemLibSwitchInput,
} from "@/shared/enums/inputType.enum";
import { ProjectFundProcessingFields } from "./Project-fund-user.interface";

export class ProjectFundProcessingEditConst {
  // mảng thông tin dự án
  public static readonly arrProjectFundInfo = [
    {
      label: "Tên dự án",
      value: ProjectFundProcessingFields.NAME,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
      maxLength: 80,
    },
    {
      label: "Tên quỹ",
      value: ProjectFundProcessingFields.FUND_ID,
      type: InputTypeEnum.INPUT_DROPDOWN,
      // maxLength: 12
    },
    {
      label: "Danh mục",
      value: ProjectFundProcessingFields.CATEGORY_ID,
      type: InputTypeEnum.INPUT_DROPDOWN,
      // maxLength: 12
    },
    {
      label: "Số tiền mục tiêu",
      value: ProjectFundProcessingFields.TARGET_AMOUNT,
      type: InputTypeEnum.INPUT,
      typeInput: "number",
      maxLength: 1000000000
    },
    {
      label: "Ngày bắt đầu",
      value: ProjectFundProcessingFields.START_DATE,
      typeInput: "text",
      type: InputTypeEnum.DATE,
    },
    {
      label: "Ngày kết thúc",
      value: ProjectFundProcessingFields.END_DATE,
      typeInput: "text",
      type: InputTypeEnum.DATE,
    },
  ] as ItemLibSwitchInput[];
  // // mảng thông tin dự án
  // public static readonly arrProjectFundInfoV2 = [
  //   {
  //     label: "Mô tả dự án",
  //     value: ProjectFund.DESCRIPTION,
  //     typeInput: "text",
  //     type: InputTypeEnum.INPUT,
  //     maxLength: 50,
  //   },
  // ] as ItemLibSwitchInput[];
}
