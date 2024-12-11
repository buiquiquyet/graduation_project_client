import { useEffect } from "react";
import "./Project-user-fund.scss";
import ProjectFundEdit from "./pages/project-fund-user-edit-management/Project-fund-user-edit";
import ProjectFundList from "./pages/project-fund-user-list-management/Project-fund-user-list";
import { useDispatch } from "react-redux";
import {
  addIdRowProjectFund,
  addIsDelSuccessProjectFund,
  addIsEditProjectFund,
  addIsSubmitSuccessProjectFund,
} from "@/shared/reducer/project-fund-slice/ProjectFundSlice";
export default function ProjectFundUserComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(addIdRowProjectFund(""));
      dispatch(addIsSubmitSuccessProjectFund(false));
      dispatch(addIsEditProjectFund(false));
      dispatch(addIsDelSuccessProjectFund(false));
    };
  }, []);
  return (
    <div className="project-fund-user-management">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div>
            <h1>Dự án gây quỹ</h1>
          </div>
        </div>
        <div className="container d-flex flex-column " style={{ gap: "40px" }}>
          <div className="pb-5" style={{ borderBottom: "1px solid #ccc" }}>
            <ProjectFundEdit />
          </div>
          <div>
            <ProjectFundList />
          </div>
        </div>
      </div>
    </div>
  );
}
