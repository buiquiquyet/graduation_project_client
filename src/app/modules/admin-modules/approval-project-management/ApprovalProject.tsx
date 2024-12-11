import ApprovalProjectList from "./pages/approval-project-list-management/Approval-project-list";
import ApprovalProjectView from "./pages/approval-project-view-management/Approval-project-view";
import "./ApprovalProject.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addIdRowProjectFund,
  addIsEditProjectFund,
} from "@/shared/reducer/project-fund-slice/ProjectFundSlice";
export default function ApprovalProjectFundComponent() {
  const dispatch = useDispatch(); // action redux
  useEffect(() => {
    return () => {
      dispatch(addIdRowProjectFund(""));
      dispatch(addIsEditProjectFund(false));
    };
  }, []);
  return (
    <div className="approval-project-management">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div>
            <h1>Danh sách các dự án sứ giả</h1>
          </div>
        </div>
        <div className="container d-flex flex-column " style={{ gap: "40px" }}>
          <div className="pb-5" style={{ borderBottom: "1px solid #ccc" }}>
            <ApprovalProjectView />
          </div>
          <div>
            <ApprovalProjectList />
          </div>
        </div>
      </div>
    </div>
  );
}
