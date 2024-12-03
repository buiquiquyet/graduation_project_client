import {
  InputTypeEnum,
  ItemLibSwitchInput,
} from "@/shared/enums/inputType.enum";
import { ProjectFundDialogDonateFields } from "../interfaces/ProjectFundDialogDonate.interface";

export class ProjectFundDialogDonateConst {
  public static readonly formInputDonate = [
    {
      label: "Họ tên người ủng hộ",
      value: ProjectFundDialogDonateFields.USER_NAME,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
      style: {
        padding: "8px",
        fontSize: '16px'
      },
    },
    {
      label: "Email",
      value: ProjectFundDialogDonateFields.USER_EMAIL,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
      style: {
        padding: "8px",
        fontSize: '16px'
      },
    },
    {
      label: "Số điện thoại",
      value: ProjectFundDialogDonateFields.USER_PHONE,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
      style: {
        padding: "8px",
        fontSize: '16px'
      },
    },
    {
      label: "Địa chỉ",
      value: ProjectFundDialogDonateFields.USER_ADDRESS,
      type: InputTypeEnum.INPUT,
      style: {
        padding: "8px",
        fontSize: '16px'
      },
    },
  ] as ItemLibSwitchInput[];
  // 1 input
  public static readonly formInputDonateAmout = [
    {
      label: "",
      value: ProjectFundDialogDonateFields.DONATION_AMOUNT,
      type: InputTypeEnum.INPUT,
      style: {
        width: "200px",
        padding: "10px",
        background: "rgb(233 233 233)",
        fontSize: "18px",
        fontWeight: "bold",
        border: "1px solid black",
      },
    },
  ] as ItemLibSwitchInput[];
}
