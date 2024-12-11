import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";
import { ColumnFields } from "@/shared/enums/inputType.enum";
import { UserFields } from "@/app/modules/user-management/constants/User.interface";

export class AdminUserConst {
  public static readonly columnUser = [
    { label: "", accessor: "", type: ETableColumnType.CHECKBOX_ACTION },
    {
      label: "TÊN NGƯỜI DÙNG",
      accessor: UserFields.FULL_NAME,
      type: ETableColumnType.NOTE,
    },
    {
      label: "ẢNH",
      accessor: UserFields.AVATAR,
      type: ETableColumnType.IMAGE,
    },
    {
      label: "SỐ ĐIỆN THOẠI",
      accessor: UserFields.PHONE,
      type: ETableColumnType.NOTE,
    },
    {
      label: "GIỚI TÍNH",
      accessor: UserFields.GENDER,
      type: ETableColumnType.NOTE,
    },
    {
      label: "NGÀY SINH",
      accessor: UserFields.BIRTH_DAY,
      type: ETableColumnType.NOTE,
    },
    {
      label: "THÀNH PHỐ",
      accessor: UserFields.CITY,
      type: ETableColumnType.NOTE,
    },
    {
      label: "QUẬN HUYỆN",
      accessor: UserFields.DISTRICT,
      type: ETableColumnType.NOTE,
    },
    {
      label: "PHƯỜNG XÃ",
      accessor: UserFields.WARD,
      type: ETableColumnType.NOTE,
    },
    {
      label: "ĐỊA CHỈ CHI TIẾT",
      accessor: UserFields.ADDRESS,
      type: ETableColumnType.NOTE,
    },
  ] as ColumnFields[];
}
