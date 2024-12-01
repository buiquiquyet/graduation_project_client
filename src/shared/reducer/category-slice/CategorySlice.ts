import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitCategory, InitCategoryProps } from "./InitCategoryProps";

const initialState: InitCategoryProps = {
  [InitCategory.ID_ROW]: "",
  [InitCategory.IS_SUBMIT_SUCCESS]: false,
  [InitCategory.IS_EDIT]: false,
  [InitCategory.IS_DEL_SUCCESS]: false,
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    // lấy id của 1 row table quỹ
    addIdRowCategory: (state: InitCategoryProps, action: PayloadAction<string>) => {
      state[InitCategory.ID_ROW] = action.payload;
    },
    // check xem khi create thành công hoặc sửa quỹ thành công thì load lại table
    addIsSubmitSuccessCategory: (
      state: InitCategoryProps,
      action: PayloadAction<boolean>
    ) => {
      state[InitCategory.IS_SUBMIT_SUCCESS] = action.payload;
    },
    // check xem khi create thành công hoặc sửa quỹ thành công thì load lại table
    addIsEditCategory: (
      state: InitCategoryProps,
      action: PayloadAction<boolean>
    ) => {
      state[InitCategory.IS_EDIT] = action.payload;
    },
    // khi xoá list table thành công
    addIsDelSuccessCategory: (
      state: InitCategoryProps,
      action: PayloadAction<boolean>
    ) => {
      state[InitCategory.IS_DEL_SUCCESS] = action.payload;
    },
  },
});

// Xuất các actions
export const { addIdRowCategory, addIsSubmitSuccessCategory, addIsEditCategory, addIsDelSuccessCategory } =
  CategorySlice.actions;

// Xuất reducer để kết hợp với rootReducer
export default CategorySlice.reducer;
