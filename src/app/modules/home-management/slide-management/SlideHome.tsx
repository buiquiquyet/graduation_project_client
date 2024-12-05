import { SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Swiper Navigation styles
import "swiper/css/pagination"; // Import Swiper Pagination styles
import Slide from "@/shared/libraries/slide-component/Slide";
import { memo, useEffect, useState } from "react";
import { getListProjectFunds } from "../../project-admin-management/services/Project-fund.services";
import { Page } from "@/shared/ultils/Page";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { Link } from "react-router-dom";
import "./SlideHome.scss";
import { formatCurrency, getImgCommon } from "@/shared/user-const";
import { ProjectFundFields } from "../../project-admin-management/constants/Project-fund.interface";
import { EHeaderTabKey } from "@/app/layout/header-management/constants/Header.enum";
import LibCategoryAbsolute from "@/shared/libraries/LibCategoryAbsolute/LibCategoryAbsolute";
import { TabListProjectFund } from "../../project-admin-management/constants/Project-fund.enum";
// Example public URL
interface SlideHomeComponentProps {
  slidesPerView?: number;
}
const SlideHomeComponent: React.FC<SlideHomeComponentProps> = ({
  slidesPerView,
}) => {
  const { setLoading } = useContextCommon();

  const [listProjectFund, setListProjectFund] = useState<[]>([]); // danh sách các dự án
  const handleCallApiGetListProjectFunds = async () => {
    let page: Page = new Page();
    setLoading(true);
    const res: any = await getListProjectFunds(
      page,
      TabListProjectFund.IN_PROCESSING
    );
    setLoading(false);
    if (res) {
      const datas = res?.data?.datas;
      setListProjectFund(datas);
    }
  };
  useEffect(() => {
    handleCallApiGetListProjectFunds();
  }, []);
  return (
    <div className="slide-home-project-fund">
      <Slide slidesPerView={slidesPerView ?? 4}>
        {listProjectFund &&
          listProjectFund?.length > 0 &&
          listProjectFund.map((slide, index) => (
            <SwiperSlide key={index} className="item">
              <div className="cause-entry">
                <div className="image-item">
                  <Link
                    to={`/${EHeaderTabKey.PROJECT_FUND_DETAIL}/${
                      slide?.[ProjectFundFields.ID]
                    }`}
                    className="img"
                    style={{
                      backgroundImage: `url(${getImgCommon(
                        slide?.[ProjectFundFields.IMAGES][0]
                      )})`,
                    }}
                  />
                   <LibCategoryAbsolute
                      value={slide?.[ProjectFundFields.CATEGORY_NAME]}
                    />
                  <div className="image-fund">
                    <img
                      src={getImgCommon(slide?.[ProjectFundFields.IMAGES_FUND])}
                      alt=""
                    />
                   
                  </div>
                </div>
                <div className="text p-3 p-md-4">
                  <div className="mb-2 mt-2">
                    <Link
                      to={`/${EHeaderTabKey.PROJECT_FUND_DETAIL}/${
                        slide?.[ProjectFundFields.ID]
                      }`}
                    >
                      <div className="mb-4 text-charity-fund w-100">
                        {slide?.[ProjectFundFields.FUND_NAME]}
                      </div>
                    </Link>
                  </div>
                  <Link to={`/${EHeaderTabKey.PROJECT_FUND_DETAIL}`}>
                    <h3 className="text-project-fund w-100">
                      {slide?.[ProjectFundFields.NAME]}
                    </h3>
                  </Link>
                  <span className="donation-time mb-3 d-block"></span>
                  <div className="progress custom-progress-success">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{
                        width: `${
                          parseFloat(slide?.[ProjectFundFields.PERCENT]) ?? 0
                        }%`,
                      }}
                      aria-valuenow={
                        parseFloat(slide?.[ProjectFundFields.PERCENT]) ?? 0
                      }
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <div className="fund-raised d-block w-100">
                    <div className="cost-slide w-100 d-flex justify-content-between">
                      <span style={{ color: "#f86f2d", fontWeight: "bold" }}>
                        {formatCurrency(
                          slide?.[ProjectFundFields.CURRENT_AMOUNT] ?? 0
                        )}
                      </span>
                      <span style={{ color: "#F9153E" }}>
                        {slide?.[ProjectFundFields.PERCENT]}%
                      </span>
                    </div>

                    <div className="cost-slide w-100">
                      <span style={{ color: "#696969", fontSize: "16px" }}>
                        với mục tiêu{" "}
                      </span>{" "}
                      <span style={{ color: "black" }}>
                        {formatCurrency(
                          slide?.[ProjectFundFields.TARGET_AMOUNT]
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Slide>
    </div>
  );
};

export default memo(SlideHomeComponent);
