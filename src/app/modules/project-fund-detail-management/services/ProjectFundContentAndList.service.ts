import { BuildParams } from "@/shared/ultils/BuildParams";
import { Page } from "@/shared/ultils/Page";
import { customRequest } from "@/shared/ultils/request";

const apiCommon = "payment";

// get list các donate
export const getListDonates = async (page: Page, projectFundId?: string) => {
  let params = BuildParams.Params(page);
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "GET",
      `/${apiCommon}/byProjectFundId/${projectFundId}/${params}`
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// get list 3 donate nhiều nhất
export const getTop3Donors = async () => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", `/${apiCommon}/top-donors`);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// export list các donate
export const exportListDonates = async (page: Page, projectFundId?: string) => {
  let params = BuildParams.Params(page);
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "GET",
      `/${apiCommon}/export-excel/${projectFundId}${params}`,
      null,
      null,
      "blob"
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
