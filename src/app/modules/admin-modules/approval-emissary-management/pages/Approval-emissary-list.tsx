import LibTable from "@/shared/libraries/lib-table-component/LibTable";

import { memo, useEffect, useState } from "react";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";

import { Page } from "@/shared/ultils/Page";
import BaseButton from "@/shared/component/base-button/BaseButton";
import {
  handleCheckSuccessResponse,
  handleResponseInterceptor,
} from "@/shared/constants/base.constants";
import LibBasePagination from "@/shared/libraries/LibBasePagination/LibBasePagination";
import { Select } from "antd";
import { TabListProjectFundProcessing } from "@/app/modules/user-modules/project-fund-user-management/constants/Project-fund-user.enum";
import { ProjectFundProcessingListConst } from "@/app/modules/user-modules/project-fund-user-management/constants/Project-fund-user-list.const";
import { ApprovalEmissaryConst } from "../constants/Approval-emissary-const";
import { debounce } from "lodash";
import {
  getListUserEmissary,
  updateStatusUserEmissary,
} from "@/app/modules/user-management/services/User.services";

const { Option } = Select;
export default memo(function ApprovalEmissaryListComponent() {
  const { setLoading } = useContextCommon();
  const pages: Page = new Page();
  const [page, setPages] = useState(pages); // page của table
  const [dataProjectFundsProcessing, setDataProjectFundsProcessing] =
    useState<ApiResponseTable>({
      currentPage: 1,
      datas: [],
      message: "",
      totalPages: 0,
      totalRecords: 0,
    }); // data trả về

  const [rowIdSelects, setRowIdSelects] = useState<string[]>([]); // mảng id khi checkbox
  const [rowId, setRowId] = useState<string>(""); // id khi click vào 1 row
  const [selectOptionStatus, setSelectOptionStatus] =
    useState<TabListProjectFundProcessing>(
      TabListProjectFundProcessing.PROCESSING
    ); // id khi click vào 1 row
  const [tabList, setTabList] = useState<TabListProjectFundProcessing>(
    TabListProjectFundProcessing.PROCESSING
  ); // tab đang diễn ra và đã kết thúc
  const columnTable = ApprovalEmissaryConst.columnApprovalEmissary; // column table
  // call api get list người duyệt
  const handleCallApiUserEmissaryList = async (
    page: Page,
    filterTabList: TabListProjectFundProcessing,
    searchValue: string = ""
  ) => {
    setLoading(true);
    const res: any = await getListUserEmissary(
      page,
      filterTabList,
      searchValue
    );
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      setDataProjectFundsProcessing(res?.data);
    } else {
      setDataProjectFundsProcessing({
        currentPage: 1,
        datas: [],
        message: "",
        totalPages: 0,
        totalRecords: 0,
      });
    }
  };
  // hàm update status trạng thái duyệt
  const handleApproveProject = async () => {
    if (rowIdSelects?.length > 0) {
      setLoading(true);
      const res: any = await updateStatusUserEmissary(
        rowIdSelects,
        selectOptionStatus
      );
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        handleCallApiUserEmissaryList(page, tabList);
        setRowIdSelects([]);
      }
    }
  };
  // khi click vào 1 row
  const onRowClick = async (idRow: string) => {
    if (idRow !== rowId) {
      setRowId(idRow);
    }
  };
  // search
  const onChangeSearch = debounce((value: any) => {
    const valueSearch = value.target.value;
    handleCallApiUserEmissaryList(page, tabList, valueSearch);
  }, 1000);
  // change page table
  const handleChangePage = (event: any, newPage: any) => {
    setPages({
      ...page,
      pageNumber: newPage,
    });
  };
  // thay đổi tab list
  const handleChangeTabList = (tabList: TabListProjectFundProcessing) => {
    setTabList(tabList); // set thay đổi tab list
    handleCallApiUserEmissaryList(page, tabList); // gọi api khi thay đổi tab list
  };
  // set state options status
  const onChangeSelectOptionStatus = (value: TabListProjectFundProcessing) => {
    setSelectOptionStatus(value);
  };
  useEffect(() => {
    if (page) {
      handleCallApiUserEmissaryList(page, tabList);
    }
  }, [page]);

  return (
    <div className="tab-list-project-fund-approvaL">
      <div className="container  pt-5 pb-5">
        <div className="user-info" style={{ textAlign: "center" }}>
          <div className="w-100">
            <div className="w-100 mb-4 d-flex align-item-start tab-active-box ">
              {ApprovalEmissaryConst.tabTabeList.map(
                (item: any, index: number) => (
                  <h5
                    key={index}
                    className={`tab ${
                      tabList === item?.value ? "active-tab" : ""
                    }`}
                    onClick={() => handleChangeTabList(item?.value)}
                  >
                    {item?.label}
                  </h5>
                )
              )}
            </div>
            <div>
              {columnTable?.length > 0 && (
                <LibTable
                  columns={columnTable}
                  data={dataProjectFundsProcessing?.datas}
                  rowIdSelects={rowIdSelects}
                  setRowIdSelects={setRowIdSelects}
                  onRowClick={onRowClick}
                  onChangeSearch={onChangeSearch}
                />
              )}
            </div>
            <div>
              {dataProjectFundsProcessing.datas &&
                dataProjectFundsProcessing.totalRecords >
                  page.perPageOptions[0] && (
                  <LibBasePagination
                    totalPage={dataProjectFundsProcessing.totalPages}
                    onClick={(event, newPage) =>
                      handleChangePage(event, newPage)
                    }
                    totalRecords={dataProjectFundsProcessing.totalRecords}
                    pageNumber={page.pageNumber}
                  />
                )}
            </div>
          </div>
          <div className="d-flex mt-5" style={{ gap: "20px" }}>
            <div className="d-flex align-items-center" style={{ gap: "10px" }}>
              <h5>Trạng thái</h5>
              <div style={{ width: "150px" }}>
                <Select
                  className="w-100"
                  value={selectOptionStatus}
                  onChange={(value: any) => {
                    onChangeSelectOptionStatus(value);
                  }}
                >
                  {ProjectFundProcessingListConst?.tabTabeList?.map(
                    (option: any, index: number) => (
                      <Option key={index} value={option?.value}>
                        {option?.label}
                      </Option>
                    )
                  )}
                </Select>
              </div>
            </div>
            <div>
              <BaseButton
                disabled={rowIdSelects?.length === 0}
                title="Duyệt"
                onClick={handleApproveProject}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
