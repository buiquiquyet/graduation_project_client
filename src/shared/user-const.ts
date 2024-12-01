import { ItemLibSwitchInput } from "./enums/inputType.enum";
import config from "./ultils/config";

// update lại options của dropdown
export const updateOptionsFormInputs = (
  formInputs: ItemLibSwitchInput[],
  controlName: string,
  options: any[]
) => {
  return formInputs.map((item: ItemLibSwitchInput) => {
    if (item.value === controlName) {
      return {
        ...item,
        options: options, // Cập nhật options mới
      };
    }
    return item;
  });
};
// chuyển thành options label - value
export const convertToCommonOptions = (options: any[]) => {
  return options?.map((item: any) => {
    return {
      label: item?.name,
      value: item?.id ?? item?.Id,
    };
  });
};
// hàm lấy ảnh
export const getImgCommon = (avatar: string) => {
  return config.FILE_URL + avatar;
};
// hàm convert date
export const convertDate = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString); // Chuyển đổi chuỗi ISO thành đối tượng Date
  if (isNaN(date.getTime())) return ""; // Kiểm tra ngày hợp lệ

  const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày, đảm bảo 2 chữ số
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (tháng bắt đầu từ 0, nên cộng thêm 1)
  const year = date.getFullYear(); // Lấy năm

  const hours = String(date.getHours()).padStart(2, "0"); // Lấy giờ, đảm bảo 2 chữ số
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Lấy phút, đảm bảo 2 chữ số

  // Kiểm tra nếu chuỗi ban đầu có chứa giờ phút hay không
  const hasTime = dateString.includes("T");

  // Trả về định dạng tùy thuộc vào việc chuỗi có chứa giờ phút hay không
  if (hasTime) {
    return `${hours}h${minutes} ${day}/${month}/${year}`; // Trả về định dạng "hh:mm dd/mm/yyyy"
  } else {
    return `${day}/${month}/${year}`; // Trả về định dạng "dd/mm/yyyy"
  }
};


