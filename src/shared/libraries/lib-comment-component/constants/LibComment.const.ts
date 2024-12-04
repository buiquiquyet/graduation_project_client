import {
  InputTypeEnum,
  ItemLibSwitchInput,
} from "@/shared/enums/inputType.enum";
import { CommentFields } from "../interfaces/LibComment.interface";

export class LibCommentConst {
  public static readonly arrInputComment = [
    {
      label: "",
      value: CommentFields.CONTENT,
      typeInput: "text",
      type: InputTypeEnum.TEXT_AREA,
      maxLength: 100,
      style: {
      }
    },
  ] as ItemLibSwitchInput[];
}
