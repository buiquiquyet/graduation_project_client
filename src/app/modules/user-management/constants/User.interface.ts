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
    ADDRESS = "address",      
    IS_EMISSARY = "isEmissary", // có phải là sứ giả      
    IS_EMISSARY_APPROVED = "isEmissaryApproved", // đã duyệt thành sứ giả chưa 
    CCCD_IFORM_FILE = "cccdIFormFile", // mặt  căn cước 
    CCCD = "cccd", // mặt  căn cước
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
    [UserFields.CCCD]?: string;                       
}


export enum UserTabActive {
    PERSON = 1, // trang cá nhân
    HISTORY, //lịch sử ủng hộ
}