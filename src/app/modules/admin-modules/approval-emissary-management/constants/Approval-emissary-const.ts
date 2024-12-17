import { UserFields } from "@/app/modules/user-management/constants/User.interface";
import { TabListProjectFundProcessing } from "@/app/modules/user-modules/project-fund-user-management/constants/Project-fund-user.enum";
import { ColumnFields } from "@/shared/enums/inputType.enum";
import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";

export class ApprovalEmissaryConst {
  // tab của dự án người dùng
  public static readonly tabTabeList = [
    {
      value: TabListProjectFundProcessing.PROCESSING,
      label: "Cần xử lý",
    },
    {
      value: TabListProjectFundProcessing.APPROVED,
      label: "Đã duyệt",
    },
    {
      value: TabListProjectFundProcessing.REJECTED,
      label: "Từ chối duyệt",
    },
  ];
  public static readonly columnApprovalEmissary = [
    { label: "", accessor: "", type: ETableColumnType.CHECKBOX_ACTION },
    {
      label: "HỌ TÊN",
      accessor: UserFields.FULL_NAME,
      type: ETableColumnType.TEXT,
    },
    {
      label: "SỐ ĐIỆN THOẠI",
      accessor: UserFields.PHONE,
      type: ETableColumnType.TEXT,
    },
    {
      label: "GIỚI TÍNH",
      accessor: UserFields.GENDER,
      type: ETableColumnType.TEXT,
    },
    {
      label: "NGÀY SINH",
      accessor: UserFields.BIRTH_DAY,
      type: ETableColumnType.TEXT,
    },
    {
      label: "THÀNH PHỐ",
      accessor: UserFields.CITY,
      type: ETableColumnType.TEXT,
    },
    {
      label: "HUYỆN",
      accessor: UserFields.DISTRICT,
      type: ETableColumnType.TEXT,
    },
    {
      label: "PHƯỜNG XÃ",
      accessor: UserFields.WARD,
      type: ETableColumnType.TEXT,
    },
    {
      label: "ĐỊA CHỈ",
      accessor: UserFields.ADDRESS,
      type: ETableColumnType.TEXT,
    },
    {
      label: "ẢNH",
      accessor: UserFields.AVATAR,
      type: ETableColumnType.IMAGE,
    },
    {
      label: "CCCD ",
      accessor: UserFields.CCCD,
      type: ETableColumnType.IMAGE,
    },
    
  ] as ColumnFields[];
  // trạng thái duyệt
}
