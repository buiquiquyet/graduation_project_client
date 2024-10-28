import request from "@/shared/ultils/request";

// tạo mã xác thực gmail
export const createVerificationEmail = async (email: string) => {
  try {
    return await request.post(`/registerAuth/create`, email, {
      headers: {
          'Content-Type': 'application/json', 
      },
  });
  } catch (error) {
    throw Error;
  }
};
