import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import { Fragment } from "react/jsx-runtime";

import { useEffect, useState } from "react";

import BaseButton from "@/shared/component/base-button/BaseButton";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import "./User-edit.scss";
import LibSwitchInput from "@/shared/libraries/lib-switch-input-component/LibSwitchInput";
import { createValidationSchema } from "@/shared/validate";
import {
  convertToCommonOptions,
  updateOptionsFormInputs,
} from "@/shared/user-const";
import { UserFields } from "../../user-management/constants/User.interface";
import { CharityPost, CharityPostDTO } from "../constants/Admin.interface";
export default function UserEdit() {
  // check useContext
  const { setLoading, dataUser } = useContextCommon();
  const [formInputsInfoAddress, setFormInputsInfoAddress] = useState(
    UserEditConst.arrPersonLocation
  ); // form input thông tin địa chỉ
  const formInputsInfoUser: any[] = UserEditConst.arrPersonInfo; // form input thông tin cá nhân
  // trả về thông tin user
  const handleGetInfoUser = () => {
    return {
      [CharityPost.NAME]: dataUser?.[CharityPost.NAME], // tên chiến dịch
      [CharityPost.FUND_ID]: dataUser?.[CharityPost.FUND_ID], // id quỹ
      [CharityPost.IMAGES]: dataUser?.[CharityPost.IMAGES], // ảnh
      [CharityPost.DESCRIPTION]: dataUser?.[CharityPost.DESCRIPTION], // ghi chú
      [CharityPost.CURRENT_AMOUNT]: dataUser?.[CharityPost.CURRENT_AMOUNT], // số tiền hiện tại
      [CharityPost.TARGET_AMOUNT]: dataUser?.[CharityPost.TARGET_AMOUNT], // số tiền mục tiêu
      [CharityPost.START_DATE]: dataUser?.[CharityPost.START_DATE], // ngày bắt đầu
      [CharityPost.END_DATE]: dataUser?.[CharityPost.END_DATE], // ngày kết thúc
      
    };
  };

  const validationSchema = createValidationSchema(handleGetInfoUser());

  let initialValues: CharityPostDTO | any = handleGetInfoUser(); // biến gán init của form submit
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      setLoading(true);
    //   const res: any = await updateUser(dataUser?.[UserFields.ID] ?? "", {
    //     ...(dataUser ?? {}),
    //     ...values,
    //   });
      setLoading(false);
    //   if (handleResponseInterceptor(res)) {
    //   }
    },
  }); // biến gán form submit
  //=====
  const onChange = async (value: UserFields, id: string | number) => {
    if (value === UserFields.CITY) {
      formik.setFieldValue(UserFields.DISTRICT, null);
      formik.setFieldValue(UserFields.WARD, null);
      getDataDistrict(id);
    } else if (value === UserFields.DISTRICT) {
      formik.setFieldValue(UserFields.WARD, null);
      getDataWard(id);
    }
  };
  // get api thành  phố
  const getDataCity = async () => {
    const res: any = await getCitys();
    if (res) {
      // set lại opitons của thành phố
      setFormInputsInfoAddress((prevState) =>
        updateOptionsFormInputs(
          prevState,
          UserFields.CITY,
          convertToCommonOptions(res?.data?.data)
        )
      );
    }
  };
  // get api quận huyện
  const getDataDistrict = async (provinceId: string | number) => {
    const res: any = await getDistricts(provinceId);
    if (res) {
      // set lại opitons của phường xã
      setFormInputsInfoAddress((prevState) =>
        updateOptionsFormInputs(prevState, UserFields.WARD, [])
      );
      // set lại opitons của quận huyện
      setFormInputsInfoAddress((prevState) =>
        updateOptionsFormInputs(
          prevState,
          UserFields.DISTRICT,
          convertToCommonOptions(res?.data?.data)
        )
      );
    }
  };
  // get api phường xã
  const getDataWard = async (districtId: string | number) => {
    const res: any = await getWards(districtId);
    if (res) {
      // set lại opitons của phường xã
      setFormInputsInfoAddress((prevState) =>
        updateOptionsFormInputs(
          prevState,
          UserFields.WARD,
          convertToCommonOptions(res?.data?.data)
        )
      );
    }
  };

  useEffect(() => {
    getDataCity();
  }, []);
  useEffect(() => {
    if (dataUser) {
      initialValues = handleGetInfoUser();
      formik.setValues(initialValues);
      // nếu có code của city
      if (dataUser?.[UserFields.CITY]) {
        getDataDistrict(dataUser?.[UserFields.CITY]);
      }
      //nếu có code của quận huyện
      if (dataUser?.[UserFields.DISTRICT]) {
        getDataWard(dataUser?.[UserFields.DISTRICT]);
      }
    }
  }, [dataUser]);

  return (
    <form onSubmit={formik.handleSubmit} className="user-inputs container">
      <div className="row w-100">
        <div className="user-info col-12 col-sm-12 col-md-12 col-lg-6">
          <div className="user-label">
            <FaUser />
            <span className="w-100">Thông tin cá nhân</span>
          </div>
          {formInputsInfoUser &&
            formInputsInfoUser.length > 0 &&
            formInputsInfoUser.map((item, index) => (
              <Fragment key={index}>
                <div className="input-label">
                  <span>{item?.label}</span>
                  <LibSwitchInput
                    item={item}
                    formik={formik}
                    onChange={onChange}
                  />
                </div>
              </Fragment>
            ))}
        </div>
        <div className="user-info col-12 col-sm-12 col-md-12 col-lg-6">
          <div className="user-label">
            <FaMapMarkerAlt />
            <span className="w-100">Địa chỉ</span>
          </div>
          {formInputsInfoAddress &&
            formInputsInfoAddress.length > 0 &&
            formInputsInfoAddress.map((item: any, index: any) => (
              <Fragment key={index}>
                <div className="input-label">
                  <span>{item?.label}</span>
                  <LibSwitchInput
                    item={item}
                    formik={formik}
                    onChange={onChange}
                  />
                </div>
              </Fragment>
            ))}
        </div>
      </div>
      <div>
        <BaseButton title="Cập nhật" />
      </div>
    </form>
  );
}
