export enum ProjectFundDialogDonateFields {
    USER_NAME = "userName",
    USER_EMAIL = "userEmail",
    USER_PHONE = "userPhone",
    USER_ADDRESS = "userAddress",
    DONATION_AMOUNT = "donationAmount",
}

export interface ProjectFundDialogDonateDTO {
    [ProjectFundDialogDonateFields.USER_NAME]: string,
    [ProjectFundDialogDonateFields.USER_EMAIL]: string,
    [ProjectFundDialogDonateFields.USER_PHONE]: string,
    [ProjectFundDialogDonateFields.USER_ADDRESS]: string,
    [ProjectFundDialogDonateFields.DONATION_AMOUNT]: string|number,
}