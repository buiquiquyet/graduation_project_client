import { memo, useEffect, useState } from "react";
import "./Blog.scss";
import { TabListProjectFund } from "../project-admin-management/constants/Project-fund.enum";
import { Link } from "react-router-dom";
import { EHeaderTabKey } from "@/app/layout/header-management/constants/Header.enum";
import LibCategoryAbsolute from "@/shared/libraries/LibCategoryAbsolute/LibCategoryAbsolute";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { Page } from "@/shared/ultils/Page";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { getListProjectFunds } from "../project-admin-management/services/Project-fund.services";
import { handleCheckSuccessResponse } from "@/shared/constants/base.constants";
import { ProjectFundFields } from "../project-admin-management/constants/Project-fund.interface";
import { formatCurrency, getImgCommon } from "@/shared/user-const";
import LibBasePagination from "@/shared/libraries/LibBasePagination/LibBasePagination";
// dự án
function BlogComponent() {
  const { setLoading } = useContextCommon();
  const [dataProjectFunds, setDataProjectFunds] = useState<ApiResponseTable>({
    currentPage: 1,
    datas: [],
    message: "",
    totalPages: 0,
    totalRecords: 0,
  }); // data trả về
  const pages: Page = new Page();
  const [page, setPages] = useState(pages); // page của table
  const [activeTab, setAcitveTab] = useState<TabListProjectFund>(
    TabListProjectFund.IN_PROCESSING
  );
  const handleChangeTabActive = (tab: TabListProjectFund) => {
    setAcitveTab(tab);
    handleCallApiProjectFundsList(page, tab); // gọi api khi thay đổi tab list
  };
  // call api get list dự án
  const handleCallApiProjectFundsList = async (
    page: Page,
    activeTab: TabListProjectFund
  ) => {
    page = { ...page, pageSize: page.perPageOptions[0] };
    setLoading(true);
    
    const res: any = await getListProjectFunds(page, activeTab);
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      setDataProjectFunds(res?.data);
    } else {
      setDataProjectFunds({
        currentPage: 1,
        datas: [],
        message: "",
        totalPages: 0,
        totalRecords: 0,
      });
    }
  };
  // thay đổi page
  const handleChangePage = (event: any, newPage: any) => {
    setPages({
      ...page,
      pageNumber: newPage,
    });
  };
  useEffect(() => {
    handleCallApiProjectFundsList(page, activeTab);
  }, [page]);
  return (
    <div className="blog-component">
      <div className="d-flex flex-column" style={{ gap: "50px" }}>
        <section className="">
          <div className="d-flex justify-content-between ">
            <div
              className={`d-flex align-items-center justify-content-center w-50 p-4 project-processing ${
                activeTab === TabListProjectFund.IN_PROCESSING
                  ? "active-header-project"
                  : ""
              }`}
              onClick={() =>
                handleChangeTabActive(TabListProjectFund.IN_PROCESSING)
              }
            >
              <h5>Dự án đang gây quỹ</h5>
            </div>
            <div
              className={`d-flex align-items-center justify-content-center w-50 p-4 project-processing ${
                activeTab === TabListProjectFund.ENDED
                  ? "active-header-project"
                  : ""
              }`}
              onClick={() => handleChangeTabActive(TabListProjectFund.ENDED)}
            >
              <h5>Dự án đã kết thúc</h5>
            </div>
          </div>
        </section>
        {/* list dự án */}
        <section className="list-project-fund mb-5">
          <div className="container">
            <div className="mb-5 d-flex flex-column align-items-center">
              <h1 className="text-body">
                {activeTab === TabListProjectFund.ENDED
                  ? "Các dự án đã kết thúc gây quỹ"
                  : "Các dự án đang gây quỹ"}
              </h1>
              <h4 className="text-subBody">
                Hãy lựa chọn dự án trong lĩnh vực mà bạn quan tâm nhất
              </h4>
            </div>
            <div className="row">
              {dataProjectFunds.datas?.length > 0 ? (
                dataProjectFunds.datas?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4 px-3"
                  >
                    <div className="cause-entry ">
                      <div className="image-item ">
                        <Link
                          to={`/${EHeaderTabKey.PROJECT_FUND_DETAIL}/${
                            item?.[ProjectFundFields.ID]
                          }`}
                          className="img"
                          style={{
                            backgroundImage: `url(${getImgCommon(
                              item?.[ProjectFundFields.IMAGES][0]
                            )})`,
                          }}
                        />
                        <LibCategoryAbsolute
                          value={item?.[ProjectFundFields.CATEGORY_NAME]}
                        />
                        <div className="image-fund">
                          <img
                            src={getImgCommon(
                              item?.[ProjectFundFields.IMAGES_FUND]
                            )}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="text p-3 p-md-4">
                        <div className="mb-2 mt-2">
                          <Link
                            to={`/${EHeaderTabKey.PROJECT_FUND_DETAIL}/${
                              item?.[ProjectFundFields.ID]
                            }`}
                          >
                            <div className="mb-4 text-charity-fund w-100">
                              {item?.[ProjectFundFields.FUND_NAME]}
                            </div>
                          </Link>
                        </div>
                        <Link to={`/${EHeaderTabKey.PROJECT_FUND_DETAIL}`}>
                          <h3 className="text-project-fund w-100">
                            {item?.[ProjectFundFields.NAME]}
                          </h3>
                        </Link>
                        <span className="donation-time mb-3 d-block"></span>
                        <div className="progress custom-progress-success">
                          <div
                            className="progress-bar bg-primary"
                            role="progressbar"
                            style={{
                              width: `${
                                parseFloat(item?.[ProjectFundFields.PERCENT]) ??
                                0
                              }%`,
                            }}
                            aria-valuenow={
                              parseFloat(item?.[ProjectFundFields.PERCENT]) ?? 0
                            }
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <div className="fund-raised d-block w-100">
                          <div className="cost-slide w-100 d-flex justify-content-between">
                            <span
                              style={{ color: "#f86f2d", fontWeight: "bold" }}
                            >
                              {formatCurrency(
                                item?.[ProjectFundFields.CURRENT_AMOUNT] ?? 0
                              )}
                            </span>
                            <span style={{ color: "#F9153E" }}>
                              {item?.[ProjectFundFields.PERCENT]}%
                            </span>
                          </div>

                          <div className="cost-slide w-100">
                            <span
                              style={{ color: "#696969", fontSize: "16px" }}
                            >
                              với mục tiêu{" "}
                            </span>{" "}
                            <span style={{ color: "black" }}>
                              {formatCurrency(
                                item?.[ProjectFundFields.TARGET_AMOUNT]
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-100" style={{ padding: "15px" }}>
                  <h5 className="w-100  d-flex align-items-center" style={{fontWeight:'bold'}}>
                    Chưa có thông tin dự án.
                  </h5>
                </div>
              )}
              {/* pagination */}
              {dataProjectFunds.datas &&
             (
                <LibBasePagination
                  totalPage={dataProjectFunds.totalPages}
                  onClick={(event, newPage) => handleChangePage(event, newPage)}
                  totalRecords={dataProjectFunds.totalRecords}
                  pageNumber={page.pageNumber}
                  isShowTotalRecord={false}
                />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
export default memo(BlogComponent);
