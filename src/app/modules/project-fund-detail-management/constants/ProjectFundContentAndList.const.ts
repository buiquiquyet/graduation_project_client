import { ColumnFields } from "@/shared/enums/inputType.enum";
import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";
import { FieldColumnDonates } from "../interfaces/ProjectFundContentAndList.enum";

export class ProjectFundContentAndListConst {
    public static readonly coloumnTable = [
      {
        label: "NGƯỜI ỦNG HỘ",
        accessor: FieldColumnDonates.FULL_NAME,
        type: ETableColumnType.TEXT,
      },
      {
        label: "SỐ TIỀN",
        accessor: FieldColumnDonates.AMOUNT,
        type: ETableColumnType.NUMBER,
      },
      {
        label: "THỜI GIAN",
        accessor: FieldColumnDonates.CREATED_AT,
        type: ETableColumnType.DATE,
      },
      
  
    ] as ColumnFields[];
  }