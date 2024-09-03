import { useEffect, useState } from "react";
import FooterComponent from "../footer-management/Footer";
import HeaderComponent from "../header-management/Header";

interface PropsDefaultLayout {
  children: React.ReactNode;
}
const DefaultLayout: React.FC<PropsDefaultLayout> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loader = document.getElementById("ftco-loader");
    if (loader) {
      setTimeout(() => {
        setIsLoading(false);
        loader.classList.remove("show");
      }, 1000); // 1 giây hoặc sau khi content load xong
    }
  }, []);

  return (
    <div className="home">
      <HeaderComponent />
      {children}
      <FooterComponent />
      {isLoading && (
        <div id="ftco-loader" className="show fullscreen">
          <svg className="circular" width="48px" height="48px">
            <circle
              className="path-bg"
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="4"
              stroke="#eeeeee"
            />
            <circle
              className="path"
              cx="24"
              cy="24"
              r="22"
              fill="none"
              strokeWidth="4"
              strokeMiterlimit="10"
              stroke="#F96D00"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default DefaultLayout;
