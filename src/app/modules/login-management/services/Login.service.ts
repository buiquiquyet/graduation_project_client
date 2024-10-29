import  { customRequest } from "@/shared/ultils/request";

// tạo mã xác thực gmail
export const createVerificationEmail = async (email: string) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest('POST', '/registerAuth/create', email , {
      'Content-Type': 'application/json', // Định nghĩa headers nếu cần
    });

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
