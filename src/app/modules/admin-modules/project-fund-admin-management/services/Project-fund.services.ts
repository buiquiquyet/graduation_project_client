import { BuildParams } from "@/shared/ultils/BuildParams";
import { Page } from "@/shared/ultils/Page";
import { customRequest } from "@/shared/ultils/request";
import {
  LikeProjectFundFields,
  TabListProjectFund,
} from "../constants/Project-fund.enum";

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
// get list các dự án
export const getListProjectFunds = async (
  page: Page,
  filterTabList?: TabListProjectFund,
  fundId?: string
) => {
  let additionalParams = { filterType: filterTabList, fundId: fundId ?? null };
  let params = BuildParams.Params(page, additionalParams);
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
// update like người dùng
export const updateLike = async (projectFundId: string, userId: string) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("POST", `/${apiCommon}/like`, {
      [LikeProjectFundFields.PROJECT_FUND_ID]: projectFundId,
      [LikeProjectFundFields.USER_ID]: userId,
    });

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// update unlike người dùng
export const updateUnLike = async (projectFundId: string, userId: string) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("POST", `/${apiCommon}/unlike`, {
      [LikeProjectFundFields.PROJECT_FUND_ID]: projectFundId,
      [LikeProjectFundFields.USER_ID]: userId,
    });

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
