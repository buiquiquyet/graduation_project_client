import { useFormik } from "formik";
import { Fragment } from "react/jsx-runtime";

import BaseButton from "@/shared/component/base-button/BaseButton";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import LibSwitchInput from "@/shared/libraries/lib-switch-input-component/libSwitchInput";
import { createValidationSchema } from "@/shared/validate";

import {
  CategoryDTO,
  CategoryFields,
} from "../../constants/category.interface";
import { CategoryEditConst } from "../../constants/category-edit.const";
import {
  createCategory,
  getCategory,
  updateCategory,
} from "../../services/Category.services";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerCategory } from "@/shared/redux/selector";

import { InitCategory } from "@/shared/reducer/category-slice/InitCategoryProps";
import {
  addIdRowCategory,
  addIsDelSuccessCategory,
  addIsEditCategory,
  addIsSubmitSuccessCategory,
} from "@/shared/reducer/category-slice/CategorySlice";
export default memo(function CategoryEdit() {
  // check useContext
  const { setLoading } = useContextCommon();

  const dispatch = useDispatch();
  const reducerCategory = useSelector(ReducerCategory); // redux của quỹ

  // form input thông tin quỹ
  const formInputsInfoCharityFund: any[] = CategoryEditConst.arrCategoryInfo;
  // trả về thông tin quỹ
  const handleGetInfoUser = (data?: any) => {
    return {
      [CategoryFields.NAME]: data?.[CategoryFields.NAME] ?? "",
    };
  };

  const validationSchema = createValidationSchema(handleGetInfoUser());

  let initialValues: CategoryDTO | any = handleGetInfoUser(); // biến gán init của form submit
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      setLoading(true);
      // dữ liệu truyền lên
      const requestBody = {
        ...values,
      };
      let res: any = null;
      // nếu đang ở tạo mới quỹ
      if (!reducerCategory?.[InitCategory.IS_EDIT]) {
        res = await createCategory(requestBody);

        // cập nhật quỹ
      } else {
        res = await updateCategory(
          reducerCategory?.[InitCategory.ID_ROW],
          requestBody
        );
      }
      // nếu thành công gửi redux
      if (handleResponseInterceptor(res)) {
        dispatch(
          addIsSubmitSuccessCategory(
            !reducerCategory?.[InitCategory.IS_SUBMIT_SUCCESS]
          )
        );
        // set lại form rỗng khi submit thành công
        formik.resetForm();
        dispatch(addIdRowCategory("")); // set lại id row = ""
        dispatch(addIsEditCategory(false)); // set lại trạng thái edit  = false
      }
      setLoading(false);
    },
  }); // biến gán form submit
  //=====
  // cập nhật list file image

  // lấy bản ghi của 1 quỹ thông qua id
  const handleCallApiGetCharityFund = async (idFund: string) => {
    setLoading(true);
    const res: any = await getCategory(idFund);
    setLoading(false);
    if (res) {
      formik.setValues(handleGetInfoUser(res?.data?.data));
    }
  };
  useEffect(() => {
    if (
      reducerCategory?.[InitCategory.ID_ROW] &&
      !reducerCategory?.[InitCategory.IS_DEL_SUCCESS]
    ) {
      handleCallApiGetCharityFund(reducerCategory?.[InitCategory.ID_ROW]);
    }
    if (reducerCategory?.[InitCategory.IS_DEL_SUCCESS]) {
      // set lại form rỗng khi submit delete thành công
      formik.resetForm();
      dispatch(addIsDelSuccessCategory(false)); // set lại trạng thái submit delete  = false
      dispatch(addIdRowCategory("")); // set lại id row = ""
      dispatch(addIsEditCategory(false)); // set lại trạng thái edit  = false
    }
  }, [reducerCategory]);
  return (
    <form onSubmit={formik.handleSubmit} className=" user-inputs w-100">
      <div className="user-info ">
        <div className="user-label">
          <h3 className="w-70">Thêm mới</h3>
        </div>
        {formInputsInfoCharityFund &&
          formInputsInfoCharityFund.length > 0 &&
          formInputsInfoCharityFund.map((item, index) => (
            <Fragment key={index}>
              <div className="input-label">
                <span>{item?.label}</span>
                <LibSwitchInput item={item} formik={formik} />
              </div>
            </Fragment>
          ))}
      </div>
      <div>
        <BaseButton
          title={`${
            reducerCategory?.[InitCategory.IS_EDIT] ? "Cập nhật" : "Thêm mới"
          }`}
        />
      </div>
    </form>
  );
});
