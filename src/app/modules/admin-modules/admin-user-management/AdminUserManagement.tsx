import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { Page } from "@/shared/ultils/Page";
import { memo, useEffect, useState } from "react";
import {
  deleteUsers,
  getListUsers,
} from "../../user-management/services/User.services";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import LibTable from "@/shared/libraries/lib-table-component/LibTable";
import LibBasePagination from "@/shared/libraries/LibBasePagination/LibBasePagination";
import BaseButton from "@/shared/component/base-button/BaseButton";
import { AdminUserConst } from "./constants/AdminUserManagement.const";
import "./AdminUserManagement.scss";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import { debounce } from "lodash";
export default memo(function AdminUserManagement() {
  const { setLoading } = useContextCommon();
  let pages: Page = new Page();
  const [page, setPages] = useState(pages); // page của table
  const [rowIdSelects, setRowIdSelects] = useState<string[]>([]); // mảng id khi checkbox
  const [dataUsers, setDataUsers] = useState<ApiResponseTable>({
    currentPage: 1,
    datas: [],
    message: "",
    totalPages: 0,
    totalRecords: 0,
  }); // data trả về
  const columnTable = AdminUserConst.columnUser; // column table

  // change page table
  const handleChangePage = (event: any, newPage: any) => {
    setPages({
      ...page,
      pageNumber: newPage,
    });
  };
  // call api get list danh mục
  const handleCallApiUsersList = async (searchValue: string = "") => {
    setLoading(true);

    const res: any = await getListUsers(page, searchValue);
    setLoading(false);
    if (res) {
      setDataUsers(res?.data);
    }
  };
  // call api xóa người dùng
  const handleCallApiUserssDeletes = async () => {
    if (rowIdSelects?.length > 0) {
      setLoading(true);
      const res: any = await deleteUsers(rowIdSelects);
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        handleCallApiUsersList();
        setRowIdSelects([]);
      }
    }
  };
  // search
  const onChangeSearch = debounce((value: any) => {
    if(dataUsers?.datas?.length > 0) {
      const valueSearch = value.target.value;
      handleCallApiUsersList(valueSearch);
    }
  }, 1000);
  useEffect(() => {
    if (page) {
      handleCallApiUsersList();
    }
  }, [page]);
  return (
    <div className="admin-user-management pl-5 pr-5 pt-5 pb-5">
      <div className="user-inputs">
        <div className="user-info" style={{ textAlign: "center" }}>
          <div className="user-label">
            <h3 className="w-100">Danh sách người dùng</h3>
          </div>
          {columnTable?.length > 0 && (
            <div className="w-100">
              <LibTable
                columns={columnTable}
                data={dataUsers?.datas}
                rowIdSelects={rowIdSelects}
                setRowIdSelects={setRowIdSelects}
                onChangeSearch={onChangeSearch}
              />
            </div>
          )}
          <div>
            {dataUsers.datas &&
              dataUsers.totalRecords > page.perPageOptions[0] && (
                <LibBasePagination
                  totalPage={dataUsers.totalPages}
                  onClick={(event, newPage) => handleChangePage(event, newPage)}
                  totalRecords={dataUsers.totalRecords}
                  pageNumber={page.pageNumber}
                />
              )}
          </div>
          <div>
            <BaseButton
              disabled={rowIdSelects?.length === 0}
              title="Xóa người dùng"
              onClick={handleCallApiUserssDeletes}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
