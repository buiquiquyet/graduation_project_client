import { Route, Routes, useNavigate } from "react-router-dom";
import { publicRouter } from "./app/router/Router";
import { createContext, useEffect } from "react";
import { environment } from "./shared/environment/Environment";
import { useContextCommon } from "./helper/ContextCommon/ContextCommon";
import Loading from "./shared/libraries/loading-component/Loading";
import { validateToken } from "./app/modules/user-management/services/User.services";
import { EHeaderTabKey } from "./app/layout/header-management/constants/Header.enum";

interface MyContextType {
  publicUrl: string;
}

export const MyContext = createContext<MyContextType | null>(null);

function App() {
  const publicUrl = environment.publicUrl;
  const contextValue: MyContextType = {
    publicUrl,
  };
  const navigate = useNavigate();

  // loading component
  const { isLoading, setLoading, isAuthenticated, setDataUser } =
    useContextCommon();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);
  // validate user
  const validate = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const res: any = await validateToken(token);
      const data = res?.data?.data;
      if (!data?.error) {
        setDataUser(data?.dataUser);
        // navigate(EUrlRouter.SW_DEFAULT);
        return;
      } else {
        setDataUser(null);
        // setRoleUser(rs.data.dataUser.nhom_id);
        // setDataUser(rs.data.dataUser);
      }
      return;
    }else {
      navigate(`/${EHeaderTabKey.HOME}`);
    }
  };
  // useEffect(() => {
  // if (!BuildParams.compare(EUrlRouter.SW_DEFAULT)) {
  //   validate();
  // }
  // }, [location.pathname]);
  useEffect(() => {
    validate();
  }, [isAuthenticated]);
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("headerActive");
    };
  }, []);
  return (
    <div className="">
      <Routes>
        {publicRouter.map((route, index) => {
          const Page: any = route.component;
          const Layout = route.layout;
          const ChildrenPage: any = route.children;
          const isBackImgHeader: any = route.isBackImgHeader;
          // const typePage = route.type;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                Layout ? (
                  <MyContext.Provider value={contextValue}>
                    <Layout isBackImgHeader={isBackImgHeader}>
                      <Page>{ChildrenPage ? <ChildrenPage /> : null}</Page>
                    </Layout>
                  </MyContext.Provider>
                ) : (
                  <MyContext.Provider value={contextValue}>
                    <Page>{ChildrenPage ? <ChildrenPage /> : null}</Page>
                  </MyContext.Provider>
                )
              }
            />
          );
        })}
        {/* {
            dataUser && 
            <Route
              path="*"
              element={<Navigate to="/pageNotFound" replace />} // Navigate to="/" để chuyển hướng, replace để thay thế lịch sử
            />
          } */}
      </Routes>
      {isLoading && <Loading />}
    </div>
  );
}

export default App;
