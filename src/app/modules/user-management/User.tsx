import { MyContext } from "@/App";
import "./User.scss";
import { memo, useContext, useEffect, useState } from "react";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { UserFields, UserTabActive } from "./constants/User.interface";
import UserEdit from "./pages/user-edit-management/User-edit";
import { FaCamera } from "react-icons/fa";
import BaseDialogFile from "@/shared/component/base-dialog-file/BaseDialogFile";
import { getImgCommon } from "@/shared/user-const";
import ImageModal from "@/shared/libraries/gallery-component/Gallery";
import {
  getDonatesByUserIdAsync,
  updateAvatarUser,
  validateToken,
} from "./services/User.services";
import {
  handleCheckSuccessResponse,
  handleResponseInterceptor,
} from "@/shared/constants/base.constants";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import LibTable from "@/shared/libraries/lib-table-component/LibTable";
import { columnHistoryDonate } from "./constants/User.const";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { Page } from "@/shared/ultils/Page";
import { debounce } from "lodash";
import LibBasePagination from "@/shared/libraries/LibBasePagination/LibBasePagination";
import { TabListProjectFundProcessing } from "../user-modules/project-fund-user-management/constants/Project-fund-user.enum";
import { RoleUser } from "@/helper/ContextCommon/ContextCommon.enum";
export default memo(function UserComponent() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  // check useContext
  const { dataUser, setDataUser, setLoading } = useContextCommon();
  const [listFileNames, setListFileNames] = useState([] as any[]); // file
  const [isopenDialogFile, setIsOpenDialogFile] = useState(false); // bật hiển thị dialog
  const [activeTab, setAcitveTab] = useState<UserTabActive>(
    UserTabActive.PERSON
  ); // tab active
  const [dataHistoryListDonate, setDataHistoryListDonate] =
    useState<ApiResponseTable>({
      currentPage: 1,
      datas: [],
      message: "",
      totalPages: 0,
      totalRecords: 0,
    }); // data trả về lịch sử donate
  const pages: Page = new Page();
  const [page, setPages] = useState(pages); // page của table
  const columnListHistoryDonate = columnHistoryDonate; // column lịch sử donate người dùng
  const arrStatusApproval = [
    TabListProjectFundProcessing.APPROVED,
    TabListProjectFundProcessing.PROCESSING,
    TabListProjectFundProcessing.REJECTED,
  ]; // trạng thái giờ duyệt sứ giả
  const handleChangeTextStatus = (status: TabListProjectFundProcessing) => {
    if (status === TabListProjectFundProcessing.APPROVED)
      return {
        class: "approved",
        text: "Bạn đã trở thành sứ giả, hãy tạo dự án mới!",
      };
    if (status === TabListProjectFundProcessing.PROCESSING)
      return { class: "processing", text: "Đang chờ quản trị viên duyệt!" };
    if (status === TabListProjectFundProcessing.REJECTED)
      return { class: "rejected", text: "Đề nghị của bạn bị từ chối!" };
    return { class: "success-emissary" };
  };
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
      return dataUser?.[UserFields?.AVATAR];
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
        handleIsHidenDialogFile();
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
  // call api get list lịch sử donate
  const handleCallApiHistoryDonateList = async (
    page: Page,
    userId: string,
    searchValue: string = ""
  ) => {
    setLoading(true);
    const res: any = await getDonatesByUserIdAsync(page, userId, searchValue);
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      setDataHistoryListDonate(res?.data);
    } else {
      setDataHistoryListDonate({
        currentPage: 1,
        datas: [],
        message: "",
        totalPages: 0,
        totalRecords: 0,
      });
    }
  };
  // search
  const onChangeSearch = debounce((value: any) => {
    if (dataUser) {
      const valueSearch = value.target.value;
      handleCallApiHistoryDonateList(
        page,
        dataUser[UserFields.ID],
        valueSearch
      );
    }
  }, 1000);
  const handleChangeTabActive = (tab: UserTabActive) => {
    setAcitveTab(tab);
    // handleCallApiProjectFundsList(page, tab); // gọi api khi thay đổi tab list
  };
  const handleChangePage = (event: any, newPage: any) => {
    setPages({
      ...page,
      pageNumber: newPage,
    });
  };
  useEffect(() => {
    if (dataUser) {
      handleCallApiHistoryDonateList(page, dataUser[UserFields.ID]);
    }
  }, [page, dataUser]);
  return (
    <div className="user-management">
      <div className="user-wrapper">
        <LazyLoadComponent>
          <section className="">
            <div className="d-flex justify-content-between ">
              <div
                className={`d-flex align-items-center justify-content-center w-50 p-4 project-processing ${
                  activeTab === UserTabActive.PERSON
                    ? "active-header-project"
                    : ""
                }`}
                onClick={() => handleChangeTabActive(UserTabActive.PERSON)}
              >
                <h5>Thông tin cá nhân</h5>
              </div>
              <div
                className={`d-flex align-items-center justify-content-center w-50 p-4 project-processing ${
                  activeTab === UserTabActive.HISTORY
                    ? "active-header-project"
                    : ""
                }`}
                onClick={() => handleChangeTabActive(UserTabActive.HISTORY)}
              >
                <h5>Lịch sử ủng hộ</h5>
              </div>
            </div>
          </section>
        </LazyLoadComponent>
        {/* thông tin cá nhan */}
        {activeTab === UserTabActive.PERSON && (
          <>
            {dataUser &&
              dataUser?.[UserFields.IS_EMISSARY] &&
              dataUser?.[UserFields.ROLE] !==
                RoleUser.ADMIN && (
                  <div
                    className={`box-become-emissary ${
                      handleChangeTextStatus(
                        dataUser?.[UserFields.IS_EMISSARY_APPROVED]
                      )?.class
                    }`}
                  >
                    {!arrStatusApproval.includes(
                      dataUser?.[UserFields.IS_EMISSARY_APPROVED]
                    ) ? (
                      <h5 className="become-emissary">
                        Bạn đã đủ điều kiện để trở thành sứ giả, cập nhật thông
                        tin cá nhân để được phê duyệt!
                      </h5>
                    ) : (
                      <h5 className="become-emissary">
                        {
                          handleChangeTextStatus(
                            dataUser?.[UserFields.IS_EMISSARY_APPROVED]
                          )?.text
                        }
                      </h5>
                    )}
                  </div>
                )}
            <div className="user-avatar">
              <div
                style={{
                  backgroundImage: `url(${getImgCommon(
                    getAvatarUser(dataUser)
                  )})`,
                }}
                className="user-head"
              >
                <div className="image-modal">
                  <ImageModal
                    imgSrcList={[getAvatarUser(dataUser)]}
                  ></ImageModal>
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
          </>
        )}
        {activeTab === UserTabActive.HISTORY && (
          <div className="container">
            <div>
              {columnListHistoryDonate.length > 0 && (
                <LibTable
                  columns={columnListHistoryDonate}
                  data={dataHistoryListDonate?.datas}
                  onChangeSearch={onChangeSearch}
                />
              )}
            </div>
            <div>
              {dataHistoryListDonate.datas &&
                dataHistoryListDonate.totalRecords > page.perPageOptions[0] && (
                  <LibBasePagination
                    totalPage={dataHistoryListDonate.totalPages}
                    onClick={(event, newPage) =>
                      handleChangePage(event, newPage)
                    }
                    totalRecords={dataHistoryListDonate.totalRecords}
                    pageNumber={page.pageNumber}
                  />
                )}
            </div>
          </div>
        )}

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
});
