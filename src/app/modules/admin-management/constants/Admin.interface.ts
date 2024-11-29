export enum CharityPost {
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

export interface CharityPostDTO {
    [CharityPost.ID]: string | null;
    [CharityPost.FUND_ID]: string | null; // Id của quỹ từ thiện
    [CharityPost.NAME]: string | null; // Tên dự án
    [CharityPost.IMAGES]: string | null; // Ảnh dự án
    [CharityPost.DESCRIPTION]: string | null; // Mô tả dự án
    [CharityPost.TARGET_AMOUNT]: number | null; // Số tiền cần quyên góp
    [CharityPost.CURRENT_AMOUNT]: number | null; // Số tiền đang có quyên góp
    [CharityPost.START_DATE]: Date | null; // Ngày bắt đầu chiến dịch
    [CharityPost.END_DATE]: Date | null; // Ngày kết thúc chiến dịch
}