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
  return config.FILE_URL + avatar?.replace(/\s/g, '%20');

  return config.FILE_URL + encodeURI(avatar);
  return config.FILE_URL + avatar;

  return `${JSON.stringify(config.FILE_URL + avatar)}`;
  // return config.FILE_URL + encodeURIComponent(avatar);
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
// convert từ image vd .jpg sang định dạng file upload
export const mockFileData = (fileName: string) => {
  // Tạo UID duy nhất cho mỗi file (cải tiến để đảm bảo uniqueness)
  const uid = `rc-upload-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}`;
  const now = new Date();

  // Giả lập kích thước file ngẫu nhiên (50,000 đến 150,000 bytes)
  const size = Math.floor(Math.random() * 100000) + 50000;

  // Tạo một Blob trống (nội dung của file)
  const fileContent = new Blob([], { type: "image/jpeg" });

  // Tạo một đối tượng File từ Blob
  const originFileObj = new File([fileContent], fileName, {
    type: "image/jpeg",
    lastModified: now.getTime(),
  });

  // Trả về đối tượng file giả lập với các thuộc tính
  return {
    uid: uid, // Gán uid duy nhất
    lastModified: now.getTime(), // Thời gian lastModified
    lastModifiedDate: now.toISOString(), // Chuyển thành ISO string
    name: fileName, // Tên file
    size: size, // Kích thước giả lập
    type: "image/jpeg", // Loại file giả lập
    percent: 0, // Tỷ lệ tải lên (0% khi mới bắt đầu)
    originFileObj: originFileObj, // Tạo file từ Blob
    status: "uploading", // Trạng thái tải lên
    url: `${config.FILE_URL}${fileName}`, // Đường dẫn giả lập
  };
};
// chuyển đổi tiền tệ
export const formatCurrency = (amount: number | string): string | number => {
  if (!amount) return "0đ";
  // Chuyển số thành chuỗi
  let amountStr = amount.toString();

  // Sử dụng biểu thức chính quy để thêm dấu chấm phân cách hàng nghìn
  amountStr = amountStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Thêm ký hiệu "đ" vào cuối chuỗi
  return amountStr + "đ";
};
