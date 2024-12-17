import "./ApprovalEmissary.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addIdRowProjectFund,
  addIsEditProjectFund,
} from "@/shared/reducer/project-fund-slice/ProjectFundSlice";
import ApprovalEmissaryList from "./pages/Approval-emissary-list";
export default function ApprovalEmissaryComponent() {
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
            <h1>Danh sách duyệt trở thành sứ giả</h1>
          </div>
        </div>
        <div className="container d-flex flex-column " style={{ gap: "40px" }}>
          <div>
            <ApprovalEmissaryList />
          </div>
        </div>
      </div>
    </div>
  );
}
