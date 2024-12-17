import { ColumnFields } from "@/shared/enums/inputType.enum";
import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";
import { ProjectFundDialogDonateFields } from "../../project-fund-detail-management/interfaces/ProjectFundDialogDonate.interface";

export const columnHistoryDonate = [
  {
    label: "TÊN DỰ ÁN",
    accessor: "ProjectName",
    type: ETableColumnType.NOTE,
  },

  {
    label: "SỐ TIỀN MỤC TIÊU",
    accessor: "ProjectTargetAmount",
    type: ETableColumnType.NUMBER,
  },
  {
    label: "SỐ TIỀN HIỆN TẠI",
    accessor: "ProjectCurrentAmount",
    type: ETableColumnType.NUMBER,
  },
  {
    label: "NGÀY BẮT ĐẦU",
    accessor: "ProjectStartDate",
    type: ETableColumnType.DATE,
  },
  {
    label: "NGÀY KẾT THÚC",
    accessor: "ProjectEndDate",
    type: ETableColumnType.DATE,
  },
  {
    label: "SỐ TIỀN ỦNG HỘ",
    accessor: ProjectFundDialogDonateFields.DONATION_AMOUNT,
    type: ETableColumnType.NUMBER,
  },
  {
    label: "THỜI GIAN",
    accessor: ProjectFundDialogDonateFields.CREATED_AT,
    type: ETableColumnType.DATE,
  },
] as ColumnFields[];
