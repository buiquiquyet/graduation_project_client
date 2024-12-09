import { customRequest } from "@/shared/ultils/request";

const apiCommon = "statistics";
//lấy thông tin chung về dự án : số dự án, số quỹ, số sứ giả, tổng donate
export const getFundsStatistics = async () => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", `/${apiCommon}`,);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};

//lấy thông tin chung về của 1 quỹ : số dự án, số người donate, số sứ giả, tổng donate, list user của quỹ
export const getDetaukFundsStatistics = async (fundId: string) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", `/${apiCommon}/detailFund/${fundId}`,);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};