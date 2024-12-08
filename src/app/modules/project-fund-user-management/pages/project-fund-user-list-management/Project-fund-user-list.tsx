import LibTable from "@/shared/libraries/lib-table-component/LibTable";

import { memo, useEffect, useState } from "react";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import {
  deleteProjectFundsProcessing,
  getListProjectFundsProcessing,
} from "../../services/Project-fund-user.services";
import { Page } from "@/shared/ultils/Page";
import { ProjectFundProcessingListConst } from "../../constants/Project-fund-user-list.const";
import "./Project-fund-user-list.scss";
import BaseButton from "@/shared/component/base-button/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { ReducerProjectFund } from "@/shared/redux/selector";

import {
  handleCheckSuccessResponse,
  handleResponseInterceptor,
} from "@/shared/constants/base.constants";
import { InitProjectFund } from "@/shared/reducer/project-fund-slice/InitProjectFundProps";
import {
  addIdRowProjectFund,
  addIsDelSuccessProjectFund,
  addIsEditProjectFund,
} from "@/shared/reducer/project-fund-slice/ProjectFundSlice";
import { TabListProjectFundProcessing } from "../../constants/Project-fund-user.enum";
import LibBasePagination from "@/shared/libraries/LibBasePagination/LibBasePagination";
import { UserFields } from "@/app/modules/user-management/constants/User.interface";

export default memo(function ProjectFundList() {
  const { setLoading, dataUser } = useContextCommon();
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

  const reducerProjectFund = useSelector(ReducerProjectFund); // redux dự án
  const dispatch = useDispatch(); // action redux

  const [rowIdSelects, setRowIdSelects] = useState<string[]>([]); // mảng id khi checkbox
  const [rowId, setRowId] = useState<string>(""); // id khi click vào 1 row
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
    const res: any = await getListProjectFundsProcessing(
      page,
      filterTabList,
      dataUser?.[UserFields.ID]
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
  // call api xóa dự án
  const handleCallApiProjectFundsDeletes = async () => {
    if (rowIdSelects?.length > 0) {
      setLoading(true);
      const res: any = await deleteProjectFundsProcessing(rowIdSelects);
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        // set lại redux của biến button success để gọi lại list và cập nhật lại form edit
        if (
          rowIdSelects?.includes(reducerProjectFund?.[InitProjectFund.ID_ROW])
        ) {
          dispatch(addIsDelSuccessProjectFund(true));
        } else {
          handleCallApiProjectFundsList(page, tabList);
        }

        setRowIdSelects([]);
      }
    }
  };
  // khi click vào 1 row
  const onRowClick = async (idRow: string) => {
    if (idRow !== rowId || !reducerProjectFund?.[InitProjectFund.ID_ROW]) {
      setRowId(idRow);
      dispatch(addIdRowProjectFund(idRow));
      dispatch(addIsEditProjectFund(true));
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
  useEffect(() => {
    if (!rowId || !reducerProjectFund?.[InitProjectFund.ID_ROW] || page) {
      handleCallApiProjectFundsList(page, tabList);
    }
  }, [reducerProjectFund, page]);

  return (
    <div className="user-inputs">
      <div className="user-info" style={{ textAlign: "center" }}>
        <div className="user-label">
          <h3 className="w-100">Các dự án</h3>
        </div>
        <div className="w-100">
          <div className="w-100 mb-4 d-flex align-item-start tab-list-project-fund ">
            {ProjectFundProcessingListConst.tabTabeList.map(
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
                  dataProjectFundsProcessing && dataProjectFundsProcessing.datas
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
                  onClick={(event, newPage) => handleChangePage(event, newPage)}
                  totalRecords={dataProjectFundsProcessing.totalRecords}
                  pageNumber={page.pageNumber}
                />
              )}
          </div>
        </div>
        <div className="d-flex " style={{ gap: "20px" }}>
          <div>
            <BaseButton
              disabled={rowIdSelects?.length === 0}
              title="Xóa dự án"
              onClick={handleCallApiProjectFundsDeletes}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
