export enum CharityFundFields {
  ID = "Id",
  EMAIL = "email",
  NAME = "name",
  IMAGES = "images",
  IMAGES_IFORM_FILE = "imagesIFormFile", // đẩy file img dạng fromFile
  DESCRIPTION = "description",
  ADDRESS = "address",
  PHONE = "phone",
}

export interface CharityFundDTO {
  [CharityFundFields.EMAIL]: string;
  [CharityFundFields.NAME]?: string;
  [CharityFundFields.IMAGES]?: string;
  [CharityFundFields.DESCRIPTION]?: string;
  [CharityFundFields.ADDRESS]?: string;
  [CharityFundFields.PHONE]?: string;
}


export enum ProjectFund {
  ID = "id",
  FUND_ID = "fundId", // id của quỹ
  NAME = "name", // tên chiến dịch
  IMAGES = "images", // ảnh chiến dịch
  DESCRIPTION = "description", // ghi chú
  TARGET_AMOUNT = "targetAmount", // số tiền mục tiêu
  CURRENT_AMOUNT = "currentAmount", // số tiền hiện tại
  START_DATE = "startDate", // ngày bắt đầu
  END_DATE = "endDate", // ngày kết thúc
}

export interface ProjectFundDTO {
  [ProjectFund.ID]: string | null;
  [ProjectFund.FUND_ID]: string | null; // Id của quỹ từ thiện
  [ProjectFund.NAME]: string | null; // Tên dự án
  [ProjectFund.IMAGES]: string | null; // Ảnh dự án
  [ProjectFund.DESCRIPTION]: string | null; // Mô tả dự án
  [ProjectFund.TARGET_AMOUNT]: number | null; // Số tiền cần quyên góp
  [ProjectFund.CURRENT_AMOUNT]: number | null; // Số tiền đang có quyên góp
  [ProjectFund.START_DATE]: Date | null; // Ngày bắt đầu chiến dịch
  [ProjectFund.END_DATE]: Date | null; // Ngày kết thúc chiến dịch
}