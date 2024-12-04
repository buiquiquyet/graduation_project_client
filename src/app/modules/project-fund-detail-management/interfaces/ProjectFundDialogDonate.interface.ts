export enum ProjectFundDialogDonateFields {
    USER_NAME = "FullName",
    DECRIPTION = "OrderInfo",
    USER_PHONE = "UserPhone",
    USER_ADDRESS = "UserAddress",
    DONATION_AMOUNT = "Amount",
    PROJECT_FUND_ID = "ProjectFundId" ,// id của bản ghi từ thiện
    UserId = "UserId", // id của người dùng nếu có
}

export interface ProjectFundDialogDonateDTO {
    [ProjectFundDialogDonateFields.USER_NAME]: string,
    [ProjectFundDialogDonateFields.DECRIPTION]: string,
    [ProjectFundDialogDonateFields.USER_PHONE]: string,
    [ProjectFundDialogDonateFields.USER_ADDRESS]: string,
    [ProjectFundDialogDonateFields.DONATION_AMOUNT]: string|number,
    [ProjectFundDialogDonateFields.PROJECT_FUND_ID]: string,
    [ProjectFundDialogDonateFields.UserId]: string|number,
}