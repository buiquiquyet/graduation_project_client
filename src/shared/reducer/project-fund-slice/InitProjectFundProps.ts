export enum InitProjectFund {
  ID_ROW = "idRow", // id của 1 row
  IS_SUBMIT_SUCCESS = "isSubmitSuccess", // đã submit button thành công chưa để load lại list 
  IS_EDIT = "isEdit", // nếu đang là trạng thái edit bản ghi quỹ
  IS_DEL_SUCCESS = "isDeleteSuccess", // nếu xoá list thành công
}
export interface InitProjectFundProps {
  [InitProjectFund.ID_ROW]: string;
  [InitProjectFund.IS_SUBMIT_SUCCESS]: boolean;
  [InitProjectFund.IS_EDIT]: boolean;
  [InitProjectFund.IS_DEL_SUCCESS]: boolean;
}
