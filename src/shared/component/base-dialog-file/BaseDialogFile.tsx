import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./BaseDialogFile.scss";
import config from "@/shared/ultils/config";
import BaseDialog from "./BaseDialog";
import { BaseIframe } from "./BaseIframe";
import BaseButton from "../base-button/BaseButton";
import ImgCrop from "antd-img-crop";
interface Props {
  titleUploadFile?: string; // title tiêu đề
  fileList: any[]; // mảng list file
  onClickHideDialog: () => void; // đóng dialog
  onChange: (fileList: any[]) => void; // Thêm phương thức để cập nhật danh sách file
  imgLength?: number; // số ảnh tải lên
  titleButtonSubmit?: string; // title button
  onSubmit: () => void; // hàm submit file
}

const BaseDialogFile: React.FC<Props> = ({
  fileList,
  onClickHideDialog,
  onChange,
  imgLength = 1,
  titleButtonSubmit,
  onSubmit,
  titleUploadFile = "Tải ảnh lên",
}) => {
 
  const onPreview = async (file: any) => {
    BaseIframe.openIframe(file, file.url);
  };
  const typeImg = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  // Hàm kiểm tra file trước khi tải lên
  const beforeUpload = (file: any) => {
    const isValid = typeImg.includes(file.type);
    return isValid;
  };

  // Cập nhật fileList khi có thay đổi (khi người dùng tải lên hoặc xóa file)
  const handleFileChange = (info: any) => {
    const updatedFileList = info.fileList.map((file: any) => ({
      uid: file.uid,
      name: file.name,
      // status: file.status,
      status: 'done',
      url: file.originFileObj
        ? URL.createObjectURL(file.originFileObj)
        : `${config.FILE_URL}${file.name}`,
    }));
    onChange(updatedFileList); // Gọi lại onChange để cập nhật file list từ bên ngoài
  };

  // Xử lý sự kiện xóa file
  const handleRemove = (file: any) => {
    // Khi xóa file, gọi lại onChange để cập nhật danh sách file mới
    const updatedFileList = fileList.filter((f) => f.uid !== file.uid);
    onChange(updatedFileList);
  };
  
  return (
    <BaseDialog
      style={{ width: "500px" }}
      onClickHideDialog={onClickHideDialog}
    >
      <div className="base-dialog-file">
        <span>{titleUploadFile}</span>
        <ImgCrop rotationSlider>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card" // Hiển thị như thẻ hình ảnh
            //   fileList={fileList.map((file: any) => ({
            //     uid: file.uid || file.Id,
            //     name: file.name || file.ten,
            //     url: file.originFileObj ? null : `${config.FILE_URL}${file.ten}`,
            //     ...file,
            //     status: file.status || "error",
            //   }))}

            fileList={fileList}
            onPreview={onPreview}
            onChange={handleFileChange}
            beforeUpload={beforeUpload} // Kiểm tra loại file
            accept=".png,.jpg,.jpeg,.webp,.gif" // Cho phép tải lên ảnh và file pdf
            maxCount={imgLength} // Giới hạn chỉ được chọn một ảnh
            onRemove={handleRemove} // Xử lý sự kiện xóa file
          >
            <Button icon={<UploadOutlined />}></Button>
          </Upload>
        </ImgCrop>
        <BaseButton title={titleButtonSubmit} onClick={onSubmit} />
      </div>
    </BaseDialog>
  );
};

export default BaseDialogFile;
