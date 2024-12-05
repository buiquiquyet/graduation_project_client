export enum ResponseDTOKey {
    ERROR = "error",
    SUCCESS = "success",
    SUCCESS_V2 = "Success",
    DATA = "data"
}
export enum ESuccessCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
}

export enum EErrorCode {
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    REQUEST_TIMEOUT = 408,
    UNSUPPORTED_MEDIA_TYPE = 415,
    INTERNAL_SERVER_ERROR = 500,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}
export enum MessageError {
    INPUT_ERROR_NULL = "Thông tin không được để trống."
}