import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { handleCheckSuccessResponse } from "@/shared/constants/base.constants";
import { memo, useEffect, useState } from "react";
import { ProjectFundContentAndListAcitve } from "../../interfaces/ProjectFundContentAndList.enum";
import "./ProjectFundContentAndList.scss";
import { getImgCommon } from "@/shared/user-const";
import {
  FaEnvelope,
  FaHeart,
  FaLocationArrow,
  FaPhone,
  FaRegHeart,
} from "react-icons/fa";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import LibTable from "@/shared/libraries/lib-table-component/LibTable";
import { ProjectFundContentAndListConst } from "../../constants/ProjectFundContentAndList.const";
import LibCommentComponent from "@/shared/libraries/lib-comment-component/LibCommnet";
import { UserFields } from "@/app/modules/user-management/constants/User.interface";
import { Page } from "@/shared/ultils/Page";
import { getListDonates } from "../../services/ProjectFundContentAndList.service";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import LibBasePagination from "@/shared/libraries/LibBasePagination/LibBasePagination";
import { getDetailUserById } from "@/app/modules/user-management/services/User.services";

import { Link } from "react-router-dom";
import { EHeaderTabKey } from "@/app/layout/header-management/constants/Header.enum";
import { getCharityFund } from "@/app/modules/admin-modules/charity-fund-management/services/Charity-fund.services";
import {
  updateLike,
  updateUnLike,
} from "@/app/modules/admin-modules/project-fund-admin-management/services/Project-fund.services";
import { ProjectFundFields } from "@/app/modules/admin-modules/project-fund-admin-management/constants/Project-fund.interface";
import { CharityFundFields } from "@/app/modules/admin-modules/charity-fund-management/constants/charity-fund.interface";
import { debounce } from "lodash";
interface ProjectFundContentAndListProps {
  idFund: string;
  projectFundDescription: string;
  projectFundId: string | undefined;
  userId: string; // id của sứ giả
  projectFundListLike: any[];
  video?: string; // video
}
const ProjectFundContentAndList: React.FC<ProjectFundContentAndListProps> = ({
  idFund,
  projectFundDescription,
  projectFundId,
  userId,
  projectFundListLike,
  video,
}) => {
  const { setLoading, dataUser } = useContextCommon();
  const [dataDetailFund, setDataDetailFund] = useState<any>(); // dữ liệu detail quỹ

  /// danh sách list donate
  let pages: Page = new Page();
  const [page, setPages] = useState(pages); // page của table
  const [dataListDonates, setDataListDonates] = useState<ApiResponseTable>({
    currentPage: 1,
    datas: [],
    message: "",
    totalPages: 0,
    totalRecords: 0,
  }); // dữ liệu list donate
  const [activeTab, setActiveTab] = useState<ProjectFundContentAndListAcitve>(
    ProjectFundContentAndListAcitve.CONTENT
  ); // set tab nào đang active
  const [liked, setLiked] = useState<boolean>(
    projectFundListLike &&
      projectFundListLike?.includes(dataUser?.[UserFields?.ID])
  ); // like project fund
  const [countLike, setCountLike] = useState<number>(
    projectFundListLike?.length ?? 0
  ); // số lượng like
  const [dataUserInfo, setDataUserInfo] = useState(null); // thông tin sứ giả
  const columnTable = ProjectFundContentAndListConst.coloumnTable; // column table của danh sách ủng hộ
  // CALL API DETAIL 1 quỹ
  const handleCallApiFundDetail = async (idFund: string) => {
    setLoading(true);
    const res: any = await getCharityFund(idFund);
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      const data = res?.data?.data;
      setDataDetailFund(data);
    }
  };
  // set active tab
  const handleChangeContentList = (value: ProjectFundContentAndListAcitve) => {
    setActiveTab(value);
  };
  // call api list donate
  const handleCallApiDonateList = async (
    page: Page,
    projectFundId: string,
    valueSearch: string = ""
  ) => {
    setLoading(true);
    const res: any = await getListDonates(page, projectFundId, valueSearch);
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      setDataListDonates(res?.data);
    }
  };
  // get detail của user sứ giả
  const handleCallApiDetailUser = async (idUser: string) => {
    setLoading(true);
    const res: any = await getDetailUserById(idUser);
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      const data = res?.data?.data;
      setDataUserInfo(data);
    } else {
      setDataUserInfo(null);
    }
  };
  // change page table
  const handleChangePage = (event: any, newPage: any) => {
    setPages({
      ...page,
      pageNumber: newPage,
    });
  };
  // search
  const onChangeSearch = debounce((value: any) => {
    const valueSearch = value.target.value;
    if (projectFundId) {
      handleCallApiDonateList(page, projectFundId, valueSearch);
    }
  }, 1000);
  // set like
  const handleClickSetLike = async () => {
    // like
    if (!liked) {
      setLoading(true);
      await updateLike(projectFundId ?? "", dataUser?.[UserFields.ID] ?? "");
      setLoading(false);
      setCountLike((pre) => pre + 1);
      //unike
    } else {
      setLoading(true);
      await updateUnLike(projectFundId ?? "", dataUser?.[UserFields.ID] ?? "");
      setLoading(false);
      setCountLike((pre) => pre - 1);
    }
    setLiked(!liked);
  };
  useEffect(() => {
    if (idFund) {
      handleCallApiFundDetail(idFund);
    }
  }, [idFund]);
  useEffect(() => {
    if (projectFundId) {
      handleCallApiDonateList(page, projectFundId);
    }
  }, [page, projectFundId]);
  useEffect(() => {
    if (userId) {
      handleCallApiDetailUser(userId);
    }
  }, [userId]);

  return (
    <div>
      <div className="container p-5  project-fund-content-list">
        <div className="content-listDonate">
          <div className="box-content-list">
            <div
              className={`box-content-item ${
                activeTab === ProjectFundContentAndListAcitve.CONTENT
                  ? "active-box-content-item"
                  : ""
              }`}
              onClick={() =>
                handleChangeContentList(ProjectFundContentAndListAcitve.CONTENT)
              }
            >
              Nội dung
            </div>
            <div
              className={`box-content-item ${
                activeTab === ProjectFundContentAndListAcitve.LIST
                  ? "active-box-content-item"
                  : ""
              }`}
              onClick={() =>
                handleChangeContentList(ProjectFundContentAndListAcitve.LIST)
              }
            >
              Danh sách ủng hộ
            </div>
          </div>
        </div>
        {/* content fund */}
        {activeTab === ProjectFundContentAndListAcitve.CONTENT && (
          <LazyLoadComponent>
            {" "}
            <div className="container p-0">
              <div className="row body-content">
                <div className="col-12 col-sm-12 col-md-12 col-lg-8 justified-content mb-4">
                  <div
                    className="mb-3 d-flex align-items-center"
                    style={{
                      gap: "10px",
                      userSelect: "none",
                      cursor: "pointer",
                      // borderBottom: "1px solid #ccc",
                      paddingBottom: "10px",
                    }}
                    onClick={
                      dataUser?.[UserFields.ID] ? handleClickSetLike : () => {}
                    }
                  >
                    {liked || !dataUser?.[UserFields.ID] ? (
                      <FaHeart fontSize={60} color="red" />
                    ) : (
                      <FaRegHeart fontSize={60} />
                    )}

                    <div style={{ fontSize: "24px" }}>{countLike ?? 0}</div>
                  </div>
                  {/* hiển thị video */}
                  {video && (
                    <div>
                      <video
                        className="video-table"
                        style={{
                          width: "100%", // Điều chỉnh kích thước video cho phù hợp
                          // height: "70px",
                          objectFit: "cover", // Cắt video nếu cần thiết để không bị mờ
                        }}
                        src={getImgCommon(video[0])}
                        controls // Hiển thị các điều khiển video (play, pause, volume, v.v.)
                        autoPlay={false} // Tùy chọn tự động phát, bạn có thể thay đổi nếu cần
                      />
                    </div>
                  )}

                  {/* ==== */}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: projectFundDescription ?? "",
                    }}
                    style={{ overflow: "hidden" }}
                  ></div>
                  <div>
                    <LibCommentComponent
                      userId={dataUser?.[UserFields.ID] ?? ""}
                      projectFundId={projectFundId ?? ""}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 fund-content">
                  {dataUserInfo && (
                    <div className="div-fund-content mb-3">
                      <h4>Sứ giả gây quỹ</h4>
                      <div
                        className="d-flex align-items-center gap-3"
                        style={{ gap: "10px" }}
                      >
                        <div className="info-user">
                          <img
                            src={getImgCommon(
                              dataUserInfo?.[UserFields.AVATAR]
                            )}
                          />
                        </div>
                        <div className="info-user">
                          <span>{dataUserInfo?.[UserFields.FULL_NAME]}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {dataDetailFund && (
                    <div className="div-fund-content">
                      <div>
                        <h4>Thông tin tổ chức quỹ</h4>
                      </div>
                      <div className="container" style={{ gap: "10px" }}>
                        <Link
                          to={`/${EHeaderTabKey.DETAIL_FUND}/${
                            dataDetailFund?.[ProjectFundFields.ID]
                          }`}
                          className="row"
                          style={{ gap: "10px" }}
                        >
                          <div className="img-fund-content">
                            <img
                              src={getImgCommon(
                                dataDetailFund?.[CharityFundFields.IMAGES]
                              )}
                            />
                          </div>
                          <div>
                            <span style={{ color: "black", fontSize: "22px" }}>
                              {dataDetailFund?.[CharityFundFields.NAME]}
                            </span>
                          </div>
                        </Link>
                      </div>
                      <div>
                        <span>
                          {`${dataDetailFund?.[CharityFundFields.DESCRIPTION]}`}
                        </span>
                      </div>
                      <ul
                        className="d-flex flex-column"
                        style={{ gap: "10px" }}
                      >
                        <li className="d-flex align-items-center item-info-fund">
                          <div className="d-flex align-items-center">
                            <FaLocationArrow />
                          </div>
                          <span className="text-info-fund ">
                            {dataDetailFund?.[CharityFundFields.ADDRESS]}
                          </span>
                        </li>
                        <li className="d-flex align-items-center item-info-fund">
                          <div className="d-flex align-items-center">
                            <FaEnvelope />
                          </div>
                          <span className="text-info-fund ">
                            {dataDetailFund?.[CharityFundFields.EMAIL]}
                          </span>
                        </li>
                        <li className="d-flex align-items-center item-info-fund">
                          <div className="d-flex align-items-center">
                            <FaPhone />
                          </div>
                          <span className="text-info-fund hotline">
                            {dataDetailFund?.[CharityFundFields.PHONE]}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              {/* COMMENT */}
            </div>
          </LazyLoadComponent>
        )}
        {/* list donate */}
        {activeTab === ProjectFundContentAndListAcitve.LIST && (
          <LazyLoadComponent>
            <div className="container project-fund-content-list w-100 p-0">
              <LibTable
                columns={columnTable}
                data={dataListDonates?.datas}
                onChangeSearch={onChangeSearch}
              />
              {dataListDonates.datas &&
                dataListDonates.totalRecords > page.perPageOptions[0] && (
                  <LibBasePagination
                    totalPage={dataListDonates.totalPages}
                    onClick={(event, newPage) =>
                      handleChangePage(event, newPage)
                    }
                    totalRecords={dataListDonates.totalRecords}
                    pageNumber={page.pageNumber}
                  />
                )}
            </div>
          </LazyLoadComponent>
        )}
      </div>
    </div>
  );
};

export default memo(ProjectFundContentAndList);
