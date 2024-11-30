export enum InitCharityFund {
  ID_ROW = "idRow", // id của 1 row
  IS_SUBMIT_SUCCESS = "isSubmitSuccess", // đã submit button thành công chưa để load lại list 
  IS_EDIT = "isEdit", // nếu đang là trạng thái edit bản ghi quỹ
  IS_DEL_SUCCESS = "isDeleteSuccess", // nếu xoá list thành công
}
export interface InitCharityFundProps {
  [InitCharityFund.ID_ROW]: string;
  [InitCharityFund.IS_SUBMIT_SUCCESS]: boolean;
  [InitCharityFund.IS_EDIT]: boolean;
  [InitCharityFund.IS_DEL_SUCCESS]: boolean;
}
