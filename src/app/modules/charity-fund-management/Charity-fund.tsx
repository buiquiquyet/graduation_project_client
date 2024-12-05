import { memo } from "react";
import "./Charity-fund.scss";
import CharityFundEdit from "./pages/charity-fund-edit-management/Charity-fund-edit";
import CharityFundList from "./pages/charity-fund-list-management/Charity-fund-list";
export default memo(function CharityFundComponent() {
  return (
    <div className="charity-fund-management">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div>
            <h1>Danh sách các quỹ đầu tư</h1>
          </div>
        </div>
        <div className="container ">
          <div className="row">
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 mb-4">
              <CharityFundEdit />
            </div>
            <div className="col-12 col-sm-12 col-md-12 col-lg-8">
              <CharityFundList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
