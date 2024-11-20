import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoadingProvider } from "./helper/ContextCommon/ContextCommon.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <BrowserRouter>
    <LoadingProvider>
      <App />
      <ToastContainer />
    </LoadingProvider>
  </BrowserRouter>

  // </React.StrictMode>,
);
