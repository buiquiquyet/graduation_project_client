import FooterComponent from "../footer-management/Footer";
import HeaderComponent from "../header-management/Header";

interface PropsDefaultLayout {
  children: React.ReactNode;
  isBackImgHeader?: boolean;
}
const DefaultLayout: React.FC<PropsDefaultLayout> = ({
  children,
  isBackImgHeader = true,
}) => {
  return (
    <div className="home">
      <HeaderComponent isBackImgHeader={isBackImgHeader} />
      {children}
      <FooterComponent />
    </div>
  );
};

export default DefaultLayout;
