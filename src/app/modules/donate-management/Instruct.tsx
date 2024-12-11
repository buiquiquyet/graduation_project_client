import { MyContext } from "@/App";
import BaseButton from "@/shared/component/base-button/BaseButton";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import { useContext } from "react";

function DonateComponent() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  // sứ giả drive
  const handleClickDriver = () => {
    const driveUrl =
      "https://drive.google.com/file/d/1lhW3jCM5ffziDochrdXUcUUGmlG2ihpt/view";
    window.open(driveUrl, "_blank");
  };
  // donate drive
  const handleClickDriverDonate = () => {
    const driveUrl =
      "https://drive.google.com/file/d/1RHaXPtG-WsmPdoZ8Fghgfg9IUpOVjvcT/view";
    window.open(driveUrl, "_blank");
  };
  return (
    <>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row">
            <LazyLoadComponent >
              <div className="w-100">
                <h1 style={{ textAlign: "center", fontSize: "50px" }}>
                  Hướng dẫn sử dụng
                </h1>
              </div>
            </LazyLoadComponent>
            <LazyLoadComponent>
              <div className="d-flex w-100 mt-5">
                <div className="container">
                  <div className="row d-flex">
                    <div
                      className="col-12 col-sm-12 col-md-12 col-lg-6 d-flex flex-column mb-3"
                      style={{ gap: "20px", textAlign: "justify" }}
                    >
                      <h3>Tính năng sứ giả gây quỹ</h3>
                      <span style={{ fontSize: "18px", color: "#54595F" }}>
                        Tính năng Sứ giả gây quỹ cho phép người dùng được xác
                        thực trên GiveHope tham gia vào việc truyền thông, vận
                        động gây quỹ cho các Tổ chức tại các Dự án gây quỹ cụ
                        thể{" "}
                        <span style={{ fontSize: "18px", color: "#f86f2d" }}>
                          khi mà người dùng ủng hộ đạt số tiền 1.000.000đ
                        </span>
                        .
                      </span>
                      <div onClick={handleClickDriver}>
                        <BaseButton title="Xem chi tiết" />
                      </div>{" "}
                    </div>
                    <div
                      className="col-12 col-sm-12 col-md-12 col-lg-6 d-flex flex-column"
                      style={{ gap: "20px", textAlign: "justify" }}
                    >
                      <h3>Tính năng ủng hộ</h3>
                      <span style={{ fontSize: "18px", color: "#54595F" }}>
                        Bạn có thể ủng hộ các dự án qua 03 bước đơn giản bằng
                        bất cứ tài khoản thanh toán điện tử nào mà mình có tại
                        GiveHope, như: Ví điện tử MOMO và bạn có thể trở thành
                        sứ giả khi quyên góp đủ số tiền đáp ứng.
                      </span>
                      <div onClick={handleClickDriverDonate}>
                        <BaseButton title="Xem chi tiết" />
                      </div>
                    </div>
                  </div>
                  {/* <div className="d-flex justify-content-between mt-3">
                  <div onClick={handleClickDriver}>
                    <BaseButton title="Xem chi tiết" />
                  </div>{" "}
                  <div onClick={handleClickDriverDonate}>
                    <BaseButton title="Xem chi tiết" />
                  </div>
                </div> */}
                </div>
              </div>
            </LazyLoadComponent>
          </div>
        </div>
      </section>
    </>
  );
}
export default DonateComponent;
