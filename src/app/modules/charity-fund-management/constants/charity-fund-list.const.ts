import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";
import { CharityFundFields } from "./charity-fund.interface";

export class CharityFundListConst {
  public static readonly columnCharityFund = [
    { label: "", accessor: "", type: ETableColumnType.CHECKBOX_ACTION },
    {
      label: "Tên quỹ",
      accessor: CharityFundFields.NAME,
      type: ETableColumnType.TEXT,
    },
    {
      label: "Ảnh",
      accessor: CharityFundFields.IMAGES,
      type: ETableColumnType.TEXT,
    },
    {
      label: "Email",
      accessor: CharityFundFields.EMAIL,
      type: ETableColumnType.TEXT,
    },
    {
      label: "Số điện thoại",
      accessor: CharityFundFields.PHONE,
      type: ETableColumnType.TEXT,
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

    { label: "", accessor: "", type: ETableColumnType.ICON },
  ];
}
