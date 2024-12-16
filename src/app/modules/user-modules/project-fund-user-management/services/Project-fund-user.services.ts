import { BuildParams } from "@/shared/ultils/BuildParams";
import { Page } from "@/shared/ultils/Page";
import { customRequest } from "@/shared/ultils/request";
import {
  TabListProjectFundProcessing,
  UpdateApprovalStatusDTO,
} from "../constants/Project-fund-user.enum";

const apiCommon = "project-fund-processing";
// createa thông tin người dùng
export const createProjectFundProcessing = async (body: any) => {
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
export const getListProjectFundsProcessing = async (
  page: Page,
  filterTabList?: TabListProjectFundProcessing,
  userId: string = "",
  searchValue: string = ""
) => {
  let additionalParams: any = { filterType: filterTabList, searchValue };
  if (userId) {
    additionalParams = { ...additionalParams, userId };
  }
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

// get 1  dự án
export const getProjectFundProcessing = async (idFund: string) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", `/${apiCommon}/${idFund}`);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// update thông tin dự án
export const updateProjectFundProcessing = async (id: string, body: any) => {
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
// update trạng thái  dự án
export const updateStatusProjectFundProcessing = async (
  body: UpdateApprovalStatusDTO
) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "PUT",
      `/${apiCommon}/update-approval-status`,
      body,
      {
        "Content-Type": "multipart/form-data",
      }
    );
    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// xoá nhiều dự án
export const deleteProjectFundsProcessing = async (ids: any[]) => {
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
