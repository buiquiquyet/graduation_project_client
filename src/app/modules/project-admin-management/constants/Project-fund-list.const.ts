import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";
import { CharityFundFields } from "./Project-fund.interface";
import { ColumnFields } from "@/shared/enums/inputType.enum";

export class CharityFundListConst {
  public static readonly columnCharityFund = [
    { label: "", accessor: "", type: ETableColumnType.CHECKBOX_ACTION },
    {
      label: "Tên quỹ",
      accessor: CharityFundFields.NAME,
      type: ETableColumnType.NOTE,
    },
    {
      label: "Ảnh",
      accessor: CharityFundFields.IMAGES,
      type: ETableColumnType.NOTE,
    },
    {
      label: "Email",
      accessor: CharityFundFields.EMAIL,
      type: ETableColumnType.NOTE,
    },
    {
      label: "Số điện thoại",
      accessor: CharityFundFields.PHONE,
      type: ETableColumnType.NOTE,
    },
    {
      label: "Mô tả",
      accessor: CharityFundFields.DESCRIPTION,
      type: ETableColumnType.NOTE,
    },
    {
      label: "Địa chỉ",
      accessor: CharityFundFields.EMAIL,
      type: ETableColumnType.NOTE,
      
    },

  ] as ColumnFields[];
}
