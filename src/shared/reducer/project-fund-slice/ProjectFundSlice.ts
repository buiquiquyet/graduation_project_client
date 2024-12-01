import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitProjectFund, InitProjectFundProps } from "./InitProjectFundProps";

const initialState: InitProjectFundProps = {
  [InitProjectFund.ID_ROW]: "",
  [InitProjectFund.IS_SUBMIT_SUCCESS]: false,
  [InitProjectFund.IS_EDIT]: false,
  [InitProjectFund.IS_DEL_SUCCESS]: false,
};

const ProjectFundSlice = createSlice({
  name: "projectFund",
  initialState,
  reducers: {
    // lấy id của 1 row table quỹ
    addIdRowProjectFund: (
      state: InitProjectFundProps,
      action: PayloadAction<string>
    ) => {
      state[InitProjectFund.ID_ROW] = action.payload;
    },
    // check xem khi create thành công hoặc sửa quỹ thành công thì load lại table
    addIsSubmitSuccessProjectFund: (
      state: InitProjectFundProps,
      action: PayloadAction<boolean>
    ) => {
      state[InitProjectFund.IS_SUBMIT_SUCCESS] = action.payload;
    },
    // check xem khi create thành công hoặc sửa quỹ thành công thì load lại table
    addIsEditProjectFund: (
      state: InitProjectFundProps,
      action: PayloadAction<boolean>
    ) => {
      state[InitProjectFund.IS_EDIT] = action.payload;
    },
    // khi xoá list table thành công
    addIsDelSuccessProjectFund: (
      state: InitProjectFundProps,
      action: PayloadAction<boolean>
    ) => {
      state[InitProjectFund.IS_DEL_SUCCESS] = action.payload;
    },
  },
});

// Xuất các actions
export const {
  addIdRowProjectFund,
  addIsSubmitSuccessProjectFund,
  addIsEditProjectFund,
  addIsDelSuccessProjectFund,
} = ProjectFundSlice.actions;

// Xuất reducer để kết hợp với rootReducer
export default ProjectFundSlice.reducer;
