
export enum CommentFields {
    CONTENT = "content",// nội dung comment
}
export interface CommentDTO {
    [CommentFields.CONTENT]: string; // nội dung comment
}