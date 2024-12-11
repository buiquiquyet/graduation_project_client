

export enum ProjectFundProcessingFields{
  ID = "Id",
  FUND_ID = "idFund", // id của quỹ
  FUND_NAME = "nameFund", // tên của quỹ
  CATEGORY_ID = "idCategory", // id của danh mục
  CATEGORY_NAME = "nameCategory", // id của danh mục
  EVALUATE = "evaluate", // lượt like
  NAME = "name", // tên chiến dịch
  IMAGES = "images", // ảnh chiến dịch
  IMAGES_IFORM_FILE = "imagesIFormFile", // ảnh chiến dịch
  DESCRIPTION = "description", // ghi chú
  TARGET_AMOUNT = "targetAmount", // số tiền mục tiêu
  CURRENT_AMOUNT = "currentAmount", // số tiền hiện tại
  START_DATE = "startDate", // ngày bắt đầu
  END_DATE = "endDate", // ngày kết thúc
  UPDATE_AT = "updatedAt",
  USER_ID = "userId", // id của người sứ giả
  USER_NAME = "userName", // name của người sứ giả
  //== 
  PERCENT = "percent", // phần trăm tiền
  IS_APPROVED = "isApproved", // trạng thái duyệt
  IMAGES_FUND = "imageFund", // ảnh chiến dịch
  NUMBER_OF_DONATE = "numberOfDonate", // số người ủng hộ

}

export interface ProjectFundProcessingDTO {
  [ProjectFundProcessingFields.ID]: string | null;
  [ProjectFundProcessingFields.FUND_ID]: string | null; // Id của quỹ từ thiện
  [ProjectFundProcessingFields.NAME]: string | null; // Tên dự án
  [ProjectFundProcessingFields.FUND_NAME]: string | null; // Tên quỹ
  [ProjectFundProcessingFields.EVALUATE]?: number; // Tên quỹ
  [ProjectFundProcessingFields.IMAGES]: string | null; // Ảnh dự án
  [ProjectFundProcessingFields.DESCRIPTION]: string | null; // Mô tả dự án
  [ProjectFundProcessingFields.TARGET_AMOUNT]: number | null; // Số tiền cần quyên góp
  [ProjectFundProcessingFields.CURRENT_AMOUNT]: number | null; // Số tiền đang có quyên góp
  [ProjectFundProcessingFields.START_DATE]: Date | null; // Ngày bắt đầu chiến dịch
  [ProjectFundProcessingFields.END_DATE]: Date | null; // Ngày kết thúc chiến dịch
}