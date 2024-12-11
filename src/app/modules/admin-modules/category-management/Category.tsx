import { memo, useEffect } from "react";
import "./Category.scss";
import CategoryEdit from "./pages/category-edit-management/Category-edit";
import CategoryList from "./pages/category-list-management/Category-list";
import { useDispatch } from "react-redux";
import { addIdRowCategory, addIsDelSuccessCategory, addIsEditCategory, addIsSubmitSuccessCategory } from "@/shared/reducer/category-slice/CategorySlice";
export default memo(function CategoryComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(addIdRowCategory(""));
      dispatch(addIsSubmitSuccessCategory(false));
      dispatch(addIsEditCategory(false));
      dispatch(addIsDelSuccessCategory(false));
    };
  }, [])
  return (
    <div className="category-management">
      <div className="user-wrapper">
        <div className="user-avatar">
          <div>
            <h1>Danh sách các danh mục thiện nguyện</h1>
          </div>
        </div>
        <div className="container row d-flex flex-column align-items-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-6 mb-5">
            <CategoryEdit />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-6">
            <CategoryList />
          </div>
        </div>
      </div>
    </div>
  );
});
