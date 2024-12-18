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
import { debounce, delay } from "lodash";
import {
  getListUserEmissary,
  updateStatusUserEmissary,
} from "@/app/modules/user-management/services/User.services";
import {
  getCitys,
  getDistricts,
  getWards,
} from "@/app/modules/user-management/services/User-edit.services";
import { UserFields } from "@/app/modules/user-management/constants/User.interface";

const { Option } = Select;
export default memo(function ApprovalEmissaryListComponent() {
  const { setLoading } = useContextCommon();
  const pages: Page = new Page();
  const [page, setPages] = useState(pages); // page của table
  const [citys, setCitys] = useState<any[]>([]); // // thanh pho
  const [districts, setDistricts] = useState<any[]>([]); // quan huyen
  const [wards, setWards] = useState<any[]>([]); // phuong xa
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
      const newData: any = res?.data?.datas.map((item: any) => {
        console.log(
          citys?.find((city: any) => city.id === item?.[UserFields.CITY])?.name
        );

        return {
          ...item,
          [UserFields.CITY]: citys?.find(
            (city: any) => city.id === item?.[UserFields.CITY]
          )?.name,
          [UserFields.DISTRICT]: districts?.find(
            (district: any) => district.id === item?.[UserFields.DISTRICT]
          )?.name,
          [UserFields.WARD]: wards?.find(
            (ward: any) => ward.id === item?.[UserFields.WARD]
          )?.name,
        };
      });
      setDataProjectFundsProcessing({ ...res?.data, datas: newData });
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
  const delay = (wait: number) => {
    return new Promise((resolve) => setTimeout(resolve, wait));
  };

  const getWardsWithPagination = async () => {
    let wards: any[] = [];
    let page = 0;
    const size = 1000; // Kích thước mỗi trang
    let hasMoreData = true;
    try {
      while (hasMoreData) {
        setLoading(true);
        const wardRes = await getWards("", page, size);
        if (wardRes?.data?.data?.length) {
          wards = [...wards, ...wardRes.data.data]; // Gộp dữ liệu từ các trang
          page += 1; // Tăng page lên
        } else {
          hasMoreData = false; // Dừng lại nếu không còn dữ liệu
        }

        // Thêm delay giữa các lần gọi API
        await delay(200); // Delay 200ms giữa các lần gọi API
      }
      return wards;
    } catch (error) {
      console.error("Error fetching wards:", error);
      return [];
    }
  };

  const getDataInBatches = async () => {
    try {
      // Gọi API tuần tự với delay
      const cityRes = await getCitys();
      await delay(200); // Delay giữa các gọi API
      const districtRes = await getDistricts();
      await delay(200);
      const wardRes = await getWardsWithPagination();

      // Xử lý kết quả trả về từ các API
      if (cityRes) {
        setCitys(cityRes?.data?.data);
      }
      if (districtRes) {
        setDistricts(districtRes?.data?.data);
      }
      if (wardRes) {
        setWards(wardRes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (page) {
      
      getDataInBatches();
    }
  }, [page]);
  useEffect(() => {
    if (citys?.length && districts?.length && wards?.length) {
      handleCallApiUserEmissaryList(page, tabList);
    }
  }, [citys, districts, wards, page, tabList]);
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
