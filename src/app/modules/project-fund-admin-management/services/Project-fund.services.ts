import { BuildParams } from "@/shared/ultils/BuildParams";
import { Page } from "@/shared/ultils/Page";
import { customRequest } from "@/shared/ultils/request";
import { TabListProjectFund } from "../constants/Project-fund.enum";

const apiCommon = "project-fund";
// createa thông tin người dùng
export const createProjectFund = async (body: any) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("POST", `/${apiCommon}`, body, {
      "Content-Type": "multipart/form-data",
    });

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// get list các quỹ
export const getListProjectFunds = async (page: Page, filterTabList?: TabListProjectFund) => {
  let additionalParams = { filterType: filterTabList}; 
  let params = BuildParams.Params(page,additionalParams);
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", `/${apiCommon}${params}`);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};

// get 1 các quỹ
export const getProjectFund = async (idFund: string) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", `/${apiCommon}/${idFund}`);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// update thông tin quỹ
export const updateProjectFund = async (id: string, body: any) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("PUT", `/${apiCommon}/${id}`, body, {
      "Content-Type": "multipart/form-data",
    });

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};

// xoá nhiều quỹ
export const deleteProjectFunds = async (ids: any[]) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "DELETE",
      `/${apiCommon}/deleteByIds`,
      JSON.stringify(ids),
      {
        "Content-Type": "application/json",
      }
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
