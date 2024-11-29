import { useState } from "react";
import "./Charity-fund.scss";
import BaseDialogFile from "@/shared/component/base-dialog-file/BaseDialogFile";
import CharityFundEdit from "./pages/charity-fund-edit-management/Charity-fund-edit";
import CharityFundList from "./pages/charity-fund-list-management/Charity-fund-list";
export default function CharityFund() {
  // const context = useContext(MyContext);
  // if (!context) {
  //   return null;
  // }
  // const { publicUrl } = context;
  // check useContext
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

  // cập nhật avatar user
  const onSubmitUpdateAvatarUser = async () => {
    // if (listFileNames && listFileNames?.length > 0) {
    //   // data request
    //   const formData = new FormData();
    //   formData.append(UserFields.AVATAR, listFileNames[0].originFileObj);
    //   // gọi api
    //   // const res: any = await updateAvatarUser(
    //   //   dataUser?.[UserFields.ID] ?? "",
    //   //   formData
    //   // );
    //   // if (handleResponseInterceptor(res)) {
    //   //   handleIsHidenDialogFile()
    //   //   const token = localStorage.getItem("token");
    //   //   if (token) {
    //   //     const res: any = await validateToken(token);
    //   //     const data = res?.data?.data;
    //   //     if (!data?.error) {
    //   //       setDataUser(data?.dataUser);
    //   //       return;
    //   //     } else {
    //   //       setDataUser(null);
    //   //     }
    //   //     return;
    //   //   }
    //   // }
    // }
  };
  return (
    <div className="charity-fund-management">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div>
            <h1>Danh sách các quỹ đầu tư</h1>
          </div>
        </div>
        <div className="container row d-flex">
          <div className="col-12 col-sm-12 col-md-12 col-lg-4">
            <CharityFundEdit />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-8">
            <CharityFundList />
          </div>
        </div>
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
