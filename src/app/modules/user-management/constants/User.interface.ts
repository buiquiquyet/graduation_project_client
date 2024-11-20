export enum UserFields {
    EMAIL = "email",
    PASS_WORD = "passWord",
    FULL_NAME = "fullName",
    AVATAR = "avatar",
    VERIFICATION_CODE = "verificationCode",
    EXPIRATION_TIME = "expirationTime",
    IS_VERIFIED = "isVerified",
    CITY = "city",
    CREATE_AT = "createdAt",
    UPDATED_AT = "updatedAt",
    ROLE = "role",
}
export interface UsersDTO {
    [UserFields.EMAIL]: string;
    [UserFields.PASS_WORD]?: string;
    [UserFields.FULL_NAME]?: string;
    [UserFields.AVATAR]?: string;
    [UserFields.VERIFICATION_CODE]?: string;
    [UserFields.EXPIRATION_TIME]?: string;
    [UserFields.IS_VERIFIED]?: boolean;
    [UserFields.CITY]?: string;
    [UserFields.CREATE_AT]?: string;
    [UserFields.UPDATED_AT]?: string;
    [UserFields.ROLE]?: string;
}