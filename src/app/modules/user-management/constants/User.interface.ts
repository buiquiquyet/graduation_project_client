export enum UserFields {
    ID = "Id",
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
    PHONE = "phone",         
    GENDER = "gender",       
    BIRTH_DAY = "birthDay",  
    WARD = "ward",           
    DISTRICT = "district",   
    ADDRESS = "address"      
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
    [UserFields.PHONE]?: string;                          
    [UserFields.GENDER]?: string;                        
    [UserFields.BIRTH_DAY]?: string;                      
    [UserFields.WARD]?: string;                          
    [UserFields.DISTRICT]?: string;                   
    [UserFields.ADDRESS]?: string;                       
}