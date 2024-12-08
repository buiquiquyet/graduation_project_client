import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import { Link } from "react-router-dom";
import { EHeaderTabKey } from "../header-management/constants/Header.enum";
const FooterComponent = () => {
  return (
    <footer className="ftco-footer ftco-section img">
      <div className="overlay" />
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Về chúng tôi</h2>
              <p>
                GiveHope là nền tảng thiện nguyện trực tuyến, kết nối những tấm
                lòng hảo tâm với các dự án và cá nhân cần sự giúp đỡ.
              </p>
              <LazyLoadComponent>
                <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                  {/* <li className="">
                    <a href="#">
                      <span className="icon-twitter" />
                    </a>
                  </li>
                  <li className="">
                    <a href="#">
                      <span className="icon-facebook" />
                    </a>
                  </li>
                  <li className="">
                    <a href="#">
                      <span className="icon-instagram" />
                    </a>
                  </li> */}
                </ul>
              </LazyLoadComponent>
            </div>
          </div>
          <div className="col-md-4">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Dự án gần đây</h2>
              <div className="block-21 mb-4 d-flex">
                <div className="text">
                  <h3 className="heading">
                    <a href="#">
                      Even the all-powerful Pointing has no control about
                    </a>
                  </h3>
                  <div className="meta">
                    <div>
                      <a href="#">
                        <span className="icon-calendar" /> July 12, 2018
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <span className="icon-person" /> Admin
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <span className="icon-chat" /> 19
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-21 mb-4 d-flex">
                <div className="text">
                  <h3 className="heading">
                    <a href="#">
                      Even the all-powerful Pointing has no control about
                    </a>
                  </h3>
                  <div className="meta">
                    <div>
                      <a href="#">
                        <span className="icon-calendar" /> July 12, 2018
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <span className="icon-person" /> Admin
                      </a>
                    </div>
                    <div>
                      <a href="#">
                        <span className="icon-chat" /> 19
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="ftco-footer-widget mb-4 ml-md-4">
              <h2 className="ftco-heading-2">Đường dẫn web</h2>
              <ul className="list-unstyled">
                <li>
                  <Link to={EHeaderTabKey.HOME} className="py-2 d-block">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to={EHeaderTabKey.ABOUT} className="py-2 d-block">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link to={EHeaderTabKey.BLOG} className="py-2 d-block">
                    Dự án
                  </Link>
                </li>
                <li>
                  <Link to={EHeaderTabKey.INSTRUCT} className="py-2 d-block">
                    Hướng dẫn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-3">
            <div className="ftco-footer-widget mb-4">
              <h2 className="ftco-heading-2">Bạn có câu hỏi?</h2>
              <div className="block-23 mb-3">
                <ul>
                  <li>
                    <span className="icon icon-map-marker" />
                    <span className="text">
                      76 Nguyễn Thị Duệ, TT. Sao Đỏ, Chí Linh, Hải Dương
                    </span>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon icon-phone" />
                      <span className="text">+84 379952714</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon icon-envelope" />
                      <span className="text">quyetbuiqui@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              {/* Copyright © All rights reserved | This template is made with{" "}
              <i className="icon-heart" aria-hidden="true" /> by{" "}
              <a href="https://colorlib.com" target="_blank">
                Colorlib
              </a> */}
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
