import { ColumnFields } from "@/shared/enums/inputType.enum";
import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";

export class ProjectFundContentAndListConst {
    public static readonly coloumnTable = [
      {
        label: "NGƯỜI ỦNG HỘ",
        accessor: 'NAME',
        type: ETableColumnType.NOTE,
      },
      {
        label: "SỐ TIỀN",
        accessor: "AMOUNT",
        type: ETableColumnType.NOTE,
      },
      {
        label: "THỜI GIAN",
        accessor: "TIME",
        type: ETableColumnType.NOTE,
      },
      
  
    ] as ColumnFields[];
  }