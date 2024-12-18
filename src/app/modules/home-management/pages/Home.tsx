import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import "./Home.scss";
import SlideHomeComponent from "../slide-management/SlideHome";
import { MyContext } from "@/App";
import { memo, useContext, useEffect, useState } from "react";
// import * as ApiServiceHome from "../services/Home.service";
import { Link } from "react-router-dom";
import { CountChildWorld } from "../constants/Home.enum";
import CharityFundsHome from "./charity-funds-home/CharityFundsHome";
import LastestDonate from "./lastest-donate/Lastest-donate";
import { HomeConst } from "../constants/Home.const";
import ImageGallery from "@/shared/libraries/gallery-component/Gallery";
import TotalPayment from "../total-payment/TotalPayment";

function HomeComponent() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  const [number, setNumber] = useState(0); // số đếm trẻ em
  const targetNumber = CountChildWorld.COUNT; // Giá trị mà bạn muốn số chạy đến
  const duration = 2000; // Thời gian hoàn thành hiệu ứng (tính bằng ms)
  // lấy thông tin người dung
  const handleCallApiGetListUser = async () => {
    // const rs = await ApiServiceHome.getListUser();
    // console.log(rs);
  };

  useEffect(() => {
    handleCallApiGetListUser();
  }, []);

  useEffect(() => {
    let start = 0;
    const increment = targetNumber / (duration / 10); // Mỗi bước tăng

    const counter = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        start = targetNumber;
        clearInterval(counter);
      }
      setNumber(Math.floor(start)); // Cập nhật số hiển thị
    }, 10); // Thời gian cập nhật mỗi bước

    return () => clearInterval(counter); // Cleanup
  }, [targetNumber, duration]);

  return (
    <>
      <section className="ftco-counter ftco-intro" id="section-counter">
        <div className="container">
          <LazyLoadComponent>
            <div className="row no-gutters">
              <div className="col-md-5 d-flex justify-content-center counter-wrap ">
                <div className="block-18 color-1 align-items-stretch">
                  <div className="text">
                    <span>Phục vụ hơn</span>
                    <strong className="number" data-number={targetNumber}>
                      {number.toLocaleString()}
                    </strong>
                    <span>
                      Trẻ em của 190 quốc gia trên thế giới cần sự giúp đỡ của
                      bạn.
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md d-flex justify-content-center counter-wrap ">
                <div className="block-18 color-2 align-items-stretch">
                  <div className="text">
                    <h3 className="mb-4">Tiền quyên góp</h3>
                    <p style={{fontSize:'20px'}}>
                      Quyên góp không chỉ là cho đi, mà còn là nhận lại những
                      niềm vui và sự biết ơn từ người khác.
                    </p>
                    {/* <p>
                      <Link to={""} className="btn btn-white px-3 py-2 mt-2">
                        Quyên góp ngay bây giờ
                      </Link>
                    </p> */}
                  </div>
                </div>
              </div>
              <div className="col-md d-flex justify-content-center counter-wrap ">
                <div className="block-18 color-3 align-items-stretch">
                  <div className="text">
                    <h3 className="mb-4">Tình nguyện viên.</h3>
                    <p style={{fontSize:'20px'}}>
                      Chỉ cần một bàn tay đưa ra giúp đỡ, bạn đã có thể thay đổi
                      cả một cuộc đời.
                    </p>
                    {/* <p>
                      <Link to={""} className="btn btn-white px-3 py-2 mt-2">
                        Tình nguyện viên.
                      </Link>
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </LazyLoadComponent>
        </div>
      </section>
      <section className="ftco-section">
        <div className="container">
          <LazyLoadComponent>
            <div className="row">
              <div className="col-md-4 d-flex align-self-stretch ">
                <div className="media block-6 d-flex services p-3 py-4 d-block">
                  <div className="icon d-flex mb-3">
                    <span className="flaticon-donation-1" />
                  </div>
                  <div className="media-body pl-4">
                    <h3 className="heading">Tạo nên sự quyên góp</h3>
                    <p>
                      Một hành động nhỏ, một tấm lòng lớn – cùng nhau, chúng ta
                      có thể tạo nên sự thay đổi!
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex align-self-stretch ">
                <div className="media block-6 d-flex services p-3 py-4 d-block">
                  <div className="icon d-flex mb-3">
                    <span className="flaticon-charity" />
                  </div>
                  <div className="media-body pl-4">
                    <h3 className="heading">Hãy trở thành tình nguyện viên</h3>
                    <p>
                      Không phải số tiền bạn cho đi, mà là tình yêu và tấm lòng
                      bạn gửi gắm trong đó.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 d-flex align-self-stretch ">
                <div className="media block-6 d-flex services p-3 py-4 d-block">
                  <div className="icon d-flex mb-3">
                    <span className="flaticon-donation" />
                  </div>
                  <div className="media-body pl-4">
                    <h3 className="heading">Bảo trợ</h3>
                    <p>
                      Mỗi hành động nhỏ của bạn hôm nay có thể là điều kỳ diệu
                      đối với ai đó vào ngày mai
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </LazyLoadComponent>
        </div>
      </section>
      <section className="ftco-section bg-light">
        <div className="container-fluid">
          <LazyLoadComponent>
            <div className="row justify-content-center mb-5 pb-3">
              <div className="col-md-5 heading-section  text-center">
                <h2 className="mb-4">Các dự án đang gây quỹ</h2>
                <h5>Hãy lựa chọn đồng hành cùng dự án mà bạn quan tâm</h5>
              </div>
            </div>
          </LazyLoadComponent>
          {/* slide */}
          <LazyLoadComponent>
            <SlideHomeComponent />
          </LazyLoadComponent>
        </div>
      </section>
      <TotalPayment/>
      <LastestDonate />

      {/* 8 img 2 row */}
      <section className="ftco-section">
        <LazyLoadComponent>
          <div className="d-md-flex">
            {HomeConst.ArrImgGalley.slice(0, 4).map(
              (img: string, index: number) => (
                <div
                  key={index}
                  className="gallery image-popup d-flex justify-content-center align-items-center img"
                  style={{
                    backgroundImage: `url(${publicUrl + img})`,
                  }}
                >
                  <ImageGallery
                    imgSrcList={HomeConst.ArrImgGalley}
                    indexImg={index}
                    isPublicUrl={true}
                  ></ImageGallery>
                  <div
                    className="icon d-flex justify-content-center align-items-center"
                    style={{ position: "absolute" }}
                  >
                    <span className="icon-search" />
                  </div>
                </div>
              )
            )}
          </div>
        </LazyLoadComponent>
        <LazyLoadComponent>
          <div className="d-md-flex">
            {HomeConst.ArrImgGalley.slice(4, 8).map(
              (img: string, index: number) => (
                <div
                  key={index}
                  className="gallery image-popup d-flex justify-content-center align-items-center img"
                  style={{
                    backgroundImage: `url(${publicUrl + img})`,
                  }}
                >
                  <ImageGallery
                    imgSrcList={HomeConst.ArrImgGalley}
                    indexImg={4 + index}
                    isPublicUrl={true}
                  ></ImageGallery>
                  <div
                    className="icon d-flex justify-content-center align-items-center"
                    style={{ position: "absolute" }}
                  >
                    <span className="icon-search" />
                  </div>
                </div>
              )
            )}
          </div>
        </LazyLoadComponent>
      </section>
      <CharityFundsHome />
     
    </>
  );
}

export default memo(HomeComponent);
