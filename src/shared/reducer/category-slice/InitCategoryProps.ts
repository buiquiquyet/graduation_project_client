export enum InitCategory {
  ID_ROW = "idRow", // id của 1 row
  IS_SUBMIT_SUCCESS = "isSubmitSuccess", // đã submit button thành công chưa để load lại list 
  IS_EDIT = "isEdit", // nếu đang là trạng thái edit bản ghi quỹ
  IS_DEL_SUCCESS = "isDeleteSuccess", // nếu xoá list thành công
}
export interface InitCategoryProps {
  [InitCategory.ID_ROW]: string;
  [InitCategory.IS_SUBMIT_SUCCESS]: boolean;
  [InitCategory.IS_EDIT]: boolean;
  [InitCategory.IS_DEL_SUCCESS]: boolean;
}
