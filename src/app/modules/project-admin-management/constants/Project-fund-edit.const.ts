import {
  InputTypeEnum,
  ItemLibSwitchInput,
} from "@/shared/enums/inputType.enum";
import { ProjectFundFields } from "./Project-fund.interface";

export class ProjectFundEditConst {
  // mảng thông tin dự án
  public static readonly arrProjectFundInfo = [
    {
      label: "Tên dự án",
      value: ProjectFundFields.NAME,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
      maxLength: 80,
    },
    {
      label: "Tên quỹ",
      value: ProjectFundFields.FUND_ID,
      type: InputTypeEnum.INPUT_DROPDOWN,
      // maxLength: 12
    },
    {
      label: "Danh mục",
      value: ProjectFundFields.CATEGORY_ID,
      type: InputTypeEnum.INPUT_DROPDOWN,
      // maxLength: 12
    },
    {
      label: "Số tiền mục tiêu",
      value: ProjectFundFields.TARGET_AMOUNT,
      type: InputTypeEnum.INPUT,
    },
    {
      label: "Ngày bắt đầu",
      value: ProjectFundFields.START_DATE,
      typeInput: "text",
      type: InputTypeEnum.DATE,
    },
    {
      label: "Ngày kết thúc",
      value: ProjectFundFields.END_DATE,
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
