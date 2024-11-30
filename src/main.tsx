import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoadingProvider } from "./helper/ContextCommon/ContextCommon.tsx";
import { Provider } from "react-redux";
import store from "./shared/redux/store.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <LoadingProvider>
        <App />
        <ToastContainer />
      </LoadingProvider>
    </Provider>
  </BrowserRouter>

  // </React.StrictMode>,
);
