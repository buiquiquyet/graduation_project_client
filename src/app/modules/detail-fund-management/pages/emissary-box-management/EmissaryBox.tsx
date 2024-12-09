import { getDetaukFundsStatistics } from "@/app/modules/home-management/total-payment/services/TotalPayment.service";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { handleCheckSuccessResponse } from "@/shared/constants/base.constants";
import { formatCurrency, getImgCommon } from "@/shared/user-const";
import { memo, useEffect, useState } from "react";
import {
  DetailFundFields,
  DetailFundUserFields,
} from "../../interfaces/DetailFund.enum";
import LibBasePagination from "@/shared/libraries/LibBasePagination/LibBasePagination";

interface EmissaryBoxProps {
  fundId: string;
}
const EmissaryBox: React.FC<EmissaryBoxProps> = ({ fundId }) => {
  const { setLoading } = useContextCommon();
  const [dataEmissary, setDataEmissary] = useState<any>(null); // data số lượng project, sứ giả, donate của 1 quỹ
  // call call thông tin về quỹ, số người, số dự án, số donate, tổng tiền
  const handleCallApiGetInfoDetailFundStatistics = async (fundId: string) => {
    setLoading(true);
    const res: any = await getDetaukFundsStatistics(fundId);
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      setDataEmissary(res?.data?.data);
    } else {
      setDataEmissary(null);
    }
  };
  useEffect(() => {
    if (fundId) {
      handleCallApiGetInfoDetailFundStatistics(fundId);
    }
  }, [fundId]);
  return (
    <>
      <section className="container box-count-fund">
        <div className="row ">
          <div className="col-12 col-sm-6 col-md-6 col-lg-3 count-fund">
            <span className="lable-count-fund">Dự án</span>
            <span>
              {dataEmissary?.[DetailFundFields.PROJECT_FUNDS_COUNT] ?? 0}
            </span>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3  count-fund">
            <span className="lable-count-fund">Sứ giả</span>
            <span>{dataEmissary?.[DetailFundFields.EMISSARY_COUNT] ?? 0}</span>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3  count-fund">
            <span className="lable-count-fund">Số người ủng hộ</span>
            <span>
              {dataEmissary?.[DetailFundFields.TOTAL_USER_DONATE] ?? 0}
            </span>
          </div>
          <div className="col-12 col-sm-6 col-md-6 col-lg-3  count-fund">
            <span className="lable-count-fund">Số tiền ủng hộ</span>
            <span>
              {formatCurrency(
                dataEmissary?.[DetailFundFields.TOTAL_MOMO_AMOUNT] ?? 0
              )}
            </span>
          </div>
        </div>
      </section>
      <section className="boder-fund"></section>
      <section className="emissary-box">
        <h2>Sứ giả gây quỹ</h2>
        <span>
          Bạn có thể trở thành sứ giả gây quỹ cho các dự án bằng cách tạo trang
          gây quỹ với mục tiêu của riêng mình.
        </span>
      </section>
      <section className="list-user-donate container">
        <div className="row">
          {dataEmissary?.[DetailFundFields.USERS] &&
            dataEmissary?.[DetailFundFields.USERS]?.length > 0 &&
            dataEmissary?.[DetailFundFields.USERS].map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className="col-12 col-sm-6 col-md-6 col-lg-4 mb-4"
                >
                  <div className="item-user ">
                    <img
                      src={getImgCommon(item?.[DetailFundUserFields.AVATAR])}
                      alt=""
                    />
                    <span className="name-user">
                      {item?.[DetailFundUserFields.FULL_NAME]}
                    </span>
                    <span>
                      {formatCurrency(
                        item?.[DetailFundUserFields.TOTAL_DONATE]
                      )}
                    </span>
                  </div>
                </div>
              )
            )}
        </div>
        {/* {dataEmissary?.[DetailFundFields.USERS] &&
          dataEmissary?.[DetailFundFields.USERS]?.length > page.perPageOptions[0] && (
            <LibBasePagination
              totalPage={dataComments.totalPages}
              onClick={(event, newPage) => handleChangePage(event, newPage)}
              totalRecords={dataEmissary?.[DetailFundFields.USERS]?.length}
              pageNumber={page.pageNumber}
              isShowTotalRecord={false}
            />
          )} */}
      </section>
    </>
  );
};

export default memo(EmissaryBox);
