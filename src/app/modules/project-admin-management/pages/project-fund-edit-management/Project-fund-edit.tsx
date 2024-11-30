import { useFormik } from "formik";
import "./Project-fund-edit.scss";
import { Fragment } from "react/jsx-runtime";

import BaseButton from "@/shared/component/base-button/BaseButton";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import LibSwitchInput from "@/shared/libraries/lib-switch-input-component/libSwitchInput";
import { createValidationSchema } from "@/shared/validate";

import {
  CharityFundDTO,
  ProjectFund,
} from "../../constants/Project-fund.interface";
import { ProjectFundEditConst } from "../../constants/Project-fund-edit.const";
import {
  createCharityFund,
  getCharityFund,
  updateCharityFund,
} from "../../services/Project-fund.services";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import BaseFileUpload from "@/shared/component/base-dialog-file/BaseFileUpload";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerCharityFund } from "@/shared/redux/selector";
import { InitCharityFund } from "@/shared/reducer/charity-fund-slice/InitCharityFundProps";
import {
  addIdRow,
  addIsDelSuccess,
  addIsEdit,
  addIsSubmitSuccess,
} from "@/shared/reducer/charity-fund-slice/CharityFundSlice";
import LibQillComponent from "@/shared/libraries/lib-qill-component/LibQillComponent";
export default function ProjectFundEdit() {
  // check useContext
  const { setLoading } = useContextCommon();

  const dispatch = useDispatch();
  const reducerCharityFund = useSelector(ReducerCharityFund); // redux của quỹ

  const [listFileNames, setListFileNames] = useState<any[]>([]); // mảng file image
  const [content, setContent] = useState(""); // value của mô tả dự án
  // form input thông tin quỹ
  const formInputsInfoCharityFund: any[] =
    ProjectFundEditConst.arrProjectFundInfo;

  // trả về thông tin dự án
  const handleGetInfoUser = (data?: any) => {
    return {
      [ProjectFund.NAME]: data?.[ProjectFund.NAME] ?? "",
      [ProjectFund.FUND_ID]: data?.[ProjectFund.FUND_ID] ?? "",
      [ProjectFund.TARGET_AMOUNT]: data?.[ProjectFund.TARGET_AMOUNT] ?? "",
      [ProjectFund.DESCRIPTION]:
        data?.[ProjectFund.DESCRIPTION] ?? "",
      [ProjectFund.START_DATE]: data?.[ProjectFund.START_DATE] ?? "",
      [ProjectFund.END_DATE]: data?.[ProjectFund.END_DATE] ?? "",
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
        [ProjectFund.IMAGES]: listFileNames[0]?.originFileObj,
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
      setListFileNames([res?.data?.data?.[ProjectFund.IMAGES]]);
    }
  };
  //========= change value của mô tả dự án
  const onChangeDescription = (text: string) => {
    setContent(text);
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
    <form onSubmit={formik.handleSubmit} className=" user-inputs w-100 ">
      <div className="container row">
        <div className="user-label " style={{ padding: "0 15px 20px" }}>
          <h3 className="w-100" style={{ textAlign: "center" }}>
            Thêm dự án mới
          </h3>
        </div>
        <div className="user-info col-12 col-sm-12 col-md-12 col-lg-6 ">
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
        <div
          className="user-info col-12 col-sm-12 col-md-12 col-lg-6"
          style={{ gap: "0" }}
        >
          <div className="w-100">
            <span>Mô tả dự án</span>
          </div>
          <LibQillComponent content={content} onChange={onChangeDescription} />
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
}
