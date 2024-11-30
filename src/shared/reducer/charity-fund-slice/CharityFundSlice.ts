import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitCharityFund, InitCharityFundProps } from "./InitCharityFundProps";

const initialState: InitCharityFundProps = {
  [InitCharityFund.ID_ROW]: "",
  [InitCharityFund.IS_SUBMIT_SUCCESS]: false,
  [InitCharityFund.IS_EDIT]: false,
  [InitCharityFund.IS_DEL_SUCCESS]: false,
};

const CharityFundSlice = createSlice({
  name: "charityFund",
  initialState,
  reducers: {
    // lấy id của 1 row table quỹ
    addIdRow: (state: InitCharityFundProps, action: PayloadAction<string>) => {
      state[InitCharityFund.ID_ROW] = action.payload;
    },
    // check xem khi create thành công hoặc sửa quỹ thành công thì load lại table
    addIsSubmitSuccess: (
      state: InitCharityFundProps,
      action: PayloadAction<boolean>
    ) => {
      state[InitCharityFund.IS_SUBMIT_SUCCESS] = action.payload;
    },
    // check xem khi create thành công hoặc sửa quỹ thành công thì load lại table
    addIsEdit: (
      state: InitCharityFundProps,
      action: PayloadAction<boolean>
    ) => {
      state[InitCharityFund.IS_EDIT] = action.payload;
    },
    // khi xoá list table thành công
    addIsDelSuccess: (
      state: InitCharityFundProps,
      action: PayloadAction<boolean>
    ) => {
      state[InitCharityFund.IS_DEL_SUCCESS] = action.payload;
    },
  },
});

// Xuất các actions
export const { addIdRow, addIsSubmitSuccess, addIsEdit, addIsDelSuccess } =
  CharityFundSlice.actions;

// Xuất reducer để kết hợp với rootReducer
export default CharityFundSlice.reducer;
