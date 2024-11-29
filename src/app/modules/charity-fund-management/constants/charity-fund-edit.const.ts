import { InputTypeEnum, ItemLibSwitchInput } from "@/shared/enums/inputType.enum"
import { CharityFundFields } from "./charity-fund.interface"

export class CharityFundEditConst {
  // giới tính
  public static readonly optionGender = [
    {label: "Nam", value: "male"},
    {label: "Nữ", value: "feMale"},
  ]
    // mảng thông tin cá nhân
  public static readonly arrCharityFundInfo = [
    {label: 'Tên quỹ', value: CharityFundFields.NAME, typeInput: "text", type: InputTypeEnum.INPUT },
    {label: 'Số điện thoại', value: CharityFundFields.PHONE, typeInput: "text", type: InputTypeEnum.INPUT },
    {label: 'Email', value: CharityFundFields.EMAIL, typeInput: "text" , type: InputTypeEnum.INPUT},
    {label: 'Mô tả', value: CharityFundFields.DESCRIPTION, type: InputTypeEnum.TEXT_AREA },
    {label: 'Địa chỉ', value: CharityFundFields.ADDRESS, typeInput: "text" , type: InputTypeEnum.TEXT_AREA},
  ] as ItemLibSwitchInput[]
  // mảng thông tin cá nhân
  public static readonly arrPersonLocation = [
    // {label: 'Thành phố', value: UserFields.CITY,  type: InputTypeEnum.INPUT_DROPDOWN },
    // {label: 'Quận huyện', value: UserFields.DISTRICT,  type: InputTypeEnum.INPUT_DROPDOWN },
    // {label: 'Phường xã', value: UserFields.WARD,  type: InputTypeEnum.INPUT_DROPDOWN },
    // {label: 'Địa chỉ chi tiết', value: UserFields.ADDRESS, typeInput: "text", type: InputTypeEnum.TEXT_AREA },
  ] as ItemLibSwitchInput[]
}