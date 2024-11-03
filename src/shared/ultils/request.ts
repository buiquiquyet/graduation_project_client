import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import config from "./config";

const request = axios.create({
  // baseURL: config.API_URL,
  baseURL: "https://localhost:7112/api",
  timeout: 100000,
});
export enum EAxiosResponse {
  STATUS = "status",
  DATA = "data",
  STATUS_TEXT = "statusText",
  HEADERS = "headers",
  CONFIG = "config",
  MESSAGE = "message",
}
export interface AxiosResponseObjDTO<Item> {
  [EAxiosResponse.STATUS]: any;
  [EAxiosResponse.DATA]: any;
  [EAxiosResponse.STATUS_TEXT]: any;
  [EAxiosResponse.HEADERS]: any;
  [EAxiosResponse.CONFIG]: any;
  [EAxiosResponse.MESSAGE]: any;
}
request.interceptors.response.use(
  (response: AxiosResponse) => ({
    [EAxiosResponse.STATUS]: response?.[EAxiosResponse.STATUS],
    [EAxiosResponse.DATA]: response?.[EAxiosResponse.DATA],
    [EAxiosResponse.STATUS_TEXT]: response?.[EAxiosResponse.STATUS_TEXT],
    [EAxiosResponse.HEADERS]: response?.[EAxiosResponse.HEADERS],
    [EAxiosResponse.CONFIG]: response?.[EAxiosResponse.CONFIG],
  }),
  (error) => {
    const { response } = error;
    return Promise.reject({
      status: response?.status || 500, // Nếu không có response, trả về 500
      data: response?.data || { error: "Có lỗi xảy ra. Vui lòng thử lại sau." },
    });
  }
);
export const customRequest = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body?: any,
  headers?: any
) => {
  const config: AxiosRequestConfig = {
    method,
    url,
    headers: {
      "Content-Type": "application/json", // Mặc định là application/json
      ...headers, // Thêm các headers tùy chỉnh
    },
    [EAxiosResponse.DATA]: body, // Dữ liệu cho body
  };

  try {
    const response = await request(config); // Gọi request với config đã định nghĩa

    // Trả về đối tượng có status và data
    return {
      [EAxiosResponse.STATUS]: response?.[EAxiosResponse.STATUS],
      [EAxiosResponse.DATA]: response?.[EAxiosResponse.DATA],
    };
  } catch (error: any) {
    return {
      [EAxiosResponse.STATUS]: error?.[EAxiosResponse.STATUS],
      [EAxiosResponse.DATA]: error?.[EAxiosResponse.DATA],
      [EAxiosResponse.MESSAGE]:
        error?.[EAxiosResponse.DATA]?.[EAxiosResponse.MESSAGE] ||
        error?.[EAxiosResponse.MESSAGE],
    };
  }
};

