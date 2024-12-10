import { EHeaderTabKey } from "@/app/layout/header-management/constants/Header.enum";
import { TabListProjectFund } from "@/app/modules/project-fund-admin-management/constants/Project-fund.enum";
import { ProjectFundFields } from "@/app/modules/project-fund-admin-management/constants/Project-fund.interface";
import { getListProjectFunds } from "@/app/modules/project-fund-admin-management/services/Project-fund.services";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { handleCheckSuccessResponse } from "@/shared/constants/base.constants";
import LibBasePagination from "@/shared/libraries/LibBasePagination/LibBasePagination";
import LibCategoryAbsolute from "@/shared/libraries/LibCategoryAbsolute/LibCategoryAbsolute";
import { Page } from "@/shared/ultils/Page";
import { formatCurrency, getImgCommon } from "@/shared/user-const";
import { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default memo(function DetailFundProject() {
  const { setLoading } = useContextCommon();
  const { fundId } = useParams();
  const [activeTab, setAcitveTab] = useState<TabListProjectFund>(
    TabListProjectFund.IN_PROCESSING
  );
  const pages: Page = new Page();
  const [dataProjectFunds, setDataProjectFunds] = useState<ApiResponseTable>({
    currentPage: 1,
    datas: [],
    message: "",
    totalPages: 0,
    totalRecords: 0,
  }); // data trả về
  const [page, setPages] = useState(pages); // page của table
  const handleChangeTabActive = (
    tab: TabListProjectFund,
    fundId: string | undefined
  ) => {
    setAcitveTab(tab);
    if (fundId) {
      handleCallApiProjectFundsList(page, tab, fundId); // gọi api khi thay đổi tab list
    }
  };
  // call api get list dự án
  const handleCallApiProjectFundsList = async (
    page: Page,
    activeTab: TabListProjectFund,
    fundId: string
  ) => {
    setLoading(true);

    const res: any = await getListProjectFunds(page, activeTab, fundId);
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
    if (fundId) {
      handleCallApiProjectFundsList(page, activeTab, fundId);
    }
  }, [page, fundId]);
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
            handleChangeTabActive(TabListProjectFund.IN_PROCESSING, fundId)
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
          onClick={() =>
            handleChangeTabActive(TabListProjectFund.ENDED, fundId)
          }
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
      <div className="container">
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
                            parseFloat(item?.[ProjectFundFields.PERCENT]) ?? 0
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
                        <span style={{ color: "#f86f2d", fontWeight: "bold" }}>
                          {formatCurrency(
                            item?.[ProjectFundFields.CURRENT_AMOUNT] ?? 0
                          )}
                        </span>
                        <span style={{ color: "#F9153E" }}>
                          {item?.[ProjectFundFields.PERCENT]}%
                        </span>
                      </div>

                      <div className="cost-slide w-100">
                        <span style={{ color: "#696969", fontSize: "16px" }}>
                          với mục tiêu{" "}
                        </span>{" "}
                        <span style={{ color: "black", fontWeight:'bold' }}>
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
                onClick={(event, newPage) => handleChangePage(event, newPage)}
                totalRecords={dataProjectFunds.totalRecords}
                pageNumber={page.pageNumber}
              />
            )}
        </div>
      </div>
    </section>
  );
});
