import LibTable from "@/shared/libraries/lib-table-component/LibTable";

import { memo, useEffect, useState } from "react";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import {
  deleteProjectFunds,
  getListProjectFunds,
} from "../../services/Project-fund.services";
import { Page } from "@/shared/ultils/Page";
import { ProjectFundListConst } from "../../constants/Project-fund-list.const";
import "./Project-fund-list.scss";
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
import { TabListProjectFund } from "../../constants/Project-fund.enum";

export default memo(function ProjectFundList() {
  const { setLoading } = useContextCommon();
  const page: Page = new Page();
  const [dataProjectFunds, setDataProjectFunds] = useState<ApiResponseTable>({
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
  const [tabList, setTabList] = useState<TabListProjectFund>(
    TabListProjectFund.IN_PROCESSING
  ); // tab đang diễn ra và đã kết thúc
  const columnTable = ProjectFundListConst.columnProjectFund; // column table
  // call api get list dự án
  const handleCallApiProjectFundsList = async (
    page: Page,
    filterTabList: TabListProjectFund
  ) => {
    setLoading(true);
    const res: any = await getListProjectFunds(page, filterTabList);
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
  // call api xóa dự án
  const handleCallApiProjectFundsDeletes = async () => {
    if (rowIdSelects?.length > 0) {
      setLoading(true);
      const res: any = await deleteProjectFunds(rowIdSelects);
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
  // thay đổi tab list
  const handleChangeTabList = (tabList: TabListProjectFund) => {
    setTabList(tabList); // set thay đổi tab list
    handleCallApiProjectFundsList(page, tabList); // gọi api khi thay đổi tab list
  };
  useEffect(() => {
    if (!rowId || !reducerProjectFund?.[InitProjectFund.ID_ROW]) {
      handleCallApiProjectFundsList(page, tabList);
    }
  }, [reducerProjectFund]);

  return (
    <div className="user-inputs">
      <div className="user-info" style={{ textAlign: "center" }}>
        <div className="user-label">
          <h3 className="w-100">Các dự án</h3>
        </div>
        <div className="w-100">
          <div className="w-100 mb-4 d-flex align-item-start tab-list-project-fund ">
            <h5
              className={`tab ${
                tabList === TabListProjectFund.IN_PROCESSING ? "active-tab" : ""
              }`}
              onClick={() =>
                handleChangeTabList(TabListProjectFund.IN_PROCESSING)
              }
            >
              Đang diễn ra
            </h5>
            <h5
              className={`tab ${
                tabList === TabListProjectFund.ENDED ? "active-tab" : ""
              }`}
              onClick={() => handleChangeTabList(TabListProjectFund.ENDED)}
            >
              Đã kết thúc
            </h5>
          </div>
          <div>
            {columnTable?.length > 0 && (
              <LibTable
                columns={columnTable}
                data={dataProjectFunds && dataProjectFunds.datas}
                rowIdSelects={rowIdSelects}
                setRowIdSelects={setRowIdSelects}
                onRowClick={onRowClick}
              />
            )}
          </div>
        </div>
        <div>
          <BaseButton
            disabled={rowIdSelects?.length === 0}
            title="Xóa dự án"
            onClick={handleCallApiProjectFundsDeletes}
          />
        </div>
      </div>
    </div>
  );
});
