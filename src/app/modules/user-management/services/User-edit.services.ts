import { customRequest } from "@/shared/ultils/request";

// lấy thông tin thành phố
export const getCitys = async () => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "GET",
      `https://open.oapi.vn/location/provinces?page=0&size=1000`
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// lấy thông tin quận huyện
export const getDistricts = async (provinceId?: string | number) => {
  const url = provinceId
    ? `https://open.oapi.vn/location/districts/${provinceId}?page=0&size=64`
    : `https://open.oapi.vn/location/districts?page=0&size=999`;
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", url);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// lấy thông tin phường xã
export const getWards = async (districtId?: string | number, page?: number, size?: number) => {
  const url = districtId
    ? `https://open.oapi.vn/location/wards/${districtId}?page=0&size=64`
    : `https://open.oapi.vn/location/wards?page=${page}&size=${size}`;
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", url);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
