import { customRequest } from "@/shared/ultils/request";

const apiCommon = "payment";
export const createPayment = async (body: any) => {
  try {
    // Gọi customRequest với phương thức POST, đường dẫn, body và headers
    const response = await customRequest(
      "POST",
      `/${apiCommon}/createPaymentUrl`,
      body,
        //   {
        //   "Content-Type": "application/json",
        // }
    //     JSON.stringify(body),
    //   {
    //     "Content-Type": "application/json",
    //   }
    );

    return response; // Trả về response chứa status và data
  } catch (error) {
    // Ném ra lỗi đã xử lý từ customRequest
    throw error; // Truyền lỗi lên trên để xử lý tiếp
  }
};
// export const getPayment = async () => {
//   try {
//     // Gọi customRequest với phương thức POST, đường dẫn, body và headers
//     const response = await customRequest(
//       "GET",
//       `/${apiCommon}/paymentCallback`,
      
//       //     {
//       //     "Content-Type": "multipart/form-data",
//       //   }
//     );

//     return response; // Trả về response chứa status và data
//   } catch (error) {
//     // Ném ra lỗi đã xử lý từ customRequest
//     throw error; // Truyền lỗi lên trên để xử lý tiếp
//   }
// };
export const getPayment = async (amount: string, orderInfo: string, orderId: string) => {
    try {
      // Tạo query string từ tham số đầu vào
      const params = new URLSearchParams({
        amount: amount,
        orderInfo: orderInfo,
        orderId: orderId
      });
  
      // Gọi customRequest với phương thức GET, đường dẫn, và query string
      const response = await customRequest(
        "GET",
        `/${apiCommon}/paymentCallback?${params.toString()}`,
        {
          // Nếu cần headers, có thể thêm vào đây, ví dụ:
          "Accept": "application/json",
        }
      );
  
      return response; // Trả về response chứa status và data
    } catch (error) {
      // Ném ra lỗi đã xử lý từ customRequest
      throw error; // Truyền lỗi lên trên để xử lý tiếp
    }
  };
  