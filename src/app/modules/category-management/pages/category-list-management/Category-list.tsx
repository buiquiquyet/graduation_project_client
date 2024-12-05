import LibTable from "@/shared/libraries/lib-table-component/LibTable";

import { memo, useEffect, useState } from "react";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import {
  deleteCategorys,
  getListCategorys,
} from "../../services/Category.services";
import { Page } from "@/shared/ultils/Page";
import { CategoryListConst } from "../../constants/category-list.const";

import BaseButton from "@/shared/component/base-button/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { ReducerCategory } from "@/shared/redux/selector";

import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import { InitCategory } from "@/shared/reducer/category-slice/InitCategoryProps";
import {
  addIdRowCategory,
  addIsDelSuccessCategory,
  addIsEditCategory,
} from "@/shared/reducer/category-slice/CategorySlice";

export default memo(function CategoryList() {
  const { setLoading } = useContextCommon();

  const [dataCategorys, setDataCategorys] = useState<ApiResponseTable>({
    currentPage: 1,
    datas: [],
    message: "",
    totalPages: 0,
    totalRecords: 0,
  }); // data trả về

  const reducerCategory = useSelector(ReducerCategory); // redux danh mục
  const dispatch = useDispatch(); // action redux

  const [rowIdSelects, setRowIdSelects] = useState<string[]>([]); // mảng id khi checkbox
  const [rowId, setRowId] = useState<string>(""); // id khi click vào 1 row
  const columnTable = CategoryListConst.columnCategory; // column table
  // call api get list danh mục
  const handleCallApiCategorysList = async () => {
    const page: Page = new Page();
    setLoading(true);
    const res: any = await getListCategorys(page);
    setLoading(false);
    if (res) {
      setDataCategorys(res?.data);
    }
  };
  // call api xóa danh mục
  const handleCallApiCategorysDeletes = async () => {
    if (rowIdSelects?.length > 0) {
      setLoading(true);
      const res: any = await deleteCategorys(rowIdSelects);
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        // set lại redux của biến button success để gọi lại list và cập nhật lại form edit
        if (rowIdSelects?.includes(reducerCategory?.[InitCategory.ID_ROW])) {
          dispatch(addIsDelSuccessCategory(true));
        } else {
          handleCallApiCategorysList();
        }

        setRowIdSelects([]);
      }
    }
  };
  // khi click vào 1 row
  const onRowClick = async (idRow: string) => {
    if (idRow !== rowId || !reducerCategory?.[InitCategory.ID_ROW]) {
      setRowId(idRow);
      dispatch(addIdRowCategory(idRow));
      dispatch(addIsEditCategory(true));
    }
  };
  useEffect(() => {
    if (!rowId || !reducerCategory?.[InitCategory.ID_ROW]) {
      handleCallApiCategorysList();
    }
  }, [reducerCategory]);
  return (
    <div className="user-inputs">
      <div className="user-info" style={{ alignItems: "start" }}>
        <div className="user-label">
          <h3 className="w-100">Các danh mục</h3>
        </div>
        {columnTable?.length > 0 && (
          <LibTable
            columns={columnTable}
            data={dataCategorys && dataCategorys.datas}
            rowIdSelects={rowIdSelects}
            setRowIdSelects={setRowIdSelects}
            onRowClick={onRowClick}
          />
        )}
        <div>
          <BaseButton
            disabled={rowIdSelects?.length === 0}
            title="Xóa danh mục"
            onClick={handleCallApiCategorysDeletes}
          />
        </div>
      </div>
    </div>
  );
});
