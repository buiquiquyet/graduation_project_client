export enum TabListProjectFundProcessing {
  APPROVED = "approved", //đã duyệt 
  PROCESSING = "processing", // đang chờ duyệt 
  REJECTED = "rejected", // từ chối duyệt
}
export enum UpdateApprovalStatusFields {
  IDS = "Ids", // mảng id cần duyệt
  IS_APPROVED = "isApproved" // trạng thái duyệt
}
export interface UpdateApprovalStatusDTO {
  [UpdateApprovalStatusFields.IDS]: string[];
  [UpdateApprovalStatusFields.IS_APPROVED]: TabListProjectFundProcessing; // trạng thái duyệt
}
