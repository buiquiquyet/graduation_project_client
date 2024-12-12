import config from "@/shared/ultils/config";
import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { UploadOutlined } from "@ant-design/icons";
import { memo } from "react";
import {
  ToastMessage,
  ToastStatus,
} from "@/shared/libraries/message-log-component/MessageLog";

interface BaseFileUploadProps {
  fileList: any[]; // mảng list file
  onChange: (fileList: any[]) => void; // Thêm phương thức để cập nhật danh sách file
  imgLength?: number; // số ảnh tải lên
}
const BaseFileUpload: React.FC<BaseFileUploadProps> = ({
  fileList,
  onChange,
  imgLength = 1,
}) => {
  const typeImg = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/jpg",
  ];
  const handleFileChange = ({ fileList: newFileList }: any) => {
    // const updatedFileList = info.fileList.map((file: any) => ({
    //   uid: file.uid,
    //   name: file.name,
    //   // status: file.status,
    //   status: 'done',
    //   url: file.originFileObj
    //     ? URL.createObjectURL(file.originFileObj)
    //     : `${config.FILE_URL}${file.name}`,
    // }));
    onChange(newFileList); // Gọi lại onChange để cập nhật file list từ bên ngoài
  };
  // Xử lý sự kiện xóa file
  const handleRemove = (file: any) => {
    // Khi xóa file, gọi lại onChange để cập nhật danh sách file mới
    const updatedFileList = fileList.filter((f) => f.uid !== file.uid);
    onChange(updatedFileList);
  };
  // const onPreview = async (file: any) => {
  //   BaseIframe.openIframe(file, file.url);
  // };
  // Hàm kiểm tra file trước khi tải lên
  const beforeUpload = (file: any) => {
    const isValid = typeImg.includes(file.type);
    if (!isValid) {
      onChange([]);
      ToastMessage.show(
        ToastStatus.error,
        "Sai định dạng ảnh! Định dạng cho phép '.jpg, .png, .gif, .webp, .jpeg'"
      ); // Thông báo nếu file không hợp lệ
    }
    return isValid;
  };
  return (
    <ImgCrop rotationSlider>
      <Upload
        // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card" // Hiển thị như thẻ hình ảnh
        fileList={
          fileList && !fileList?.includes(undefined) && fileList?.length > 0
            ? fileList?.map((file: any) => ({
                uid: file?.uid || file?.Id,
                name: file?.name || file?.ten,
                url: file?.originFileObj
                  ? null
                  : `${config.FILE_URL}${file?.ten ?? file}`,
                ...file,
                status: "done",
              }))
            : []
        }
        // fileList={fileList}
        // onPreview={onPreview}
        onChange={handleFileChange}
        beforeUpload={beforeUpload} // Kiểm tra loại file
        accept=".png,.jpg,.jpeg,.webp,.gif"
        maxCount={imgLength} // Giới hạn chỉ được chọn một ảnh
        onRemove={handleRemove} // Xử lý sự kiện xóa file
      >
        <Button icon={<UploadOutlined />}></Button>
      </Upload>
    </ImgCrop>
  );
};
export default memo(BaseFileUpload);
