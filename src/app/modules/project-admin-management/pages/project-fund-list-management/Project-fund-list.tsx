import LibTable from "@/shared/libraries/lib-table-component/LibTable";

import { useEffect, useState } from "react";
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

import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import { InitProjectFund } from "@/shared/reducer/project-fund-slice/InitProjectFundProps";
import {
  addIdRowProjectFund,
  addIsDelSuccessProjectFund,
  addIsEditProjectFund,
} from "@/shared/reducer/project-fund-slice/ProjectFundSlice";
import {
  FilterTabList,
  TabListProjectFund,
} from "../../constants/Project-fund.enum";

export default function ProjectFundList() {
  const { setLoading } = useContextCommon();
  const page: Page = new Page();
  const [dataProjectFunds, setDataProjectFunds] = useState<ApiResponseTable>({
    currentPage: 1,
    datas: [],
    message: "",
    totalPages: 0,
    totalRecords: 0,
  }); // data trả về
  const [filterTabList, setFilterTabList] = useState<FilterTabList>(
    FilterTabList.IN_PROCESSING
  ); // tab list đang active
  const reducerProjectFund = useSelector(ReducerProjectFund); // redux dự án
  const dispatch = useDispatch(); // action redux

  const [rowIdSelects, setRowIdSelects] = useState<string[]>([]); // mảng id khi checkbox
  const [rowId, setRowId] = useState<string>(""); // id khi click vào 1 row
  const [tabList, setTabList] = useState<string>(
    TabListProjectFund.IN_PROCESSING
  ); // tab đang diễn ra và đã kết thúc
  const columnTable = ProjectFundListConst.columnProjectFund; // column table
  // call api get list dự án
  const handleCallApiProjectFundsList = async (
    page: Page,
    filterTabList: FilterTabList
  ) => {
    setLoading(true);
    const res: any = await getListProjectFunds(page, filterTabList);
    setLoading(false);
    if (res) {
      setDataProjectFunds(res?.data);
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
          handleCallApiProjectFundsList(page, filterTabList);
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
  const handleChangeTabList = (
    tabList: TabListProjectFund,
    filterTabList: FilterTabList
  ) => {
    setFilterTabList(filterTabList); // set filter list
    setTabList(tabList); // set thay đổi tab list
    handleCallApiProjectFundsList(page, filterTabList); // gọi api khi thay đổi tab list
  };
  useEffect(() => {
    if (!rowId || !reducerProjectFund?.[InitProjectFund.ID_ROW]) {
      handleCallApiProjectFundsList(page, filterTabList);
    }
  }, [reducerProjectFund]);

  return (
    <div className="user-inputs">
      <div className="user-info" style={{ textAlign: "center" }}>
        <div className="user-label">
          <h3 className="w-100">Các dự án</h3>
        </div>
        <div>
          <div className="w-100 mb-4 d-flex align-item-start tab-list-project-fund ">
            <h5
              className={`tab ${
                tabList === TabListProjectFund.IN_PROCESSING ? "active-tab" : ""
              }`}
              onClick={() =>
                handleChangeTabList(
                  TabListProjectFund.IN_PROCESSING,
                  FilterTabList.IN_PROCESSING
                )
              }
            >
              Đang diễn ra
            </h5>
            <h5
              className={`tab ${
                tabList === TabListProjectFund.ENDED ? "active-tab" : ""
              }`}
              onClick={() =>
                handleChangeTabList(
                  TabListProjectFund.ENDED,
                  FilterTabList.ENDED
                )
              }
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
}
