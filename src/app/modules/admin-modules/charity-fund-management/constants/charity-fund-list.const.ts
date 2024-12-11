import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";
import { CharityFundFields } from "./charity-fund.interface";
import { ColumnFields } from "@/shared/enums/inputType.enum";

export class CharityFundListConst {
  public static readonly columnCharityFund = [
    { label: "", accessor: "", type: ETableColumnType.CHECKBOX_ACTION },
    {
      label: "TÊN QUỸ",
      accessor: CharityFundFields.NAME,
      type: ETableColumnType.NOTE,
    },
    {
      label: "ẢNH",
      accessor: CharityFundFields.IMAGES,
      type: ETableColumnType.IMAGE,
    },
    {
      label: "EMAIL",
      accessor: CharityFundFields.EMAIL,
      type: ETableColumnType.NOTE,
    },
    {
      label: "SỐ ĐIỆN THOẠI",
      accessor: CharityFundFields.PHONE,
      type: ETableColumnType.NOTE,
    },
    {
      label: "MÔ TẢ",
      accessor: CharityFundFields.DESCRIPTION,
      type: ETableColumnType.NOTE,
    },
    {
      label: "ĐỊA CHỈ",
      accessor: CharityFundFields.EMAIL,
      type: ETableColumnType.NOTE,
      
    },
    {
      label: "CẬP NHẬT LÚC",
      accessor: CharityFundFields.UPDATE_AT,
      type: ETableColumnType.DATE,
      
    },

  ] as ColumnFields[];
}
