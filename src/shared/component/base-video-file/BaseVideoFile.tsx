import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { memo } from "react";
import {
  ToastMessage,
  ToastStatus,
} from "@/shared/libraries/message-log-component/MessageLog";

interface BaseVideoFileUploadProps {
  fileList: any[]; // mảng list file
  onChange: (fileList: any[]) => void; // Thêm phương thức để cập nhật danh sách file
  videoLength?: number; // số video tải lên
}

const BaseVideoFileUpload: React.FC<BaseVideoFileUploadProps> = ({
  fileList,
  onChange,
  videoLength = 1,
}) => {
  // Danh sách các loại file video hợp lệ
  const typeVideo = [
    "video/mp4",
    "video/avi",
    "video/mov",
    "video/wmv",
    "video/flv",
    "video/mkv",
    "video/quicktime",
  ];

  // Hàm xử lý khi thay đổi file
  const handleFileChange = ({ fileList: newFileList }: any) => {
    onChange(newFileList); // Cập nhật file list từ bên ngoài
  };

  // Xử lý sự kiện xóa file
  const handleRemove = (file: any) => {
    const updatedFileList = fileList.filter((f) => f.uid !== file.uid);
    onChange(updatedFileList); // Cập nhật danh sách file sau khi xóa
  };

  // Kiểm tra file trước khi tải lên
  const beforeUpload = (file: any) => {
    const isValid = typeVideo.includes(file.type); // Kiểm tra nếu file là video hợp lệ
    if (!isValid) {
      onChange([]);
      ToastMessage.show(
        ToastStatus.error,
        "Sai định dạng video! Định dạng cho phép '.mp4, .avi, .mov, .wmv, .flv, .mkv'"
      ); // Thông báo nếu file không hợp lệ
    }
    return isValid;
  };

  return (
    <Upload
      listType="picture-card" // Hiển thị dưới dạng thẻ hình ảnh (có thể thay đổi)
      fileList={
        fileList?.length > 0
          ? fileList.map((file: any) => ({
              uid: file?.uid || file?.Id,
              name: file?.name || file?.ten,
              url: file?.originFileObj
                ? URL.createObjectURL(file.originFileObj)
                : file?.url, // Đảm bảo url đúng nếu có
              ...file,
              status: "done", // Đảm bảo trạng thái là "done"
            }))
          : []
      }
      onChange={handleFileChange}
      beforeUpload={beforeUpload} // Kiểm tra loại file
      accept=".mp4,.avi,.mov,.wmv,.flv,.mkv" // Chỉ chấp nhận video
      maxCount={videoLength} // Giới hạn số lượng video tải lên
      onRemove={handleRemove} // Xử lý khi xóa file
    >
      <Button icon={<UploadOutlined />}> Video</Button> {/* Nút upload video */}
    </Upload>
  );
};

export default memo(BaseVideoFileUpload);
