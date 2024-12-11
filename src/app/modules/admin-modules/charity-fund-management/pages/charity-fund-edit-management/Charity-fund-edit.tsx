import { useFormik } from "formik";
import "./Charity-fund-edit.scss";
import { Fragment } from "react/jsx-runtime";

import BaseButton from "@/shared/component/base-button/BaseButton";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import LibSwitchInput from "@/shared/libraries/lib-switch-input-component/libSwitchInput";
import { createValidationSchema } from "@/shared/validate";

import {
  CharityFundDTO,
  CharityFundFields,
} from "../../constants/charity-fund.interface";
import { CharityFundEditConst } from "../../constants/charity-fund-edit.const";
import {
  createCharityFund,
  getCharityFund,
  updateCharityFund,
} from "../../services/Charity-fund.services";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import BaseFileUpload from "@/shared/component/base-dialog-file/BaseFileUpload";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerCharityFund } from "@/shared/redux/selector";
import { InitCharityFund } from "@/shared/reducer/charity-fund-slice/InitCharityFundProps";
import {
  addIdRow,
  addIsDelSuccess,
  addIsEdit,
  addIsSubmitSuccess,
} from "@/shared/reducer/charity-fund-slice/CharityFundSlice";
export default memo(function CharityFundEdit() {
  // check useContext
  const { setLoading } = useContextCommon();

  const dispatch = useDispatch();
  const reducerCharityFund = useSelector(ReducerCharityFund); // redux của quỹ

  const [listFileNames, setListFileNames] = useState<any[]>([]); // mảng file image
  // form input thông tin quỹ
  const formInputsInfoCharityFund: any[] =
    CharityFundEditConst.arrCharityFundInfo;
  // trả về thông tin quỹ
  const handleGetInfoUser = (data?: any) => {
    return {
      [CharityFundFields.NAME]: data?.[CharityFundFields.NAME] ?? "",
      [CharityFundFields.EMAIL]: data?.[CharityFundFields.EMAIL] ?? "",
      [CharityFundFields.PHONE]: data?.[CharityFundFields.PHONE] ?? "",
      [CharityFundFields.DESCRIPTION]:
        data?.[CharityFundFields.DESCRIPTION] ?? "",
      [CharityFundFields.ADDRESS]: data?.[CharityFundFields.ADDRESS] ?? "",
    };
  };

  const validationSchema = createValidationSchema(handleGetInfoUser());

  let initialValues: CharityFundDTO | any = handleGetInfoUser(); // biến gán init của form submit
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      setLoading(true);
      // dữ liệu truyền lên
      const requestBody = {
        ...values,
        [CharityFundFields.IMAGES_IFORM_FILE]: listFileNames[0]?.originFileObj,
      };
      let res: any = null;
      // nếu đang ở tạo mới quỹ
      if (!reducerCharityFund?.[InitCharityFund.IS_EDIT]) {
        res = await createCharityFund(requestBody);

        // cập nhật quỹ
      } else {
        res = await updateCharityFund(
          reducerCharityFund?.[InitCharityFund.ID_ROW],
          requestBody
        );
      }
      // nếu thành công gửi redux
      if (handleResponseInterceptor(res)) {
        dispatch(
          addIsSubmitSuccess(
            !reducerCharityFund?.[InitCharityFund.IS_SUBMIT_SUCCESS]
          )
        );
        // set lại form rỗng khi submit thành công
        formik.resetForm();
        setListFileNames([]);
        dispatch(addIdRow("")); // set lại id row = ""
        dispatch(addIsEdit(false)); // set lại trạng thái edit  = false
      }
      setLoading(false);
    },
  }); // biến gán form submit
  //=====
  // cập nhật list file image
  const onChangeImage = useCallback((newFileList: any[]) => {
    setListFileNames(newFileList);
  }, []);

  // lấy bản ghi của 1 quỹ thông qua id
  const handleCallApiGetCharityFund = async (idFund: string) => {
    setLoading(true);
    const res: any = await getCharityFund(idFund);
    setLoading(false);
    if (res) {
      formik.setValues(handleGetInfoUser(res?.data?.data));
      setListFileNames([res?.data?.data?.[CharityFundFields.IMAGES]]);
    }
  };
  useEffect(() => {
    if (
      reducerCharityFund?.[InitCharityFund.ID_ROW] &&
      !reducerCharityFund?.[InitCharityFund.IS_DEL_SUCCESS]
    ) {
      handleCallApiGetCharityFund(reducerCharityFund?.[InitCharityFund.ID_ROW]);
    }
    if (reducerCharityFund?.[InitCharityFund.IS_DEL_SUCCESS]) {
      // set lại form rỗng khi submit delete thành công
      formik.resetForm();
      setListFileNames([]);
      dispatch(addIsDelSuccess(false)); // set lại trạng thái submit delete  = false
      dispatch(addIdRow("")); // set lại id row = ""
      dispatch(addIsEdit(false)); // set lại trạng thái edit  = false
    }
    
  }, [reducerCharityFund]);
  return (
    <form onSubmit={formik.handleSubmit} className=" user-inputs w-100">
      <div className="user-info ">
        <div className="user-label">
          <h3 className="w-100">Thêm mới</h3>
        </div>
        {formInputsInfoCharityFund &&
          formInputsInfoCharityFund.length > 0 &&
          formInputsInfoCharityFund.map((item, index) => (
            <Fragment key={index}>
              <div className="input-label">
                <LibSwitchInput item={item} formik={formik} />
              </div>
            </Fragment>
          ))}
        {/* tải ảnh */}
        <div className="input-label">
          <span>Ảnh </span>
          <BaseFileUpload
            onChange={onChangeImage}
            fileList={listFileNames}
            imgLength={1}
          />
        </div>
      </div>
      <div>
        <BaseButton
          disabled={
            listFileNames?.length === 0 || listFileNames?.includes(undefined)
          }
          title={`${
            reducerCharityFund?.[InitCharityFund.IS_EDIT]
              ? "Cập nhật"
              : "Thêm mới"
          }`}
        />
      </div>
    </form>
  );
});
