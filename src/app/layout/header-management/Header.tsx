import { MyContext } from "@/App";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { EHeaderTab } from "./constants/Header.enum";
import { HeaderConst } from "./constants/Header.const";
import "./Header.scss";
const HeaderComponent = () => {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  const [activeTab, setActiveTab] = useState(EHeaderTab.HOME);
  const onClickActiveHeader = (activeTab: EHeaderTab) => {
    setActiveTab(activeTab);
  };
  return (
    <div className="header">
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <Link to={"/"} className="navbar-brand label-title">
            SOS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="oi oi-menu" /> Menu
          </button>
          <div className="collapse navbar-collapse" id="ftco-nav">
            <ul className="navbar-nav ml-auto">
              {HeaderConst.arrTabHeader?.map((item: any, index: number) => (
                <li
                  key={index}
                  className={`nav-item ${
                    item?.value === activeTab ? "active" : ""
                  }`}
                  onClick={() => onClickActiveHeader(item?.value)}
                >
                  <Link to={`/${item?.key}`} className="nav-link">
                    {item?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      {/* END nav */}
      <div
        className="hero-wrap"
        style={{ backgroundImage: `url(${publicUrl + "/images/bg_7.jpg"})` }}
        data-stellar-background-ratio="0.5"
      >
        <div className="overlay" />
        <div className="container">
          <div
            className="row no-gutters slider-text align-items-center justify-content-center"
            data-scrollax-parent="true"
          >
            <div
              className="col-md-7  text-center"
              data-scrollax=" properties: { translateY: '70%' }"
            >
              <LazyLoadComponent>
                <h1
                  className="mb-4"
                  data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"
                >
                  KHÔNG LÀM GÌ KHÔNG PHẢI LÀ MỘT LỰA CHỌN CỦA CUỘC SỐNG CHÚNG TA
                </h1>
              </LazyLoadComponent>

              <LazyLoadComponent>
                <p data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">
                  <Link
                    to={"/"}
                    className="btn btn-white btn-outline-white px-4 py-3 popup-vimeo"
                  >
                    <span className="icon-play mr-2" />
                    <span>Xem video</span>
                  </Link>
                </p>
              </LazyLoadComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeaderComponent;
