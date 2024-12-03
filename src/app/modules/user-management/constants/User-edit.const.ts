import {
  InputTypeEnum,
  ItemLibSwitchInput,
} from "@/shared/enums/inputType.enum";
import { UserFields } from "./User.interface";

export class UserEditConst {
  // giới tính
  public static readonly optionGender = [
    { label: "Nam", value: "male" },
    { label: "Nữ", value: "feMale" },
  ];
  // mảng thông tin cá nhân
  public static readonly arrPersonInfo = [
    {
      label: "Họ và tên",
      value: UserFields.FULL_NAME,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
    },
    {
      label: "Mật khẩu",
      value: UserFields.PASS_WORD,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
    },
    {
      label: "Số điện thoại",
      value: UserFields.PHONE,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
    },
    {
      label: "Giới tính",
      value: UserFields.GENDER,
      type: InputTypeEnum.INPUT_DROPDOWN,
      options: this.optionGender,
    },
    {
      label: "Ngày sinh",
      value: UserFields.BIRTH_DAY,
      typeInput: "date",
      type: InputTypeEnum.DATE,
    },
  ] as ItemLibSwitchInput[];
  // mảng thông tin cá nhân
  public static readonly arrPersonLocation = [
    {
      label: "Thành phố",
      value: UserFields.CITY,
      type: InputTypeEnum.INPUT_DROPDOWN,
    },
    {
      label: "Quận huyện",
      value: UserFields.DISTRICT,
      type: InputTypeEnum.INPUT_DROPDOWN,
    },
    {
      label: "Phường xã",
      value: UserFields.WARD,
      type: InputTypeEnum.INPUT_DROPDOWN,
    },
    {
      label: "Địa chỉ chi tiết",
      value: UserFields.ADDRESS,
      typeInput: "text",
      type: InputTypeEnum.TEXT_AREA,
    },
  ] as ItemLibSwitchInput[];
}
