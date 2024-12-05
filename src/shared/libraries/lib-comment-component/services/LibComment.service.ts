
import { BuildParams } from "@/shared/ultils/BuildParams";
import { Page } from "@/shared/ultils/Page";
import { customRequest } from "@/shared/ultils/request";

const apiCommon = "comment";
// createa thông tin người dùng
export const createComment = async (body: any) => {
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
export const getListComments = async (page: Page, projectFundId?: string) => {

  let params = BuildParams.Params(page);
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("GET", `/${apiCommon}/byProjectFundId/${projectFundId}/${params}`);

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// xoá comment
export const deleteComment = async (id: string) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "DELETE",
      `/${apiCommon}/${id}`,
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// // get 1 các quỹ
// export const getProjectFund = async (idFund: string) => {
//   try {
//     // Gọi customRequest với phương thức POST, đường dẫn, body và headers
//     const response = await customRequest("GET", `/${apiCommon}/${idFund}`);

//     return response; // Trả về response chứa status và data
//   } catch (error) {
//     // Ném ra lỗi đã xử lý từ customRequest
//     throw error; // Truyền lỗi lên trên để xử lý tiếp
//   }
// };
// // update thông tin quỹ
// export const updateProjectFund = async (id: string, body: any) => {
//   try {
//     // Gọi customRequest với phương thức POST, đường dẫn, body và headers
//     const response = await customRequest("PUT", `/${apiCommon}/${id}`, body, {
//       "Content-Type": "multipart/form-data",
//     });

//     return response; // Trả về response chứa status và data
//   } catch (error) {
//     // Ném ra lỗi đã xử lý từ customRequest
//     throw error; // Truyền lỗi lên trên để xử lý tiếp
//   }
// };


