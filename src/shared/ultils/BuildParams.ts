import queryString from "query-string";
import { Page } from "./Page";
export class BuildParams {
  public static Params(
    page?: Page,
    additionalParams: { [key: string]: any } = {}
  ): string {
    const params: { [key: string]: any } = {
      page: page?.pageNumber?.toString(),
      size: page?.pageSize?.toString(),
    };

    // Kết hợp các params mặc định với các tham số bổ sung
    const combinedParams = { ...params, ...additionalParams };

    // Trả về chuỗi query string
    return "?" + queryString.stringify(combinedParams);
  }
  public static getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  public static setLocalStorage(key: string, data: any) {
    localStorage.setItem(key, data);
  }
  public static removeLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
  public static isLocation(pathName: string) {
    return location.pathname.includes(pathName);
  }
  public static starWith(pathName: string) {
    return location.pathname.startsWith(pathName);
  }
  public static compare(pathName: string) {
    return location.pathname === pathName;
  }
  public static commonItemsOf2Arr(originalArray: any[], arr2: any[]) {
    const newArr = originalArray.filter((item1: any) =>
      arr2.some((item2: any) => item1.Id === item2.Id)
    );
    return newArr;
  }
}
