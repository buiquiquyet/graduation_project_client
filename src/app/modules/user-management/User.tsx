import { MyContext } from "@/App";
import "./User.scss";
import { useContext, useEffect, useState } from "react";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { UserFields } from "./constants/User.interface";
import UserEdit from "./pages/user-edit-management/User-edit";
import { FaCamera } from "react-icons/fa";
import BaseDialogFile from "@/shared/component/base-dialog-file/BaseDialogFile";

export default function User() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  // check useContext
  const { dataUser } = useContextCommon();
  // cập nhật avatar user
  const updateAvatarUser = async () => {
    
  }
  const [listFileNames, setListFileNames] = useState([] as any[]);
  const [isopenDialogFile, setIsOpenDialogFile] = useState(false);
  const handleIsHidenDialogFile = () => {
    setListFileNames([]);
    setIsOpenDialogFile(!isopenDialogFile);
  };
  const handleIsOpenDialogFile = () => {
    setIsOpenDialogFile(!isopenDialogFile);
  };
  const handleFileListChange = (newFileList: any[]) => {
    setListFileNames(newFileList);
  };
  useEffect(() => {}, [dataUser]);
  return (
    <div className="user-container">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div
            style={{
              backgroundImage: `url(${publicUrl + "/images/avatar.png"})`,
            }}
            className="user-head"
          >
            <span className="user-name">
              {dataUser && dataUser?.[UserFields.FULL_NAME]}
            </span>
            <div className="camera-user" onClick={() => handleIsOpenDialogFile()}>
              <FaCamera size={30} color="black" />
            </div>
          </div>
        </div>
        <UserEdit />
        {/* tải file avater */}
        {isopenDialogFile && (
        <BaseDialogFile
          fileList={listFileNames}
          onClickHideDialog={handleIsHidenDialogFile}
          onChange={handleFileListChange}
          onSubmit={updateAvatarUser}
          titleUploadFile="Chọn ảnh đại diện tải lên"
        />
      )}
      </div>
    </div>
  );
}
