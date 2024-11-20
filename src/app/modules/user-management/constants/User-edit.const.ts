import { InputTypeEnum } from "@/shared/enums/inputType.enum"
import { UserEditFields } from "./User-edit.interface"

export class UserEditConst {
    // mảng thông tin cá nhân
  public static readonly arrPersonInfo = [
    {label: 'Họ và tên', value: UserEditFields.FULL_NAME, typeInput: "text", type: InputTypeEnum.INPUT },
    {label: 'Mật khẩu', value: UserEditFields.PASS_WORD, typeInput: "text", type: InputTypeEnum.INPUT },
    {label: 'Số điện thoại', value: UserEditFields.PHONE, typeInput: "text", type: InputTypeEnum.INPUT },
    {label: 'Giới tính', value: UserEditFields.GENDER, type: InputTypeEnum.INPUT_DROPDOWN },
    {label: 'Ngày sinh', value: UserEditFields.BIRTH_DAY, typeInput: "date" , type: InputTypeEnum.INPUT},
  ]
  // mảng thông tin cá nhân
  public static readonly arrPersonLocation = [
    {label: 'Thành phố', value: UserEditFields.CITY,  type: InputTypeEnum.INPUT_DROPDOWN },
    {label: 'Quận huyện', value: UserEditFields.DISTRICT,  type: InputTypeEnum.INPUT_DROPDOWN },
    {label: 'Phường xã', value: UserEditFields.WARD,  type: InputTypeEnum.INPUT_DROPDOWN },
    {label: 'Địa chỉ chi tiết', value: UserEditFields.ADDRESS, typeInput: "text", type: InputTypeEnum.INPUT },
  ]
  // giới tính
  public static readonly optionGender = [
    {label: "Nam", value: "male"},
    {label: "Nữ", value: "feMale"},
  ]
}