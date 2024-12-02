import { SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import Swiper Navigation styles
import "swiper/css/pagination"; // Import Swiper Pagination styles
import Slide from "@/shared/libraries/slide-component/Slide";
import { memo, useEffect, useState } from "react";
import { getListProjectFunds } from "../../project-admin-management/services/Project-fund.services";
import { Page } from "@/shared/ultils/Page";
import { FilterTabList } from "../../project-admin-management/constants/Project-fund.enum";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { Link } from "react-router-dom";
import config from "@/shared/ultils/config";
import "./SlideHome.scss";
import { formatCurrency } from "@/shared/user-const";
import { ProjectFundFields } from "../../project-admin-management/constants/Project-fund.interface";
// Example public URL

const SlideHomeComponent = () => {
  const { setLoading } = useContextCommon();

  const [listProjectFund, setListProjectFund] = useState<[]>([]); // danh sách các
  const handleCallApiGetListProjectFunds = async () => {
    let page: Page = new Page();
    setLoading(true);
    const res: any = await getListProjectFunds(
      page,
      FilterTabList.IN_PROCESSING
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
      <Slide slidesPerView={4}>
        {listProjectFund &&
          listProjectFund?.length > 0 &&
          listProjectFund.map((slide, index) => (
            <SwiperSlide key={index} className="item">
              <div className="cause-entry">
                <div className="image-item">
                  <Link
                    to={""}
                    className="img"
                    style={{
                      backgroundImage: `url(${
                        config.FILE_URL + slide?.[ProjectFundFields.IMAGES][0]
                      })`,
                    }}
                  />
                  <div className="image-fund">
                    <img
                      src={
                        config.FILE_URL + slide?.[ProjectFundFields.IMAGES][0]
                      }
                    />
                  </div>
                </div>
                <div className="text p-3 p-md-4">
                  <div className="mb-2 mt-2">
                    <Link to={""} >
                      <div className="mb-4 text-charity-fund">
                        {slide?.[ProjectFundFields.FUND_NAME]}
                      </div>
                    </Link>
                  </div>
                  <Link to={""}>
                    <h3 className="text-project-fund">{slide?.[ProjectFundFields.NAME]}</h3>
                  </Link>
                  <span className="donation-time mb-3 d-block"></span>
                  <div className="progress custom-progress-success">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{
                        width: `${slide?.[ProjectFundFields.PERCENT] ?? 20}%`,
                      }}
                      aria-valuenow={slide?.[ProjectFundFields.PERCENT] ?? 20}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <span className="fund-raised d-block">
                    <span className="cost-slide">
                      {formatCurrency(
                        slide?.[ProjectFundFields.CURRENT_AMOUNT] ?? 0
                      )}
                    </span>{" "}
                    trên mục tiêu{" "}
                    <span className="cost-slide">
                      {" "}
                      {formatCurrency(slide?.[ProjectFundFields.TARGET_AMOUNT])}
                    </span>
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Slide>
    </div>
  );
};

export default memo(SlideHomeComponent);
