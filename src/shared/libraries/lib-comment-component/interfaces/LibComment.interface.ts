
export enum CommentFields {
    CONTENT = "content",// nội dung comment
    USER_ID = "userId",// ID NGƯỜI DÙNG
    PROJECT_FUND_ID = "projectFundId",// ID item từ thiện
    USER_NAME = "userName",// tên người dùng
    USER_AVATAR = "userAvatar",// avatar người dùng
    UPDATED_AT = "updatedAt",// ngày cập  nhật
}
export interface CommentDTO {
    [CommentFields.CONTENT]: string; // nội dung comment
    [CommentFields.PROJECT_FUND_ID]: string; // nội dung comment
    [CommentFields.USER_ID]: string; // nội dung comment
}