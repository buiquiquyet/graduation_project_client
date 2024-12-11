import { ETableColumnType } from "@/shared/libraries/lib-table-component/constants/LibTable.enum";
import { CategoryFields } from "./category.interface";
import { ColumnFields } from "@/shared/enums/inputType.enum";

export class CategoryListConst {
  public static readonly columnCategory = [
    { label: "", accessor: "", type: ETableColumnType.CHECKBOX_ACTION },
    {
      label: "TÊN DANH MỤC",
      accessor: CategoryFields.NAME,
      type: ETableColumnType.NOTE,
    },

  ] as ColumnFields[];
}
