import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";
import { ColumnFields } from "@/shared/enums/inputType.enum";
import { ProjectFundFields } from "./Project-fund.interface";

export class ProjectFundListConst {
  public static readonly columnProjectFund = [
    { label: "", accessor: "", type: ETableColumnType.CHECKBOX_ACTION },
    {
      label: "TÊN DỰ ÁN",
      accessor: ProjectFundFields.NAME,
      type: ETableColumnType.NOTE,
    },
    {
      label: "TÊN QUỸ",
      accessor: ProjectFundFields.FUND_NAME,
      type: ETableColumnType.NOTE,
    },
    {
      label: "DANH MỤC",
      accessor: ProjectFundFields.CATEGORY_NAME,
      type: ETableColumnType.NOTE,
    },
    {
      label: "SỐ TIỀN MỤC TIÊU",
      accessor: ProjectFundFields.TARGET_AMOUNT,
      type: ETableColumnType.NOTE,
    },
    {
      label: "SỐ TIỀN HIỆN TẠI",
      accessor: ProjectFundFields.CURRENT_AMOUNT,
      type: ETableColumnType.NOTE,
    },
    {
      label: "NGÀY BẮT ĐẦU",
      accessor: ProjectFundFields.START_DATE,
      type: ETableColumnType.DATE,
    },
    {
      label: "NGÀY KẾT THÚC",
      accessor: ProjectFundFields.END_DATE,
      type: ETableColumnType.DATE,
    },
    {
      label: "MÔ TẢ DỰ ÁN",
      accessor: ProjectFundFields.DESCRIPTION,
      type: ETableColumnType.TEXT_QUILL,
    },
    {
      label: "ẢNH",
      accessor: ProjectFundFields.IMAGES,
      type: ETableColumnType.IMAGE,
      
    },
    {
      label: "CẬP NHẬT LÚC",
      accessor: ProjectFundFields.UPDATE_AT,
      type: ETableColumnType.DATE,
      
    },

  ] as ColumnFields[];
}
