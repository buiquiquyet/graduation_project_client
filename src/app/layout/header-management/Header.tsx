import { MyContext } from "@/App";
import LazyLoadComponent from "@/shared/libraries/lazy-load-component/LayzyComponent";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EHeaderTab, EHeaderTabKey } from "./constants/Header.enum";
import { HeaderConst } from "./constants/Header.const";
import "./Header.scss";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { RoleUser } from "@/helper/ContextCommon/ContextCommon.enum";
import { UserFields } from "@/app/modules/user-management/constants/User.interface";
interface HeaderProps {
  isBackImgHeader?: boolean;
}
const HeaderComponent: React.FC<HeaderProps> = ({ isBackImgHeader = true }) => {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  // set active tab header
  const [activeTab, setActiveTab] = useState(EHeaderTab.HOME);
  // check useContext
  const { dataUser } = useContextCommon();
  // phân quyền
  const [role, setRole] = useState<RoleUser>(RoleUser.NONE);
  const [arrTabHome, setArrTabHome] = useState<any[]>(HeaderConst.arrTabHeader);
  // mảng các tab
  const onClickActiveHeader = (activeTab: EHeaderTab) => {
    sessionStorage.setItem("headerActive", `${activeTab}`);
    setActiveTab(activeTab);
  };
  useEffect(() => {
    if (dataUser) {
      if (dataUser?.[UserFields.ROLE] !== RoleUser.NONE) {
        const newArrTabHome = arrTabHome?.filter(
          (tab: any) => tab?.value !== EHeaderTab.LOGIN
        );
        setArrTabHome(newArrTabHome);
      }
      setRole(dataUser?.[UserFields.ROLE]); 
    }
  }, [dataUser]);
  useEffect(() => {
    const activeTab = sessionStorage.getItem("headerActive");
    if (activeTab) {
      setActiveTab(+activeTab);
    }
  }, []);
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
              {arrTabHome?.map((item: any, index: number) => (
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
              {role !== RoleUser.NONE && (
                <li className="nav-link d-flex " style={{ padding: "0 20px" }}>
                  <Link
                    to={`/${EHeaderTabKey.ROLE}`}
                    className={`nav-item item-user   ${
                      EHeaderTab.ROLE === activeTab ? "active" : ""
                    }`}
                    onClick={() => onClickActiveHeader(EHeaderTab.ROLE)}
                  >
                    <div className="user-img-home">
                      <img src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-thien-nhien-3d-002.jpg" />
                    </div>
                    <div className={`nav-link `} style={{ padding: "0" }}>
                      <span
                        className={`${
                          EHeaderTab.ROLE === activeTab ? "active-user" : ""
                        }`}
                      >
                        {dataUser?.[UserFields.FULL_NAME]}
                      </span>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* END nav */}
      {!isBackImgHeader && <div className="header-noBgImg"></div>}
      {isBackImgHeader && (
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
                    KHÔNG LÀM GÌ KHÔNG PHẢI LÀ MỘT LỰA CHỌN CỦA CUỘC SỐNG CHÚNG
                    TA
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
      )}
    </div>
  );
};
export default HeaderComponent;
