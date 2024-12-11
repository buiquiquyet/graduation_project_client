import {
  InputTypeEnum,
  ItemLibSwitchInput,
} from "@/shared/enums/inputType.enum";
import { CategoryFields } from "./category.interface";

export class CategoryEditConst {

  // mảng thông tin quỹ
  public static readonly arrCategoryInfo = [
    {
      label: "Tên danh mục",
      value: CategoryFields.NAME,
      typeInput: "text",
      type: InputTypeEnum.INPUT,
      maxLength: 80
    },
    
  ] as ItemLibSwitchInput[];
  
}
