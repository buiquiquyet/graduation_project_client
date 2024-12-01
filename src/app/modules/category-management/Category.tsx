import "./Category.scss";
import CategoryEdit from "./pages/category-edit-management/Category-edit";
import CategoryList from "./pages/category-list-management/Category-list";
export default function CategoryComponent() {
  
  return (
    <div className="category-management">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div>
            <h1>Danh sách các danh mục thiện nguyện</h1>
          </div>
        </div>
        <div className="container row d-flex">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6" >
            <CategoryEdit />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <CategoryList />
          </div>
        </div>
        
      </div>
    </div>
  );
}
