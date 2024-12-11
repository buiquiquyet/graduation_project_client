import { useEffect, useRef } from "react";
import FooterComponent from "../footer-management/Footer";
import HeaderComponent from "../header-management/Header";
import { useLocation } from "react-router-dom";

interface PropsDefaultLayout {
  children: React.ReactNode;
  isBackImgHeader?: boolean;
}

const DefaultLayout: React.FC<PropsDefaultLayout> = ({
  children,
  isBackImgHeader = true,
}) => {
  const topElementRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffect(() => {
    // Sử dụng setTimeout để đảm bảo rằng cuộn xảy ra sau khi mọi thứ đã được render
    const timer = setTimeout(() => {
      if (topElementRef.current) {
        topElementRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);

    // Clear timeout khi component unmount
    return () => clearTimeout(timer);
  }, [location]); // Mảng phụ thuộc rỗng, chỉ chạy một lần khi component được mount

  return (
    <div className="home" ref={topElementRef}>
      <HeaderComponent isBackImgHeader={isBackImgHeader} />
      {children}
      <FooterComponent />
    </div>
  );
};

export default DefaultLayout;
