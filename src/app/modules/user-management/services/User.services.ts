import { BuildParams } from "@/shared/ultils/BuildParams";
import { Page } from "@/shared/ultils/Page";
import { customRequest } from "@/shared/ultils/request";
import { TabListProjectFundProcessing } from "../../user-modules/project-fund-user-management/constants/Project-fund-user.enum";

const apiCommon = "user";
// xác thực gmail
export const validateToken = async (token: string) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "GET",
      `/${apiCommon}/validate?token=${token}`
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// update thông tin người dùng
export const updateUser = async (id: string, body: any) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("PUT", `/${apiCommon}/${id}`, body, {
      "Content-Type": "multipart/form-data", // Đảm bảo content-type là application/json
    });

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// update avatar người dùng
export const updateAvatarUser = async (id: string, body: any) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "POST",
      `/${apiCommon}/update-avatar/${id}`,
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
// lấy thông tin người dùng
export const getDetailUserById = async (idUser: string) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", `/${apiCommon}/${idUser}`);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// get list các người dùng
export const getListUsers = async (page: Page, searchValue: string = "") => {
  let additionalParams = {
    searchValue,
  };
  const params = BuildParams.Params(page, additionalParams);
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", `/${apiCommon}${params}`);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};

// get list lịch sử donate của người dùng
export const getDonatesByUserIdAsync = async (
  page: Page,
  userId: string = "",
  searchValue: string = ""
) => {
  let additionalParams = {
    userId,
    searchValue,
  };
  const params = BuildParams.Params(page, additionalParams);
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "GET",
      `/${apiCommon}/history-donate${params}`
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// xoá nhiều người dùng
export const deleteUsers = async (ids: any[]) => {
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

// get list các người duyệt sứ giả
export const getListUserEmissary = async (
  page: Page,
  isEmissaryApproved?: TabListProjectFundProcessing,
  searchValue: string = ""
) => {
  let additionalParams: any = { isEmissaryApproved, searchValue };
  additionalParams = { ...additionalParams };
  let params = BuildParams.Params(page, additionalParams);
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "GET",
      `/${apiCommon}/emissary${params}`
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// update người duyệt sứ giả
export const updateStatusUserEmissary = async (
  userIds: any[],
  newApprovalStatus: TabListProjectFundProcessing
) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "PUT",
      `/${apiCommon}/update-emissary`,
      {
        userIds,
        newApprovalStatus,
      }
    );
    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
