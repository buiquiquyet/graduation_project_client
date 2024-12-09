import { TabListProjectFund } from "@/app/modules/project-fund-admin-management/constants/Project-fund.enum";
import { formatCurrency } from "@/shared/user-const";
import { memo, useState } from "react";

export default memo(function DetailFundProject() {
  const [activeTab, setAcitveTab] = useState<TabListProjectFund>(
    TabListProjectFund.IN_PROCESSING
  );
  const handleChangeTabActive = (tab: TabListProjectFund) => {
    setAcitveTab(tab);
    // handleCallApiProjectFundsList(page, tab); // gọi api khi thay đổi tab list
  };
  return (
    <section className="list-project-fund  w-100 mt-3">
      <div
        className="d-flex justify-content-between mb-5"
        style={{ background: "rgb(224 231 237)" }}
      >
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
          <h4>Dự án đang gây quỹ</h4>
        </div>
        <div
          className={`d-flex align-items-center justify-content-center w-50 p-4 project-processing ${
            activeTab === TabListProjectFund.ENDED
              ? "active-header-project"
              : ""
          }`}
          onClick={() => handleChangeTabActive(TabListProjectFund.ENDED)}
        >
          <h4>Dự án đã kết thúc</h4>
        </div>
      </div>
      <div>
        <div className="mb-5 d-flex flex-column align-items-center">
          <h1 className="text-body">
            {activeTab === TabListProjectFund.ENDED
              ? "Kết thúc gây quỹ"
              : "Đang gây quỹ"}
          </h1>
        </div>
      </div>
      {/* <div className="row">
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
                  <h5
                    className="w-100  d-flex align-items-center"
                    style={{ fontWeight: "bold" }}
                  >
                    Chưa có thông tin dự án.
                  </h5>
                </div>
              )}
              {dataProjectFunds.datas &&
                dataProjectFunds.datas?.length > 0 &&
                dataProjectFunds.totalRecords > page.perPageOptions[0] && (
                  <LibBasePagination
                    totalPage={dataProjectFunds.totalPages}
                    onClick={(event, newPage) =>
                      handleChangePage(event, newPage)
                    }
                    totalRecords={dataProjectFunds.totalRecords}
                    pageNumber={page.pageNumber}
                  />
                )}
            </div> */}
    </section>
  );
});
