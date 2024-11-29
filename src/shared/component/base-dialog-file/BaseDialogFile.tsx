import React from "react";
import "./BaseDialogFile.scss";
import BaseDialog from "./BaseDialog";
// import { BaseIframe } from "./BaseIframe";
import BaseButton from "../base-button/BaseButton";
import BaseFileUpload from "./BaseFileUpload";
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
  return (
    <BaseDialog
      style={{ width: "500px" }}
      onClickHideDialog={onClickHideDialog}
    >
      <div className="base-dialog-file">
        <span>{titleUploadFile}</span>
        {/* component upload file */}
        <BaseFileUpload
          onChange={onChange}
          fileList={fileList}
          imgLength={imgLength}
        />
        {/* button submit */}
        <BaseButton
          disabled={fileList?.length === 0}
          title={titleButtonSubmit}
          onClick={onSubmit}
        />
      </div>
    </BaseDialog>
  );
};

export default BaseDialogFile;
