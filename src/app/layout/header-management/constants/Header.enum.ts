export enum EHeaderTab {
    HOME = 1, // trang chủ
    ABOUT, // về chúng tôi
    INSTRUCT, // hướng dẫn
    BLOG, // các bài viết
    CONTACT, // liên lạc
    LOGIN, // đăng ký, đăng nhập
    ROLE, // cá nhân
    PROJECT_FUND, // trang admin tạo bài đăng
    PROJECT_FUND_USER, // trang user tạo bài đăng
    CHARITY_FUND, // trang các quỹ đầu tư
    CATEGORY, // danh mục loại từ thiện vd: trẻ enm, ý tế
    PROJECT_FUND_DETAIL, // danh mục loại từ thiện vd: trẻ enm, ý tế
    APPROVAL_PROJECT, // duyệt dự án
    DETAIL_FUND, // xem chi tiết quỹ
    ADMIN_USER, // quản lý người dùng
}
export enum EHeaderTabText {
    HOME = "Trang chủ", // trang chủ
    ABOUT = "Giới thiệu", // về chúng tôi
    INSTRUCT = "Hướng dẫn", // hướng dẫn
    BLOG = "Dự án", // các bài viết
    CONTACT = "Liên hệ", // liên lạc
    LOGIN = "Đăng ký / Đăng nhập", // đăng ký đăng nhập
    LOGOUT = "Đăng xuất", // đăng xuất
    ROLE = "Cá nhân", // trang người dùng
    PROJECT_FUND = "Quản lý dự án", // dự án của admin
    PROJECT_FUND_USER = "Dự án sứ giả", // dự án của sứ giả
    CHARITY_FUND = "Quỹ đầu tư", // trang các quỹ đầu tư
    CATEGORY = "Danh mục", // trang các quỹ đầu tư
    APPROVAL_PROJECT = "Duyệt dự án ", // duyệt dự án
    DETAIL_FUND = "Xem chi tiết quỹ", // xem chi tiết quỹ
    ADMIN_USER = "Quản lý người dùng", // quản lý người dùng
}
export enum EHeaderTabKey {
    HOME = "", // trang chủ
    ABOUT = "about", // về chúng tôi
    CAUSES = "causes", // nguyên nhân
    INSTRUCT = "instruct", // hướng dẫn
    BLOG = "blog", // các bài viết
    CONTACT = "contact", // liên lạc
    LOGIN = "login", //  đăng nhập
    SIGN_IN = "sign-in", // đăng ký 
    ROLE = "role",
    PROJECT_FUND = "project-fund",
    PROJECT_FUND_USER = "project-fund-user",
    CHARITY_FUND = "charity-fund",
    CATEGORY = "category",
    PROJECT_FUND_DETAIL = "project-fund-detail",
    APPROVAL_PROJECT = "approval-project",
    DETAIL_FUND = "detail-fund", 
    ADMIN_USER = "admin-user", // quản lý người dùng
}
