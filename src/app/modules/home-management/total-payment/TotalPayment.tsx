import { MyContext } from "@/App";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import { memo, useContext, useEffect, useState } from "react";
import "./TotalPayment.scss";
import { getFundsStatistics } from "./services/TotalPayment.service";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { handleCheckSuccessResponse } from "@/shared/constants/base.constants";
import { TotalPaymentFields } from "./interface/TotalPayment.interface";
import { formatCurrency } from "@/shared/user-const";
export default memo(function TotalPaymentComponent() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  const { setLoading } = useContextCommon();

  const [dataInfo, setDataInfo] = useState();
  // lấy thông tin chung về dự án
  const handleCallApiStatistics = async () => {
    setLoading(true);
    const res: any = await getFundsStatistics();
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      setDataInfo(res?.data?.data);
    }
  };
  useEffect(() => {
    handleCallApiStatistics();
  }, []);

  return (
    <section
      className="ftco-section-3 img total-payment"
      style={{ backgroundImage: `url(${publicUrl + "/images/main/tnv.jpg"})` }}
    >
      <div className="overlay" />
      <LazyLoadComponent>
        <div className="container">
          <div className="row d-md-flex">
            <div
              className="w-100"
              style={{
                textAlign: "center",
              }}
            >
              <h1 className="text" style={{fontSize:'50px'}}>Số liệu thống kê</h1>
            </div>
            <div className="d-flex w-100 justify-content-between mt-5">
              <div className="d-flex flex-column">
                <span className="text-label">Dự án</span>
                <span className="text text-value">
                  {dataInfo?.[TotalPaymentFields.PROJECT_FUNDS_COUNT] ?? 0}
                </span>
              </div>
              <div className="d-flex flex-column">
                <span className="text-label">Sứ giả</span>
                <span className="text text-value">
                  {dataInfo?.[TotalPaymentFields.PROJECT_FUNDS_COUNT_USER] ?? 0}
                </span>
              </div>
              <div className="d-flex flex-column">
                <span className="text-label">Tổ chức</span>
                <span className="text text-value">
                  {dataInfo?.[TotalPaymentFields.CHARITY_FUNDS_COUNT] ?? 0}
                </span>
              </div>
              <div className="d-flex flex-column">
                <span className="text-label">Tiền ủng hộ</span>
                <span className="text text-value">
                  {formatCurrency(dataInfo?.[TotalPaymentFields.TOTAL_AMOUNT] ?? "") }
                </span>
              </div>
            </div>
          </div>
        </div>
      </LazyLoadComponent>
    </section>
  );
});
