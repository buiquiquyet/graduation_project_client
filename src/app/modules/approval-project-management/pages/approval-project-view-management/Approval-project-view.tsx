import { useFormik } from "formik";
import { Fragment } from "react/jsx-runtime";

import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import LibSwitchInput from "@/shared/libraries/lib-switch-input-component/libSwitchInput";
import { createValidationSchema } from "@/shared/validate";


import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import BaseFileUpload from "@/shared/component/base-dialog-file/BaseFileUpload";
import { memo, useCallback, useEffect, useState } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { ReducerProjectFund } from "@/shared/redux/selector";

import LibQillComponent from "@/shared/libraries/lib-qill-component/LibQillComponent";
import { getListCharityFundsForOptions } from "@/app/modules/charity-fund-management/services/Charity-fund.services";
import { Page } from "@/shared/ultils/Page";
import {
  convertToCommonOptions,
  mockFileData,
  updateOptionsFormInputs,
} from "@/shared/user-const";

import { InitProjectFund } from "@/shared/reducer/project-fund-slice/InitProjectFundProps";

import { getListCategorys } from "@/app/modules/category-management/services/Category.services";
import { ProjectFundProcessingDTO, ProjectFundProcessingFields } from "@/app/modules/project-fund-user-management/constants/Project-fund-user.interface";
import { ProjectFundProcessingEditConst } from "@/app/modules/project-fund-user-management/constants/Project-fund-user-edit.const";
import { getProjectFundProcessing } from "@/app/modules/project-fund-user-management/services/Project-fund-user.services";
export default memo(function ApprovalProjectViewComponent() {
  // check useContext
  const { setLoading,  } = useContextCommon();
  
  const reducerProjectFund = useSelector(ReducerProjectFund); // redux của dự án

  const [listFileNames, setListFileNames] = useState<any[]>([]); // mảng file image
  const [content, setContent] = useState(""); // value của mô tả dự án
  const [formInputsProjectFund, setFormInputsProjectFund] = useState(
    ProjectFundProcessingEditConst.arrProjectFundInfo
  ); // form input thông tin dự án

  // trả về thông tin dự án
  const handleGetInfoUser = (data?: any) => {
    return {
      [ProjectFundProcessingFields.NAME]:
        data?.[ProjectFundProcessingFields.NAME] ?? "",
      [ProjectFundProcessingFields.FUND_ID]:
        data?.[ProjectFundProcessingFields.FUND_ID] ?? "",
      [ProjectFundProcessingFields.CATEGORY_ID]:
        data?.[ProjectFundProcessingFields.CATEGORY_ID] ?? "",
      [ProjectFundProcessingFields.TARGET_AMOUNT]:
        data?.[ProjectFundProcessingFields.TARGET_AMOUNT] ?? "",
      [ProjectFundProcessingFields.START_DATE]:
        data?.[ProjectFundProcessingFields.START_DATE] ?? "",
      [ProjectFundProcessingFields.END_DATE]:
        data?.[ProjectFundProcessingFields.END_DATE] ?? "",
    };
  };

  const validationSchema = createValidationSchema(handleGetInfoUser());

  let initialValues: ProjectFundProcessingDTO | any = handleGetInfoUser(); // biến gán init của form submit
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
    },
  }); // biến gán form submit
  //=====
  // cập nhật list file image
  const onChangeImage = useCallback((newFileList: any[]) => {
    setListFileNames(newFileList);
  }, []);

  // lấy bản ghi của 1 dự án thông qua id
  const handleCallApiGetProjectFund = async (idFund: string) => {
    setLoading(true);
    const res: any = await getProjectFundProcessing(idFund);
    setLoading(false);
    if (res) {
      const data = res?.data?.data;
      formik.setValues(handleGetInfoUser(data));
      const fileListRes = data?.[ProjectFundProcessingFields.IMAGES]?.map(
        (fileName: string) => mockFileData(fileName)
      );
      setListFileNames(fileListRes); // SET LẠI FILE IMAGE
      setContent(data?.[ProjectFundProcessingFields.DESCRIPTION]); // set lại content mô tả dự án
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
          ProjectFundProcessingFields.FUND_ID,
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
          ProjectFundProcessingFields.CATEGORY_ID,
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
      reducerProjectFund?.[InitProjectFund.ID_ROW] 
    ) {
      handleCallApiGetProjectFund(reducerProjectFund?.[InitProjectFund.ID_ROW]);
    }
    
  }, [reducerProjectFund]);
  useEffect(() => {
    handleCallListCharityFund();
    handleCallListCategory();
    
  }, []);
  return (
    <form onSubmit={formik.handleSubmit} className=" user-inputs w-100 ">
      <div className="container row">
       
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
            <span>Ảnh </span>
            <BaseFileUpload
              onChange={onChangeImage}
              fileList={listFileNames}
              imgLength={4}
            />
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
    </form>
  );
});
