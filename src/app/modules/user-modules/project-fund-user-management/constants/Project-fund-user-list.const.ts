import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";
import { ColumnFields } from "@/shared/enums/inputType.enum";
import { ProjectFundProcessingFields } from "./Project-fund-user.interface";
import { TabListProjectFundProcessing } from "./Project-fund-user.enum";

export class ProjectFundProcessingListConst {
  public static readonly columnProjectFund = [
    { label: "", accessor: "", type: ETableColumnType.CHECKBOX_ACTION },
    {
      label: "TÊN DỰ ÁN",
      accessor: ProjectFundProcessingFields.NAME,
      type: ETableColumnType.NOTE,
    },
    {
      label: "TÊN QUỸ",
      accessor: ProjectFundProcessingFields.FUND_NAME,
      type: ETableColumnType.NOTE,
    },
    {
      label: "TRẠNG THÁI",
      accessor: ProjectFundProcessingFields.IS_APPROVED,
      type: ETableColumnType.STATUS,
    },
    {
      label: "SỨ GIẢ",
      accessor: ProjectFundProcessingFields.USER_NAME,
      type: ETableColumnType.TEXT,
    },
    {
      label: "DANH MỤC",
      accessor: ProjectFundProcessingFields.CATEGORY_NAME,
      type: ETableColumnType.NOTE,
    },
    {
      label: "SỐ TIỀN MỤC TIÊU",
      accessor: ProjectFundProcessingFields.TARGET_AMOUNT,
      type: ETableColumnType.NUMBER,
    },
    {
      label: "SỐ TIỀN HIỆN TẠI",
      accessor: ProjectFundProcessingFields.CURRENT_AMOUNT,
      type: ETableColumnType.NUMBER,
    },
    {
      label: "NGÀY BẮT ĐẦU",
      accessor: ProjectFundProcessingFields.START_DATE,
      type: ETableColumnType.DATE,
    },
    {
      label: "NGÀY KẾT THÚC",
      accessor: ProjectFundProcessingFields.END_DATE,
      type: ETableColumnType.DATE,
    },
    {
      label: "MÔ TẢ DỰ ÁN",
      accessor: ProjectFundProcessingFields.DESCRIPTION,
      type: ETableColumnType.TEXT_QUILL,
    },
    {
      label: "ẢNH",
      accessor: ProjectFundProcessingFields.IMAGES,
      type: ETableColumnType.IMAGE,
      
    },
    {
      label: "CẬP NHẬT LÚC",
      accessor: ProjectFundProcessingFields.UPDATE_AT,
      type: ETableColumnType.DATE,
      
    },
    {
      label: "",
      accessor: "",
      type: ETableColumnType.ICON,
      
    },

  ] as ColumnFields[];
  // tab của dự án người dùng
  public static readonly tabTabeList = [
    {
      value: TabListProjectFundProcessing.PROCESSING,
      label: "Chờ duyệt",
    },
    {
      value: TabListProjectFundProcessing.APPROVED,
      label: "Đã duyệt",
    },
    {
      value: TabListProjectFundProcessing.REJECTED,
      label: "Từ chối duyệt",
    },
  ]
}
