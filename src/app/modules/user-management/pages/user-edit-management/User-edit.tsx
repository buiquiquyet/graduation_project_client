import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useFormik } from "formik";
import { UserEditConst } from "../../constants/User-edit.const";
import { Fragment } from "react/jsx-runtime";

import { memo, useCallback, useEffect, useState } from "react";
import {
  getCitys,
  getDistricts,
  getWards,
} from "../../services/User-edit.services";
import BaseButton from "@/shared/component/base-button/BaseButton";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import { updateUser } from "../../services/User.services";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import { UserFields, UsersDTO } from "../../constants/User.interface";
import "./User-edit.scss";
import { createValidationSchema } from "@/shared/validate";
import {
  convertToCommonOptions,
  updateOptionsFormInputs,
} from "@/shared/user-const";
import LibSwitchInput from "@/shared/libraries/lib-switch-input-component/libSwitchInput";
import BaseFileUpload from "@/shared/component/base-dialog-file/BaseFileUpload";
export default memo(function UserEdit() {
  // check useContext
  const { setLoading, dataUser } = useContextCommon();
  const [formInputsInfoAddress, setFormInputsInfoAddress] = useState(
    UserEditConst.arrPersonLocation
  ); // form input thông tin địa chỉ
  const formInputsInfoUser: any[] = UserEditConst.arrPersonInfo; // form input thông tin cá nhân
  const [listFileNames, setListFileNames] = useState<any[]>([]); // mảng file image
  // trả về thông tin user
  const handleGetInfoUser = () => {
    return {
      [UserFields.FULL_NAME]: dataUser?.[UserFields.FULL_NAME],
      [UserFields.PASS_WORD]: dataUser?.[UserFields.PASS_WORD],
      [UserFields.PHONE]: dataUser?.[UserFields.PHONE],
      [UserFields.GENDER]:
        dataUser?.[UserFields.GENDER] || UserEditConst.optionGender[0].value,
      [UserFields.BIRTH_DAY]: dataUser?.[UserFields.BIRTH_DAY] ?? null,
      [UserFields.CITY]: dataUser?.[UserFields.CITY],
      [UserFields.WARD]: dataUser?.[UserFields.WARD],
      [UserFields.DISTRICT]: dataUser?.[UserFields.DISTRICT],
      [UserFields.ADDRESS]: dataUser?.[UserFields.ADDRESS],
    };
  };

  const validationSchema = createValidationSchema(handleGetInfoUser());

  let initialValues: UsersDTO | any = handleGetInfoUser(); // biến gán init của form submit
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      // dữ liệu truyền lên
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      listFileNames.forEach((file: any) => {
        formData.append(UserFields.CCCD_IFORM_FILE, file.originFileObj);
      });
      setLoading(true);
      const res: any = await updateUser(
        dataUser?.[UserFields.ID] ?? "",
        formData
      );
      setLoading(false);
      if (handleResponseInterceptor(res)) {
      }
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
  // cập nhật list file image
  const onChangeImage = useCallback((newFileList: any[]) => {
    setListFileNames(newFileList);
  }, []);
  useEffect(() => {
    getDataCity();
  }, []);
  useEffect(() => {
    if (dataUser) {
      initialValues = handleGetInfoUser();
      formik.setValues(initialValues);
      setListFileNames(dataUser?.[UserFields.CCCD]); // SET LẠI FILE IMAGE
      //nếu có code của quận huyện
      if (dataUser?.[UserFields.DISTRICT]) {
        getDataWard(dataUser?.[UserFields.DISTRICT]);
      }
      // nếu có code của city
      if (dataUser?.[UserFields.CITY]) {
        getDataDistrict(dataUser?.[UserFields.CITY]);
      }
    }
  }, [dataUser]);

  return (
    <form onSubmit={formik.handleSubmit} className="user-inputs container">
      <div className="row w-100">
        <div className="user-info col-12 col-sm-12 col-md-12 col-lg-6">
          <div className="user-label">
            <FaUser />
            <h3 className="w-100">Thông tin cá nhân</h3>
          </div>
          {formInputsInfoUser &&
            formInputsInfoUser.length > 0 &&
            formInputsInfoUser.map((item, index) => (
              <Fragment key={index}>
                <div className="input-label">
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
            <h3 className="w-100">Địa chỉ</h3>
          </div>
          {formInputsInfoAddress &&
            formInputsInfoAddress.length > 0 &&
            formInputsInfoAddress.map((item, index) => (
              <Fragment key={index}>
                <div className="input-label">
                  <LibSwitchInput
                    item={item}
                    formik={formik}
                    onChange={onChange}
                  />
                </div>
              </Fragment>
            ))}
          <div className="input-label">
            <span>Tải lên cccd </span>
            <BaseFileUpload
              onChange={onChangeImage}
              fileList={listFileNames}
              imgLength={2}
            />
          </div>
        </div>
      </div>
      <div>
        <BaseButton disabled={listFileNames?.length !== 2} title="Cập nhật" />
      </div>
    </form>
  );
});
