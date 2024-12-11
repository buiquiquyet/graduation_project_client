import { MyContext } from "@/App";
import { EHeaderTabKey } from "@/app/layout/header-management/constants/Header.enum";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { ApiResponseTable } from "@/shared/constants/api-response-table";
import Slide from "@/shared/libraries/slide-component/Slide";
import { Page } from "@/shared/ultils/Page";
import { getImgCommon } from "@/shared/user-const";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import "./CharityFundsHome.scss";
import { FaLocationArrow, FaMailBulk, FaPhone } from "react-icons/fa";
import { getListCharityFunds } from "@/app/modules/admin-modules/charity-fund-management/services/Charity-fund.services";
import { ProjectFundFields } from "@/app/modules/admin-modules/project-fund-admin-management/constants/Project-fund.interface";
import { CharityFundFields } from "@/app/modules/admin-modules/charity-fund-management/constants/charity-fund.interface";
export default function CharityFundsHome() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { setLoading } = useContextCommon();
  const [dataCharityFunds, setDataCharityFunds] = useState<ApiResponseTable>({
    currentPage: 1,
    datas: [],
    message: "",
    totalPages: 0,
    totalRecords: 0,
  }); // data trả về
  // call api get list quỹ
  const handleCallApiCharityFundsList = async () => {
    let pages: Page = new Page();
    pages = { ...pages, pageSize: 999 };
    setLoading(true);
    const res: any = await getListCharityFunds(pages);
    setLoading(false);
    if (res) {
      setDataCharityFunds(res?.data);
    }
  };

  useEffect(() => {
    handleCallApiCharityFundsList();
  }, []);
  return (
    <div className="slide-home-charity-fund">
      <div className="mb-4 w-100">
        <h2 className="w-100" style={{ fontSize: "34px", textAlign:'center' }}>Các quỹ tổ chức</h2>
      </div>
      <Slide slidesPerView={4}>
        {dataCharityFunds.datas &&
          dataCharityFunds.datas?.length > 0 &&
          dataCharityFunds.datas.map((slide, index) => (
            <SwiperSlide key={index} className="item">
              <div className="cause-entry">
                <div className="image-item">
                  <Link
                    to={`/${EHeaderTabKey.DETAIL_FUND}/${
                      slide?.[CharityFundFields.ID]
                    }`}
                    className="img"
                    style={{
                      backgroundImage: `url(${getImgCommon(
                        slide?.[ProjectFundFields.IMAGES]
                      )})`,
                    }}
                  />
                </div>
                <div className="text p-3 p-md-4" style={{boxShadow: "2px 3px 66px -24px rgba(0, 0, 0, 0.6)"}}>
                  <div className="mb-2 mt-2">
                    <Link
                      to={`/${EHeaderTabKey.DETAIL_FUND}/${
                        slide?.[ProjectFundFields.ID]
                      }`}
                    >
                      <div className="mb-4 text-charity-fund w-100">
                        {slide?.[ProjectFundFields.FUND_NAME]}
                      </div>
                    </Link>
                  </div>
                  <div >
                    <h3 className="text-project-fund w-100">
                      {slide?.[ProjectFundFields.NAME]}
                    </h3>
                  </div>
                  <span className="donation-time mb-3 d-block"></span>
                  
                  <div className="fund-raised d-block w-100">

                    <div className="cost-slide w-100">
                      {/* <span className="cost-slide" style={{ color: "#696969", fontSize: "18px" }}>
                      {slide?.[ProjectFundFields.DESCRIPTION]}
                      </span>{" "} */}
                      <ul
                        className="d-flex flex-column"
                        style={{ gap: "10px" }}
                      >
                        <li className="d-flex align-items-center item-info-fund cost-slide w-100">
                          <div className="d-flex align-items-center">
                            <FaLocationArrow />
                          </div>
                          <span className="text-info-fund ">
                            {slide?.[CharityFundFields.ADDRESS]}
                          </span>
                        </li>
                        <li className="d-flex align-items-center item-info-fund cost-slide w-100">
                          <div className="d-flex align-items-center">
                            <FaMailBulk />
                          </div>
                          <span className="text-info-fund ">
                            {slide?.[CharityFundFields.EMAIL]}
                          </span>
                        </li>
                        <li className="d-flex align-items-center item-info-fund cost-slide w-100">
                          <div className="d-flex align-items-center">
                            <FaPhone />
                          </div>
                          <span className="text-info-fund hotline">
                            {slide?.[CharityFundFields.PHONE]}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Slide>
    </div>
  );
}
