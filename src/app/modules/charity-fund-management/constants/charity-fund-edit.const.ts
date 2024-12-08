import {
  InputTypeEnum,
  ItemLibSwitchInput,
} from "@/shared/enums/inputType.enum";
import { CharityFundFields } from "./charity-fund.interface";

export class CharityFundEditConst {

  // mảng thông tin quỹ
  public static readonly arrCharityFundInfo = [
    {
      label: "Tên quỹ",
      value: CharityFundFields.NAME,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
      maxLength: 80
    },
    {
      label: "Số điện thoại",
      value: CharityFundFields.PHONE,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
      // maxLength: 12
    },
    {
      label: "Email",
      value: CharityFundFields.EMAIL,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
      maxLength: 50
    },
    {
      label: "Mô tả",
      value: CharityFundFields.DESCRIPTION,
      type: InputTypeEnum.TEXT_AREA,
      // maxLength: 300
    },
    {
      label: "Địa chỉ",
      value: CharityFundFields.ADDRESS,
      typeInput: "text",
      type: InputTypeEnum.TEXT_AREA,
      // maxLength: 300
    },
  ] as ItemLibSwitchInput[];
  
}
