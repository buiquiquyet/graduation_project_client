import { useFormik } from "formik";
import "./Charity-fund-edit.scss";
import { Fragment } from "react/jsx-runtime";

import BaseButton from "@/shared/component/base-button/BaseButton";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import LibSwitchInput from "@/shared/libraries/lib-switch-input-component/LibSwitchInput";
import { createValidationSchema } from "@/shared/validate";

import {
  CharityFundDTO,
  CharityFundFields,
} from "../../constants/charity-fund.interface";
import { CharityFundEditConst } from "../../constants/charity-fund-edit.const";
import {
  createCharityFund,
} from "../../services/Charity-fund.services";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import BaseFileUpload from "@/shared/component/base-dialog-file/BaseFileUpload";
import { useCallback, useState } from "react";
export default function CharityFundEdit() {
  // check useContext
  const { setLoading } = useContextCommon();
  const [listFileNames, setListFileNames] = useState([] as any[]);
  // form input thông tin quỹ
  const formInputsInfoCharityFund: any[] = CharityFundEditConst.arrCharityFundInfo;
  // trả về thông tin user
  const handleGetInfoUser = () => {
    return {
      [CharityFundFields.NAME]: "",
      [CharityFundFields.EMAIL]: "",
      [CharityFundFields.PHONE]: "",
      [CharityFundFields.DESCRIPTION]: "",
      [CharityFundFields.ADDRESS]: "",
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
      const res: any = await createCharityFund(requestBody);
      setLoading(false);
      if (handleResponseInterceptor(res)) {
      }
    },
  }); // biến gán form submit
  //=====
  // cập nhật list file image
  const onChangeImage = useCallback((newFileList: any[]) => {
    setListFileNames(newFileList);
  }, []);

  
  return (
    <form onSubmit={formik.handleSubmit} className=" user-inputs w-100">
      <div className="user-info ">
        <div className="user-label">
          <h3 className="w-100">Thêm mới quỹ đầu tư</h3>
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
        <BaseButton disabled={listFileNames?.length === 0} title="Thêm mới" />
      </div>
    </form>
  );
}
