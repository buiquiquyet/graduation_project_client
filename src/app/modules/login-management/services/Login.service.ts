import { customRequest } from "@/shared/ultils/request";
import { UsersDTO } from "../../user-management/constants/User.interface";
// import CryptoJS from "crypto-js";

const defaultApi = "/registerAuth"
export const secretKey: string = "secretKey_project_graduration"; // secret mã hoá pasword
// function encryptPassword(password: string) {
//   // Tạo IV ngẫu nhiên
//   const iv = CryptoJS.lib.WordArray.random(16);

//   // Mã hóa mật khẩu
//   const encrypted = CryptoJS.AES.encrypt(
//     password,
//     CryptoJS.enc.Utf8.parse(secretKey),
//     {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     }
//   );

//   // Kết hợp IV và ciphertext
//   const cipherText =
//     iv.toString(CryptoJS.enc.Base64) +
//     ":" +
//     encrypted.ciphertext.toString(CryptoJS.enc.Base64);
//   return cipherText;
// }

// tạo mã xác thực gmail
export const createVerificationEmail = async (body: {
  email: string;
  passWord: string;
}) => {
  const newBody = {
    ...body,
    // passWord: await encryptPassword(body.passWord),
    passWord: body.passWord,
  };
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "POST",
      `${defaultApi}/create`,
      JSON.stringify(newBody),
      {
        "Content-Type": "application/json", // Định nghĩa headers nếu cần
      }
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};

// xác thực gmail
export const verificationEmail = async (email: string, code: string) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest("POST", `${defaultApi}/verify`, {
      email,
      code,
    });

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};

// xác thực gmail
export const login = async (body: { email: string; passWord: string }) => {
  const newBody = {
    ...body,
    // passWord: await encryptPassword(body.passWord),
    passWord: body.passWord,
  };
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "POST",
      `${defaultApi}/login`,
      JSON.stringify(newBody)
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};

// login với google
export const loginWithGoogle = async ( user: UsersDTO) => {
 
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "POST",
      `${defaultApi}/loginWithGoogle`, user
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
