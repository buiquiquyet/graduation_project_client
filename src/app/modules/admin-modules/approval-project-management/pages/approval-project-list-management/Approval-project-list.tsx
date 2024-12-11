import LibTable from "@/shared/libraries/lib-table-component/LibTable";

import { memo, useEffect, useState } from "react";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";

import { Page } from "@/shared/ultils/Page";
import "./Approval-project-list.scss";
import BaseButton from "@/shared/component/base-button/BaseButton";
import {
  handleCheckSuccessResponse,
  handleResponseInterceptor,
} from "@/shared/constants/base.constants";
import LibBasePagination from "@/shared/libraries/LibBasePagination/LibBasePagination";


import { ApprovalProjectConst } from "../../constants/Approval-project-const";
import { addIdRowProjectFund } from "@/shared/reducer/project-fund-slice/ProjectFundSlice";
import { useDispatch } from "react-redux";
import { Select } from "antd";
import { TabListProjectFundProcessing, UpdateApprovalStatusDTO, UpdateApprovalStatusFields } from "@/app/modules/user-modules/project-fund-user-management/constants/Project-fund-user.enum";
import { ProjectFundProcessingListConst } from "@/app/modules/user-modules/project-fund-user-management/constants/Project-fund-user-list.const";
import { getListProjectFundsProcessing, updateStatusProjectFundProcessing } from "@/app/modules/user-modules/project-fund-user-management/services/Project-fund-user.services";

const { Option } = Select;
export default memo(function ApprovalProjectListComponent() {
  const { setLoading } = useContextCommon();
  const dispatch = useDispatch(); // action redux
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
  const columnTable = ProjectFundProcessingListConst.columnProjectFund; // column table
  // call api get list dự án
  const handleCallApiProjectFundsList = async (
    page: Page,
    filterTabList: TabListProjectFundProcessing
  ) => {
    setLoading(true);
    const res: any = await getListProjectFundsProcessing(page, filterTabList);
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
      const dataRequest: UpdateApprovalStatusDTO = {
        [UpdateApprovalStatusFields.IDS]: rowIdSelects,
        [UpdateApprovalStatusFields.IS_APPROVED]: selectOptionStatus, // trạng thái duyệt
      };
      const res: any = await updateStatusProjectFundProcessing(dataRequest);
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        handleCallApiProjectFundsList(page, tabList)
        setRowIdSelects([])
      }
    }
  };
  // khi click vào 1 row
  const onRowClick = async (idRow: string) => {
    if (idRow !== rowId) {
      setRowId(idRow);
      dispatch(addIdRowProjectFund(idRow));
    }
  };
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
    handleCallApiProjectFundsList(page, tabList); // gọi api khi thay đổi tab list
  };
  // set state options status
  const onChangeSelectOptionStatus = (value: TabListProjectFundProcessing) => {
    setSelectOptionStatus(value);
  };
  useEffect(() => {
    if (page) {
      handleCallApiProjectFundsList(page, tabList);
    }
  }, [page]);

  return (
    <div className="tab-list-project-fund-approvaL">
      <div className="container  pt-5 pb-5">
        <div className="user-info" style={{ textAlign: "center" }}>
          <div className="user-label">
            <h3 className="w-100">Các dự án</h3>
          </div>

          <div className="w-100">
            <div className="w-100 mb-4 d-flex align-item-start tab-active-box ">
              {ApprovalProjectConst.tabTabeList.map(
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
                  data={
                    dataProjectFundsProcessing &&
                    dataProjectFundsProcessing.datas
                  }
                  rowIdSelects={rowIdSelects}
                  setRowIdSelects={setRowIdSelects}
                  onRowClick={onRowClick}
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
