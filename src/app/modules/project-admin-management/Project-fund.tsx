import "./Project-fund.scss";
import ProjectFundEdit from "./pages/project-fund-edit-management/Project-fund-edit";
import ProjectFundList from "./pages/project-fund-list-management/Project-fund-list";
export default function ProjectFund() {
 
  return (
    <div className="project-fund-management">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div>
            <h1>Danh sách các dự án</h1>
          </div>
        </div>
        <div className="container d-flex flex-column " style={{gap: '40px'}}>
          <div className="pb-5" style={{borderBottom: '1px solid #ccc'}}>
            <ProjectFundEdit />
          </div>
          <div >
            <ProjectFundList />
          </div>
        </div>
        
      </div>
    </div>
  );
}
