import { Route, Routes } from "react-router-dom";
import { publicRouter } from "./app/router/Router";
import { createContext, useEffect } from "react";
import { environment } from "./shared/environment/Environment";
import { useLoading } from "./helper/LoadingContext/LoadingContext";
import Loading from "./shared/libraries/loading-component/Loading";

interface MyContextType {
  publicUrl: string;
}

export const MyContext = createContext<MyContextType | null>(null);

function App() {
  const publicUrl = environment.publicUrl;
  const contextValue: MyContextType = {
    publicUrl,
  };
  // loading component
  const { isLoading, setLoading } = useLoading();
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);
  return (
    <div className="">
      <Routes>
        {publicRouter.map((route, index) => {
          const Page: any = route.component;
          const Layout = route.layout;
          const ChildrenPage: any = route.children;
          const typePage = route.type;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                Layout ? (
                  <MyContext.Provider value={contextValue}>
                    <Layout>
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
