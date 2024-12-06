import { useDispatch } from "react-redux";
import "./Project-fund.scss";
import ProjectFundEdit from "./pages/project-fund-edit-management/Project-fund-edit";
import ProjectFundList from "./pages/project-fund-list-management/Project-fund-list";
import { useEffect } from "react";
import {
  addIdRowProjectFund,
  addIsDelSuccessProjectFund,
  addIsEditProjectFund,
  addIsSubmitSuccessProjectFund,
} from "@/shared/reducer/project-fund-slice/ProjectFundSlice";
export default function ProjectFundComponent() {
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
    <div className="project-fund-management">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div>
            <h1>Danh sách các dự án</h1>
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
