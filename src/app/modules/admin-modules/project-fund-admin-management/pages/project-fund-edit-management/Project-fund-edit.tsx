import { useFormik } from "formik";
import "./Project-fund-edit.scss";
import { Fragment } from "react/jsx-runtime";

import BaseButton from "@/shared/component/base-button/BaseButton";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import LibSwitchInput from "@/shared/libraries/lib-switch-input-component/libSwitchInput";
import {
  createValidationSchema,
  ValidateInputTextError,
  ValidationRules,
} from "@/shared/validate";

import { ProjectFundEditConst } from "../../constants/Project-fund-edit.const";
import {
  createProjectFund,
  getProjectFund,
  updateProjectFund,
} from "../../services/Project-fund.services";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import BaseFileUpload from "@/shared/component/base-dialog-file/BaseFileUpload";
import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReducerProjectFund } from "@/shared/redux/selector";

import LibQillComponent from "@/shared/libraries/lib-qill-component/LibQillComponent";
import { Page } from "@/shared/ultils/Page";
import {
  convertToCommonOptions,
  mockFileData,
  updateOptionsFormInputs,
} from "@/shared/user-const";
import {
  ProjectFundDTO,
  ProjectFundFields,
} from "../../constants/Project-fund.interface";
import { InitProjectFund } from "@/shared/reducer/project-fund-slice/InitProjectFundProps";
import {
  addIdRowProjectFund,
  addIsDelSuccessProjectFund,
  addIsEditProjectFund,
  addIsSubmitSuccessProjectFund,
} from "@/shared/reducer/project-fund-slice/ProjectFundSlice";
import { getListCharityFundsForOptions } from "../../../charity-fund-management/services/Charity-fund.services";
import { getListCategorys } from "../../../category-management/services/Category.services";
import BaseVideoFile from "@/shared/component/base-video-file/BaseVideoFile";
import * as Yup from "yup";
export default memo(function ProjectFundEdit() {
  // check useContext
  const { setLoading } = useContextCommon();

  const dispatch = useDispatch();
  const reducerProjectFund = useSelector(ReducerProjectFund); // redux của dự án

  const [listFileNames, setListFileNames] = useState<any[]>([]); // mảng file image
  const [listFileVideo, setListFileVideo] = useState<any[]>([]); // mảng file video
  const [content, setContent] = useState(""); // value của mô tả dự án
  const [formInputsProjectFund, setFormInputsProjectFund] = useState(
    ProjectFundEditConst.arrProjectFundInfo
  ); // form input thông tin dự án

  // trả về thông tin dự án
  const handleGetInfoUser = (data?: any) => {
    return {
      [ProjectFundFields.NAME]: data?.[ProjectFundFields.NAME] ?? "",
      [ProjectFundFields.FUND_ID]: data?.[ProjectFundFields.FUND_ID] ?? "",
      [ProjectFundFields.CATEGORY_ID]:
        data?.[ProjectFundFields.CATEGORY_ID] ?? "",
      [ProjectFundFields.TARGET_AMOUNT]:
        data?.[ProjectFundFields.TARGET_AMOUNT] ?? "",
      [ProjectFundFields.START_DATE]:
        data?.[ProjectFundFields.START_DATE] ?? "",
      [ProjectFundFields.END_DATE]: data?.[ProjectFundFields.END_DATE] ?? "",
    };
  };

  const customValidationRules: ValidationRules = {
    [ProjectFundFields.START_DATE]: Yup.string()
      .required(ValidateInputTextError.ERROR)
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Định dạng chưa đúng."),
    [ProjectFundFields.END_DATE]: Yup.string()
      .required(ValidateInputTextError.ERROR)
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Định dạng chưa đúng.")
      .test(
        "is-greater",
        "Ngày kết thúc phải lớn hơn ngày bắt đầu",
        function (value) {
          const { startDate } = this.parent;
          return !startDate || !value || new Date(value) > new Date(startDate);
        }
      ),
      [ProjectFundFields.TARGET_AMOUNT]: Yup.number()
        .required(ValidateInputTextError.ERROR)
        .min(1, 'Số tiền thấp nhất phải là 1')
        .max(1000000000, 'Số tiền không được vượt quá 100.000.000.000'),
  };
  const validationSchema = createValidationSchema(
    handleGetInfoUser(),
    customValidationRules
  );

  let initialValues: ProjectFundDTO | any = handleGetInfoUser(); // biến gán init của form submit
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      setLoading(true);
      // dữ liệu truyền lên
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Thêm hình ảnh từ listFileNames vào FormData
      if (listFileNames.length > 0) {
        listFileNames.forEach((file: any) => {
          formData.append(
            ProjectFundFields.IMAGES_IFORM_FILE,
            file.originFileObj
          );
        });
      }
      // THÊM video vào formData
      if (listFileVideo?.length > 0) {
        formData.append(
          ProjectFundFields.VIDEO_IFORM_FILE,
          listFileVideo[0]?.originFileObj
        );
      }
      formData.set(ProjectFundFields.DESCRIPTION, content); // dữ liệu của mô tả dự án
      let res: any = null;
      // nếu đang ở tạo mới dự án
      if (!reducerProjectFund?.[InitProjectFund.IS_EDIT]) {
        res = await createProjectFund(formData);

        // cập nhật dự án
      } else {
        res = await updateProjectFund(
          reducerProjectFund?.[InitProjectFund.ID_ROW],
          formData
        );
      }
      // nếu thành công gửi redux
      if (handleResponseInterceptor(res)) {
        dispatch(
          addIsSubmitSuccessProjectFund(
            !reducerProjectFund?.[InitProjectFund.IS_SUBMIT_SUCCESS]
          )
        );
        setContent(""); // set nội dung mô tả sau khi submit thành công
        // set lại form rỗng khi submit thành công
        formik.resetForm();
        setListFileNames([]);
        dispatch(addIdRowProjectFund("")); // set lại id row = ""
        dispatch(addIsEditProjectFund(false)); // set lại trạng thái edit  = false
      }
      setLoading(false);
    },
  }); // biến gán form submit
  //=====
  // cập nhật list file image
  const onChangeImage = useCallback((newFileList: any[]) => {
    setListFileNames(newFileList);
  }, []);
  // cập nhật list file video
  const onChangeVideo = useCallback((newFileList: any[]) => {
    setListFileVideo(newFileList);
  }, []);
  // lấy bản ghi của 1 dự án thông qua id
  const handleCallApiGetProjectFund = async (idFund: string) => {
    setLoading(true);
    const res: any = await getProjectFund(idFund);
    setLoading(false);
    if (res) {
      const data = res?.data?.data;
      formik.setValues(handleGetInfoUser(data));
      const fileListRes = data?.[ProjectFundFields.IMAGES]?.map(
        (fileName: string) => mockFileData(fileName)
      );
      setListFileNames(fileListRes); // SET LẠI FILE IMAGE
      setContent(data?.[ProjectFundFields.DESCRIPTION]); // set lại content mô tả dự án
    }
  };
  //==== Lấy option của list dự án
  const handleCallListCharityFund = async () => {
    let page: Page = new Page();
    page = { ...page, pageSize: 9999 };
    setLoading(true);
    const res: any = await getListCharityFundsForOptions(page);
    setLoading(false);
    if (handleResponseInterceptor(res, false)) {
      setFormInputsProjectFund((prevState) =>
        updateOptionsFormInputs(
          prevState,
          ProjectFundFields.FUND_ID,
          convertToCommonOptions(res?.data?.datas)
        )
      );
    }
  };
  //==== Lấy option của list danh mục
  const handleCallListCategory = async () => {
    let page: Page = new Page();
    page = { ...page, pageSize: 9999 };
    setLoading(true);
    const res: any = await getListCategorys(page);
    setLoading(false);
    if (handleResponseInterceptor(res, false)) {
      setFormInputsProjectFund((prevState) =>
        updateOptionsFormInputs(
          prevState,
          ProjectFundFields.CATEGORY_ID,
          convertToCommonOptions(res?.data?.datas)
        )
      );
    }
  };
  //========= change value của mô tả dự án
  const onChangeDescription = (text: string) => {
    setContent(text);
  };
  useEffect(() => {
    if (
      reducerProjectFund?.[InitProjectFund.ID_ROW] &&
      !reducerProjectFund?.[InitProjectFund.IS_DEL_SUCCESS]
    ) {
      handleCallApiGetProjectFund(reducerProjectFund?.[InitProjectFund.ID_ROW]);
    }
    if (reducerProjectFund?.[InitProjectFund.IS_DEL_SUCCESS]) {
      // set lại form rỗng khi submit delete thành công
      formik.resetForm();
      setListFileNames([]);
      setListFileVideo([]);
      dispatch(addIsDelSuccessProjectFund(false)); // set lại trạng thái submit delete  = false
      dispatch(addIdRowProjectFund("")); // set lại id row = ""
      dispatch(addIsEditProjectFund(false)); // set lại trạng thái edit  = false
    }
  }, [reducerProjectFund]);
  useEffect(() => {
    handleCallListCharityFund();
    handleCallListCategory();
  }, []);
  return (
    <form onSubmit={formik.handleSubmit} className=" user-inputs w-100 ">
      <div className="container row">
        <div className="user-label " style={{ padding: "0 15px 20px" }}>
          <h3 className="w-100" style={{ textAlign: "center" }}>
            Thêm mới
          </h3>
        </div>
        <div className="user-info col-12 col-sm-12 col-md-12 col-lg-6 ">
          {formInputsProjectFund &&
            formInputsProjectFund.length > 0 &&
            formInputsProjectFund.map((item, index) => (
              <Fragment key={index}>
                <div className="input-label">
                  <LibSwitchInput item={item} formik={formik} />
                </div>
              </Fragment>
            ))}

          {/* tải ảnh */}
          <div className="input-label">
            <span>Tải ảnh </span>
            <BaseFileUpload
              onChange={onChangeImage}
              fileList={listFileNames}
              imgLength={4}
            />
          </div>
          <div className="input-label">
            <span>Tải video </span>
            <BaseVideoFile onChange={onChangeVideo} fileList={listFileVideo} />
          </div>
        </div>
        <div
          className="user-info col-12 col-sm-12 col-md-12 col-lg-6"
          style={{ gap: "0" }}
        >
          <div className="w-100">
            <span style={{ fontSize: "14px" }}>Mô tả dự án</span>
          </div>
          <LibQillComponent content={content} onChange={onChangeDescription} />
        </div>
      </div>
      <div>
        <BaseButton
          disabled={
            listFileNames?.length === 0 ||
            listFileNames?.includes(undefined) ||
            !content
          }
          title={`${
            reducerProjectFund?.[InitProjectFund.IS_EDIT]
              ? "Cập nhật"
              : "Thêm mới"
          }`}
        />
      </div>
    </form>
  );
});
