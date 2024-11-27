import { MyContext } from "@/App";
import "./User.scss";
import { useContext, useState } from "react";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { UserFields } from "./constants/User.interface";
import UserEdit from "./pages/user-edit-management/User-edit";
import { FaCamera } from "react-icons/fa";
import BaseDialogFile from "@/shared/component/base-dialog-file/BaseDialogFile";
import { getImgCommon } from "@/shared/user-const";
import ImageModal from "@/shared/libraries/gallery-component/Gallery";
import { updateAvatarUser, validateToken } from "./services/User.services";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
export default function User() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  // check useContext
  const { dataUser, setDataUser } = useContextCommon();
  const [listFileNames, setListFileNames] = useState([] as any[]);
  const [isopenDialogFile, setIsOpenDialogFile] = useState(false);

  // ẩn  dialog
  const handleIsHidenDialogFile = () => {
    setListFileNames([]);
    setIsOpenDialogFile(!isopenDialogFile);
  };
  // hiển thị dialog
  const handleIsOpenDialogFile = () => {
    setIsOpenDialogFile(!isopenDialogFile);
  };
  // cập nhật list file
  const handleFileListChange = (newFileList: any[]) => {
    setListFileNames(newFileList);
  };
  // render hình ảnh avatar
  const getAvatarUser = (dataUser: any) => {
    if (dataUser?.[UserFields?.AVATAR]) {
      return getImgCommon(dataUser?.[UserFields?.AVATAR]);
    }
    return publicUrl + "/images/avatar.png";
  };
  // cập nhật avatar user
  const onSubmitUpdateAvatarUser = async () => {
    if (listFileNames && listFileNames?.length > 0) {
      // data request
      const formData = new FormData();
      formData.append(UserFields.AVATAR, listFileNames[0].originFileObj);
      // gọi api
      const res: any = await updateAvatarUser(
        dataUser?.[UserFields.ID] ?? "",
        formData
      );
      if (handleResponseInterceptor(res)) {
        handleIsHidenDialogFile()
        const token = localStorage.getItem("token");
        if (token) {
          const res: any = await validateToken(token);
          const data = res?.data?.data;
          if (!data?.error) {
            setDataUser(data?.dataUser);
            return;
          } else {
            setDataUser(null);
            
          }
          return;
        }
      }
    }
  };
  return (
    <div className="user-container">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div
            style={{
              backgroundImage: `url(${getAvatarUser(dataUser)})`,
            }}
            className="user-head"
          >
            <div className="image-modal">
              <ImageModal imgSrcList={[getAvatarUser(dataUser)]}></ImageModal>
            </div>
            <span className="user-name">
              {dataUser && dataUser?.[UserFields.FULL_NAME]}
            </span>
            <div
              className="camera-user"
              onClick={() => handleIsOpenDialogFile()}
            >
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
            onSubmit={onSubmitUpdateAvatarUser}
            titleUploadFile="Chọn ảnh đại diện tải lên"
          />
        )}
      </div>
    </div>
  );
}
