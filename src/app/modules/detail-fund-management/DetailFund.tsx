import { formatCurrency, getImgCommon } from "@/shared/user-const";
import { memo, useEffect, useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import "./DetailFund.scss";
import EmissaryBox from "./pages/emissary-box-management/EmissaryBox";
import DetailFundListProject from "./pages/detail-fund-project-management/DetailFundListProject";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { getCharityFund } from "../charity-fund-management/services/Charity-fund.services";
import { handleCheckSuccessResponse } from "@/shared/constants/base.constants";
import { useParams } from "react-router-dom";
import { CharityFundFields } from "../charity-fund-management/constants/charity-fund.interface";
export default memo(function DetailFundComponent() {
  const { setLoading } = useContextCommon();
  const { fundId } = useParams();
  const [dataFund, setDataFund] = useState(null); // dữ liệu detail của quỹ
  const handleCallApiDetailFund = async (idFund: string) => {
    setLoading(true);
    const res: any = await getCharityFund(idFund);
    setLoading(false);
    if (handleCheckSuccessResponse(res)) {
      setDataFund(res?.data?.data);
    }
  };

  useEffect(() => {
    if (fundId) {
      handleCallApiDetailFund(fundId);
    }
  }, [fundId]);
  return (
    <>
      <div className="container detail-fund">
        <section className="avatar-fund w-100 d-flex flex-column align-items-center">
          <div className="">
            <img
              src={getImgCommon(dataFund?.[CharityFundFields.IMAGES] ?? "")}
              alt=""
            />
          </div>
          <h1 className="mt-2 name-fund">
            {dataFund?.[CharityFundFields.NAME] ?? ""}
          </h1>
        </section>
        <section
          className="info-fund d-flex w-100 justify-content-center"
          style={{ gap: "50px" }}
        >
          <div
            className="info-fund-box d-flex align-items-center justify-content-end"
            style={{ gap: "10px" }}
          >
            <div className="icon-info-fund">
              <FaPhone />
            </div>
            <div className="content-info-fund ">
              <div style={{ fontWeight: "bold" }}>Hotline</div>
              <div>{dataFund?.[CharityFundFields.PHONE] ?? ""} </div>
            </div>
          </div>
          <div
            className=" info-fund-box d-flex align-items-center"
            style={{ gap: "10px" }}
          >
            <div className="icon-info-fund">
              <FaEnvelope />
            </div>
            <div className="content-info-fund">
              <div style={{ fontWeight: "bold" }}>Email</div>
              <div>{dataFund?.[CharityFundFields.EMAIL] ?? ""}</div>
            </div>
          </div>
        </section>
        <section className="boder-fund"></section>
        <section className="content-description-fund">
          <span>{dataFund?.[CharityFundFields.DESCRIPTION] ?? ""}</span>
        </section>
        
        {/* nhóm sứ giả đã donate */}
        <EmissaryBox fundId={fundId ?? ""} />
        {/* list các dự án thuộc quỹ này */}
      </div>
      <DetailFundListProject />
    </>
  );
});
