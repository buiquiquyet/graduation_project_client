import LibTable from "@/shared/libraries/lib-table-component/LibTable";

import { useEffect, useState } from "react";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { getListCharityFunds } from "../../services/Charity-fund.services";
import { Page } from "@/shared/ultils/Page";
import { CharityFundListConst } from "../../constants/charity-fund-list.const";
import { itemOptions, ItemOptionsKey } from "@/shared/constants/item-options-setting";
import BaseButton from "@/shared/component/base-button/BaseButton";

export default function CharityFundList() {
  const { setLoading } = useContextCommon();
  const page: Page = new Page();
  const [dataCharityFunds, setDataCharityFunds] = useState<ApiResponseTable>({
    currentPage: 1,
    datas: [],
    message: "",
    totalPages: 0,
    totalRecords: 0,
  }); // data trả về
  const [rowIdSelects, setRowIdSelects] = useState<string[]>([]); // mảng id khi checkbox
  const [rowId, setRowId] = useState<string>("") // id khi click vào 1 row
  const columnTable = CharityFundListConst.columnCharityFund; // column table
  const handleOpenDialogNote = () => {
    console.log(1);
    
  };
  // call api get list quỹ
  const handleCallApiCharityFundsList = async (page: Page) => {
    setLoading(true);
    const res: any = await getListCharityFunds(page);
    setLoading(false);
    if (res) {
        console.log(res.data);
        
      setDataCharityFunds(res?.data);
    }
  };
  // call api xóa quỹ
  const handleCallApiCharityFundsDeletes = async () => {
    
  }
  // khi chọn setting option table
  const handleShowSetting = (key: any, id: any) => {
    if (id) {
    //   setIdProfile(id);
    }
    if (key.key === ItemOptionsKey.EDIT) {
    //   setOpenDialogConfirm(true);
    } 
    if(key.key === ItemOptionsKey.DELETE) {

    }
  };
  // khi click vào 1 row
  const onRowClick = async (idRow: string) => {
    if(idRow !== rowId) {
        setRowId(idRow)
        console.log(idRow);
    }
    
  }
  useEffect(() => {
    handleCallApiCharityFundsList(page);
  }, []);
  console.log(rowIdSelects);
  
  return (
    <div className="user-inputs">
      <div className="user-info">
        <div className="user-label">
          <h3 className="w-100">Các quỹ đầu tư</h3>
        </div>
        {columnTable?.length > 0 && (
          <LibTable
            columns={columnTable}
            data={dataCharityFunds && dataCharityFunds.datas}
            itemOptions={itemOptions}
            setRowIdSelects={setRowIdSelects}
            // rowIdSelects={rowIdSelects}
            onClickOpenNote={(idRecord: string) => handleOpenDialogNote()}
            onClickShowOptios={handleShowSetting}
            onRowClick={onRowClick}
          />
        )}
        <div>
            <BaseButton title="Xóa quỹ" onClick={handleCallApiCharityFundsDeletes}/>
        </div>
      </div>
    </div>
  );
}
