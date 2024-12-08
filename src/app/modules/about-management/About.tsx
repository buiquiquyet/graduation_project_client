import { MyContext } from "@/App";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import { useContext } from "react";
import "./About.scss";
const AboutComponent = () => {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  return (
    <div className="about-management">
      <section className="ftco-section ">
        <div className="container">
          <LazyLoadComponent>
            <div className="row d-flex">
              <div className="col-md-6 d-flex ">
                <div
                  className="img img-about align-self-stretch"
                  style={{
                    backgroundImage: `url(${
                      publicUrl + "/images/main/10.jpg"
                    })`,
                    width: "100%",
                  }}
                ></div>
              </div>
              <div
                className="col-md-6 pl-md-5 "
                style={{ textAlign: "justify" }}
              >
                <h2 className="mb-4">Về chúng tôi</h2>
                <span className="text-introduce">
                  GiveHope là nền tảng thiện nguyện trực tuyến, kết nối những
                  tấm lòng hảo tâm với các dự án và cá nhân cần sự giúp đỡ.
                  Chúng tôi tập trung vào việc cung cấp một không gian minh bạch
                  và dễ dàng cho người dùng tham gia quyên góp cho các lĩnh vực
                  thiết yếu như giáo dục, y tế, hỗ trợ thiên tai, chăm sóc người
                  cao tuổi và nhiều hoạt động cộng đồng khác. Với cam kết mang
                  lại sự rõ ràng trong quá trình sử dụng quỹ, mỗi đóng góp của
                  bạn sẽ trực tiếp tạo ra sự thay đổi tích cực trong cuộc sống
                  của những người cần giúp đỡ. Giao diện thân thiện và dễ sử
                  dụng của chúng tôi cho phép người dùng theo dõi hành trình
                  đóng góp, giúp đảm bảo sự tin tưởng và minh bạch. Tham gia
                  GiveHope, bạn không chỉ giúp đỡ những người gặp khó khăn, mà
                  còn trở thành một phần của cộng đồng yêu thương, lan tỏa hy
                  vọng và tạo dựng những thay đổi tốt đẹp cho xã hội.
                </span>
              </div>
            </div>
          </LazyLoadComponent>
        </div>
      </section>

      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row justify-content-center mb-5 pb-3">
            <div className="col-md-7 heading-section  text-center">
              <LazyLoadComponent>
                <h2 className="mb-4">Ủng hộ cho chúng tôi</h2>
              </LazyLoadComponent>
            </div>
            <LazyLoadComponent>
              <div className="container">
                <div className="row d-flex">
                  <div
                    className="col-12 col-sm-12 col-md-12 col-lg-8 d-flex flex-column"
                    style={{ gap: "10px" }}
                  >
                    <span className="text-donate">
                      Số tiền bạn ủng hộ được dùng để bù đắp cho các chi phí vận
                      hành của GiveHope, nhằm xây dựng một nền tảng gây quỹ cộng
                      đồng trực tuyến tiện lợi, tin cậy và minh bạch cho người
                      dùng và hoàn toàn MIỄN PHÍ cho các tổ chức phi lợi nhuận,
                      bao gồm:
                    </span>
                    <span className="text-donate">
                      <b style={{ fontWeight: "bold" }}>Công nghệ</b>: Máy chủ,
                      băng thông, bảo trì, phát triển hệ thống,…để đảm bảo tính
                      ổn định, tiện lợi và bảo mật cho người dùng và các tổ chức
                      gây quỹ.
                    </span>{" "}
                    <span className="text-donate">
                      <b style={{ fontWeight: "bold" }}>Nhân lực</b>: Nguồn ủng
                      hộ của các bạn giúp GiveHope duy trì bộ máy nhân sự vận
                      hành cần thiết, chúng tôi nỗ lực tối ưu bộ máy nhân sự
                      thông qua việc sử dụng các nguồn lực tình nguyện viên và
                      hỗ trợ khác để đảm bảo số tiền đóng góp của bạn có hiệu
                      suất cao nhất.
                    </span>{" "}
                    <span className="text-donate">
                      Trân trọng, Đội ngũ GiveHope
                    </span>
                  </div>
                  <div className=" img-qrcol-12 col-sm-12 col-md-12 col-lg-4 ">
                    <img
                      style={{ width: "300px", height: "300px" }}
                      src={publicUrl + "/images/qr.jpg"}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </LazyLoadComponent>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutComponent;
