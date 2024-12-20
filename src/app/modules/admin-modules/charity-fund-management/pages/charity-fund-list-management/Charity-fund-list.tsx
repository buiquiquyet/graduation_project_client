import LibTable from "@/shared/libraries/lib-table-component/LibTable";

import { memo, useEffect, useState } from "react";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import {
  deleteCharityFunds,
  getListCharityFunds,
} from "../../services/Charity-fund.services";
import { Page } from "@/shared/ultils/Page";
import { CharityFundListConst } from "../../constants/charity-fund-list.const";

import BaseButton from "@/shared/component/base-button/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { ReducerCharityFund } from "@/shared/redux/selector";
import {
  addIdRow,
  addIsDelSuccess,
  addIsEdit,
} from "@/shared/reducer/charity-fund-slice/CharityFundSlice";
import { InitCharityFund } from "@/shared/reducer/charity-fund-slice/InitCharityFundProps";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import LibBasePagination from "@/shared/libraries/LibBasePagination/LibBasePagination";
import { debounce } from "lodash";

export default memo(function CharityFundList() {
  const { setLoading } = useContextCommon();
  const pages: Page = new Page();
  const [page, setPages] = useState(pages); // page của table
  const [dataCharityFunds, setDataCharityFunds] = useState<ApiResponseTable>({
    currentPage: 1,
    datas: [],
    message: "",
    totalPages: 0,
    totalRecords: 0,
  }); // data trả về

  const reducerCharityFund = useSelector(ReducerCharityFund); // redux quỹ
  const dispatch = useDispatch(); // action redux

  const [rowIdSelects, setRowIdSelects] = useState<string[]>([]); // mảng id khi checkbox
  const [rowId, setRowId] = useState<string>(""); // id khi click vào 1 row
  const columnTable = CharityFundListConst.columnCharityFund; // column table
  // call api get list quỹ
  const handleCallApiCharityFundsList = async (valueSearch: string = "") => {
    setLoading(true);
    const res: any = await getListCharityFunds(page, valueSearch);
    setLoading(false);
    if (res) {
      setDataCharityFunds(res?.data);
    }
  };
  // call api xóa quỹ
  const handleCallApiCharityFundsDeletes = async () => {
    if (rowIdSelects?.length > 0) {
      setLoading(true);
      const res: any = await deleteCharityFunds(rowIdSelects);
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        // set lại redux của biến button success để gọi lại list và cập nhật lại form edit
        if (
          rowIdSelects?.includes(reducerCharityFund?.[InitCharityFund.ID_ROW])
        ) {
          dispatch(addIsDelSuccess(true));
        } else {
          handleCallApiCharityFundsList();
        }

        setRowIdSelects([]);
      }
    }
  };
  // change page table
  const handleChangePage = (event: any, newPage: any) => {
    setPages({
      ...page,
      pageNumber: newPage,
    });
  };
  // khi click vào 1 row
  const onRowClick = async (idRow: string) => {
    if (idRow !== rowId || !reducerCharityFund?.[InitCharityFund.ID_ROW]) {
      setRowId(idRow);
      dispatch(addIdRow(idRow));
      dispatch(addIsEdit(true));
    }
  };
  // search
  const onChangeSearch = debounce((value: any) => {
    const valueSearch = value.target.value;
    handleCallApiCharityFundsList(valueSearch);
  }, 1000);
  useEffect(() => {
    if (!rowId || !reducerCharityFund?.[InitCharityFund.ID_ROW] || page) {
      handleCallApiCharityFundsList();
    }
  }, [reducerCharityFund, page]);
  return (
    <div className="user-inputs">
      <div className="user-info" style={{ textAlign: "center" }}>
        <div className="user-label">
          <h3 className="w-100">Các quỹ đầu tư</h3>
        </div>
        {columnTable?.length > 0 && (
          <div className="w-100">
            <LibTable
              columns={columnTable}
              data={dataCharityFunds?.datas}
              rowIdSelects={rowIdSelects}
              setRowIdSelects={setRowIdSelects}
              onRowClick={onRowClick}
              onChangeSearch={onChangeSearch}
            />
          </div>
        )}
        <div>
          {dataCharityFunds.datas &&
            dataCharityFunds.totalRecords > page.perPageOptions[0] && (
              <LibBasePagination
                totalPage={dataCharityFunds.totalPages}
                onClick={(event, newPage) => handleChangePage(event, newPage)}
                totalRecords={dataCharityFunds.totalRecords}
                pageNumber={page.pageNumber}
              />
            )}
        </div>
        <div>
          <BaseButton
            disabled={rowIdSelects?.length === 0}
            title="Xóa quỹ"
            onClick={handleCallApiCharityFundsDeletes}
          />
        </div>
      </div>
    </div>
  );
});
