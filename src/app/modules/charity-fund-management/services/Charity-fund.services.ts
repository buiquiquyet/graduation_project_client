import { BuildParams } from "@/shared/ultils/BuildParams";
import { Page } from "@/shared/ultils/Page";
import { customRequest } from "@/shared/ultils/request";

const apiCommon = "charity"
// update thông tin người dùng
export const createCharityFund = async ( body: any) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "POST",
      `/${apiCommon}`,
      (body),
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
// get list các quỹ
export const getListCharityFunds = async ( page: Page) => {
  const params = BuildParams.Params(page);
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "GET",
      `/${apiCommon}${params}`,
      
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};

// // update thông tin người dùng
// export const updateCharityFund = async (id: string, body: any) => {
//   try {
//     // Gọi customRequest với phương thức POST, đường dẫn, body và headers
//     const response = await customRequest(
//       "PUT",
//       `/${apiCommon}/${id}`,
//       JSON.stringify(body),
//       {
//         "Content-Type": "application/json", // Đảm bảo content-type là application/json
//       }
//     );

//     return response; // Trả về response chứa status và data
//   } catch (error) {
//     // Ném ra lỗi đã xử lý từ customRequest
//     throw error; // Truyền lỗi lên trên để xử lý tiếp
//   }
// };
// // update avatar người dùng
// export const updateAvatarUser = async (id: string, body: any) => {
//   try {
//     // Gọi customRequest với phương thức POST, đường dẫn, body và headers
//     const response = await customRequest(
//       "POST",
//       `/${apiCommon}/update-avatar/${id}`,
//       body,
//       {
//         "Content-Type": "multipart/form-data",
//       }
//     );

//     return response; // Trả về response chứa status và data
//   } catch (error) {
//     // Ném ra lỗi đã xử lý từ customRequest
//     throw error; // Truyền lỗi lên trên để xử lý tiếp
//   }
// };
