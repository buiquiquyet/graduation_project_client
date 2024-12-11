export enum CharityFundFields {
  ID = "Id",
  EMAIL = "email",
  NAME = "name",
  IMAGES = "images",
  IMAGES_IFORM_FILE = "imagesIFormFile", // đẩy file img dạng fromFile
  DESCRIPTION = "description",
  ADDRESS = "address",
  PHONE = "phone",
  UPDATE_AT = "updatedAt",
}

export interface CharityFundDTO {
  [CharityFundFields.EMAIL]: string;
  [CharityFundFields.NAME]?: string;
  [CharityFundFields.IMAGES]?: string;
  [CharityFundFields.DESCRIPTION]?: string;
  [CharityFundFields.ADDRESS]?: string;
  [CharityFundFields.PHONE]?: string;
}
