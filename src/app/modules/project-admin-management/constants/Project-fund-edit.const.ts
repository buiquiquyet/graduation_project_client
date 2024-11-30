import {
  InputTypeEnum,
  ItemLibSwitchInput,
} from "@/shared/enums/inputType.enum";
import { ProjectFund } from "./Project-fund.interface";

export class ProjectFundEditConst {
  // mảng thông tin dự án
  public static readonly arrProjectFundInfo = [
    {
      label: "Tên dự án",
      value: ProjectFund.NAME,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
      maxLength: 80,
    },
    {
      label: "Tên quỹ",
      value: ProjectFund.FUND_ID,
      typeInput: "number",
      type: InputTypeEnum.INPUT_DROPDOWN,
      // maxLength: 12
    },
    {
      label: "Số tiền mục tiêu",
      value: ProjectFund.TARGET_AMOUNT,
      type: InputTypeEnum.INPUT,
    },
    {
      label: "Ngày bắt đầu",
      value: ProjectFund.START_DATE,
      typeInput: "text",
      type: InputTypeEnum.DATE,
    },
    {
      label: "Ngày kết thúc",
      value: ProjectFund.END_DATE,
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
