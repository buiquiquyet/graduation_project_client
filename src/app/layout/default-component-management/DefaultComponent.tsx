import FooterComponent from "../footer-management/Footer";
import HeaderComponent from "../header-management/Header"

interface PropsDefaultLayout {
    children: React.ReactNode;
  }
const DefaultLayout: React.FC<PropsDefaultLayout>= ({children}) => {
        return (
            <div className="home">
                <HeaderComponent/>
                {children}
                <FooterComponent/>
            </div>
        )
}

export default DefaultLayout