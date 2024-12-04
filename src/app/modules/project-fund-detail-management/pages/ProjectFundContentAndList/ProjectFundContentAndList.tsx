import { getCharityFund } from "@/app/modules/charity-fund-management/services/Charity-fund.services";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { handleCheckSuccessResponse } from "@/shared/constants/base.constants";
import { useEffect, useState } from "react";
import { ProjectFundContentAndListAcitve } from "../../interfaces/ProjectFundContentAndList.enum";
import "./ProjectFundContentAndList.scss";
import { CharityFundFields } from "@/app/modules/charity-fund-management/constants/charity-fund.interface";
import { getImgCommon } from "@/shared/user-const";
import { FaLocationArrow, FaMailBulk, FaPhone } from "react-icons/fa";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import LibTable from "@/shared/libraries/lib-table-component/LibTable";
import { ProjectFundContentAndListConst } from "../../constants/ProjectFundContentAndList.const";
import LibCommentComponent from "@/shared/libraries/lib-comment-component/LibCommnet";
interface ProjectFundContentAndListProps {
  idFund: string;
  projectFundDescription: string;
}
const ProjectFundContentAndList: React.FC<ProjectFundContentAndListProps> = ({
  idFund,
  projectFundDescription,
}) => {
  const { setLoading } = useContextCommon();
  const [dataDetailFund, setDataDetailFund] = useState<any>(); // dữ liệu detail quỹ
  const [activeTab, setActiveTab] = useState<ProjectFundContentAndListAcitve>(
    ProjectFundContentAndListAcitve.CONTENT
  ); // set tab nào đang active

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
  useEffect(() => {
    if (idFund) {
      handleCallApiFundDetail(idFund);
    }
  }, [idFund]);
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
                    dangerouslySetInnerHTML={{
                      __html: projectFundDescription ?? "",
                    }}
                    style={{ overflow: "hidden" }}
                  ></div>
                  <div>
                    <LibCommentComponent />
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-12 col-lg-4 fund-content">
                  {dataDetailFund && (
                    <div className="div-fund-content">
                      <div>
                        <span>Thông tin tổ chức quỹ</span>
                      </div>
                      <div className="container" style={{ gap: "10px" }}>
                        <div className="row" style={{ gap: "10px" }}>
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
                        </div>
                      </div>
                      <div>
                        <span>
                          {`${dataDetailFund?.[CharityFundFields.DESCRIPTION]}`}
                        </span>
                      </div>
                      <ul>
                        <li className="d-flex align-items-center item-info-fund">
                          <div>
                            <FaLocationArrow />
                          </div>
                          <span className="text-info-fund ">
                            {dataDetailFund?.[CharityFundFields.ADDRESS]}
                          </span>
                        </li>
                        <li className="d-flex align-items-center item-info-fund">
                          <div>
                            <FaMailBulk />
                          </div>
                          <span className="text-info-fund ">
                            {dataDetailFund?.[CharityFundFields.EMAIL]}
                          </span>
                        </li>
                        <li className="d-flex align-items-center item-info-fund">
                          <div>
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
              <LibTable columns={columnTable} data={[dataDetailFund]} />
            </div>
          </LazyLoadComponent>
        )}
      </div>
    </div>
  );
};

export default ProjectFundContentAndList;
