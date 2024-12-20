export enum ProjectFundFields {
  ID = "Id",
  FUND_ID = "idFund", // id của quỹ
  FUND_NAME = "nameFund", // tên của quỹ
  CATEGORY_ID = "idCategory", // id của danh mục
  CATEGORY_NAME = "nameCategory", // id của danh mục
  EVALUATE = "evaluate", // lượt like
  NAME = "name", // tên chiến dịch
  IMAGES = "images", // ảnh chiến dịch
  IMAGES_IFORM_FILE = "imagesIFormFile", // ảnh chiến dịch
  VIDEO = "video", // video chiến dịch
  VIDEO_IFORM_FILE = "videoIFormFile", // video chiến dịch
  DESCRIPTION = "description", // ghi chú
  TARGET_AMOUNT = "targetAmount", // số tiền mục tiêu
  CURRENT_AMOUNT = "currentAmount", // số tiền hiện tại
  START_DATE = "startDate", // ngày bắt đầu
  END_DATE = "endDate", // ngày kết thúc
  UPDATE_AT = "updatedAt",
  //==
  PERCENT = "percent", // phần trăm tiền
  IMAGES_FUND = "imageFund", // ảnh chiến dịch
  NUMBER_OF_DONATE = "numberOfDonate", // số người ủng hộ
  USER_NAME = "userName", // tên sứ giả
  USER_Id = "userId", // id sứ giả
  LIKE_BY_USERS = "likedByUsers", // mảng like
}

export interface ProjectFundDTO {
  [ProjectFundFields.ID]: string | null;
  [ProjectFundFields.FUND_ID]: string | null; // Id của quỹ từ thiện
  [ProjectFundFields.NAME]: string | null; // Tên dự án
  [ProjectFundFields.FUND_NAME]: string | null; // Tên quỹ
  [ProjectFundFields.EVALUATE]?: number; // Tên quỹ
  [ProjectFundFields.IMAGES]: string | null; // Ảnh dự án
  [ProjectFundFields.DESCRIPTION]: string | null; // Mô tả dự án
  [ProjectFundFields.TARGET_AMOUNT]: number | null; // Số tiền cần quyên góp
  [ProjectFundFields.CURRENT_AMOUNT]: number | null; // Số tiền đang có quyên góp
  [ProjectFundFields.START_DATE]: Date | null; // Ngày bắt đầu chiến dịch
  [ProjectFundFields.END_DATE]: Date | null; // Ngày kết thúc chiến dịch
}
