import { FaMapMarkerAlt, FaUser } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import { UserEditFields, UsersEditDTO } from "../constants/User-edit.interface";
import BaseMessageLog from "@/shared/libraries/message-log-text-component/MessageLogText";
import { UserEditConst } from "../constants/User-edit.const";
import { InputTypeEnum } from "@/shared/enums/inputType.enum";
import { Fragment } from "react/jsx-runtime";
import {
  Autocomplete,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getCitys,
  getDistricts,
  getWards,
} from "../services/User-edit.services";
import BaseButton from "@/shared/component/base-button/BaseButton";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";

export default function UserEdit() {
  // check useContext
  const { dataUser } = useContextCommon();
  const [dataCity, setDataCity] = useState([]); // data thành phố
  const [dataDistrict, setDataDistrict] = useState([]); // data quận huyện
  const [dataWard, setDataWard] = useState([]); // data phường xã
  const requiredStringSchema = Yup.string().required(
    "Thông tin không được để trống."
  );
 
  const arrPersonInfo: any[] = UserEditConst.arrPersonInfo;// mảng thông tin cá nhân 
  const arrPersonLocation: any[] = UserEditConst.arrPersonLocation;// mảng thông tin địa chỉ
 
  const validationSchema = Yup.object({
    [UserEditFields.FULL_NAME]: requiredStringSchema,
    [UserEditFields.PASS_WORD]: requiredStringSchema,
    [UserEditFields.PHONE]: requiredStringSchema,
    [UserEditFields.GENDER]: requiredStringSchema,
    [UserEditFields.BIRTH_DAY]: requiredStringSchema,
    [UserEditFields.CITY]: requiredStringSchema,
    [UserEditFields.WARD]: requiredStringSchema,
    [UserEditFields.DISTRICT]: requiredStringSchema,
    [UserEditFields.ADDRESS]: requiredStringSchema,
  });
  // trả về thông tin user
  const handleGetInfoUser = () => {
    return {
      [UserEditFields.FULL_NAME]: dataUser?.[UserEditFields.FULL_NAME],
      [UserEditFields.PASS_WORD]: dataUser?.[UserEditFields.PASS_WORD],
      [UserEditFields.PHONE]: dataUser?.[UserEditFields.PHONE],
      [UserEditFields.GENDER]:
        dataUser?.[UserEditFields.GENDER] ??
        UserEditConst.optionGender[0].value,
      [UserEditFields.BIRTH_DAY]: dataUser?.[UserEditFields.BIRTH_DAY],
      [UserEditFields.CITY]: dataUser?.[UserEditFields.CITY],
      [UserEditFields.WARD]: dataUser?.[UserEditFields.WARD],
      [UserEditFields.DISTRICT]: dataUser?.[UserEditFields.DISTRICT],
      [UserEditFields.ADDRESS]: dataUser?.[UserEditFields.ADDRESS],
    };
  };
  let initialValues: UsersEditDTO = handleGetInfoUser();// biến gán init của form submit
  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values: any) => {
      console.log(values);
    },
  }); // biến gán form submit
  
  const handleBlur = (fieldName: string) => {
    formik.setFieldTouched(fieldName, true);
  };
  const handleFocus = (fieldName: string) => {
    formik.setFieldTouched(fieldName, false);
  };
  //=====
  const onChangeSelect = async (value: UserEditFields, id: string | number) => {
    if (value === UserEditFields.CITY) {
      // setDataDistrict([]);
      setDataWard([]);
      getDataDistrict(id);
    }
    if (value === UserEditFields.DISTRICT) {
      getDataWard(id);
    }
  };
  // get api thành  phố
  const getDataCity = async () => {
    const res: any = await getCitys();
    if (res) {
      setDataCity(res?.data?.data);
    }
  };
  // get api quận huyện
  const getDataDistrict = async (provinceId: string | number) => {
    const res: any = await getDistricts(provinceId);
    if (res) {
      setDataDistrict(res?.data?.data);
    }
  };
  // get api phường xã
  const getDataWard = async (districtId: string | number) => {
    const res: any = await getWards(districtId);
    if (res) {
      setDataWard(res?.data?.data);
    }
  };
  // get options của select theo value cuả từng select
  const getOptionByValue = (value: UserEditFields) => {
    if (value === UserEditFields.CITY) return dataCity;
    if (value === UserEditFields.DISTRICT) return dataDistrict;
    if (value === UserEditFields.WARD) return dataWard;
    return [];
  };
  useEffect(() => {
    getDataCity();
  }, []);
  useEffect(() => {
    if (dataUser) {
      initialValues = handleGetInfoUser();
      formik.setValues(initialValues);
    }
  }, [dataUser]);
  
  return (
    <form onSubmit={formik.handleSubmit} className="user-inputs container ">
      <div className="row w-100">
        <div className="user-info col-sm-12 col-md-12 col-lg-6">
          <div className="user-label">
            <FaUser />
            <span className="w-100">Thông tin cá nhân</span>
          </div>
          {arrPersonInfo &&
            arrPersonInfo.length > 0 &&
            arrPersonInfo.map((item: any, index: number) => (
              <Fragment key={index}>
                <div className="w-100">
                  <div className="input-label">
                    <span>{item?.label}</span>
                    {item?.type === InputTypeEnum.INPUT ? (
                      <Input
                        type={`${item?.typeInput}`}
                        name={`${item?.value}`}
                        value={formik.values?.[`${item?.value}`] ?? ""}
                        onChange={formik.handleChange}
                        onBlur={() => handleBlur(item?.value)}
                        onFocus={() => handleFocus(item?.value)}
                        error={
                          formik.touched[item.value] &&
                          Boolean(formik.errors[item.value])
                        }
                      />
                    ) : (
                      <Select
                        className="text-color input100"
                        value={
                          formik.values?.[item?.value] ||
                          UserEditConst.optionGender[0].value
                        } // Đảm bảo giá trị mặc định nếu không có giá trị
                        onChange={(e) => {
                          formik.setFieldValue(item.value, e.target.value); // Cập nhật giá trị trong formik khi thay đổi
                        }}
                        onBlur={() => formik.handleBlur(item.value)} // Đánh dấu trường là "touched" khi mất focus
                        onFocus={() => handleFocus(item.value)} // Gọi hàm handleFocus nếu có
                        error={
                          formik.touched[item.value] &&
                          Boolean(formik.errors[item.value])
                        } // Kiểm tra lỗi và touched
                      >
                        {UserEditConst.optionGender.map(
                          (option: any, index: number) => (
                            <MenuItem key={index} value={option.value}>
                              {option.label}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    )}
                  </div>
                  {formik.errors?.[`${item?.value}`] &&
                  typeof formik.errors?.[`${item?.value}`] === "string" &&
                  formik.touched?.[`${item?.value}`] ? (
                    <BaseMessageLog
                      text={formik.errors?.[`${item?.value}`] ?? ""}
                    />
                  ) : null}
                </div>
              </Fragment>
            ))}
        </div>
        <div className="user-info col-sm-12 col-md-12 col-lg-6">
          <div className="user-label">
            <FaMapMarkerAlt />
            <span className="w-100">Địa chỉ</span>
          </div>
          {arrPersonLocation &&
            arrPersonLocation.length > 0 &&
            arrPersonLocation.map((item: any, index: number) => (
              <Fragment key={index}>
                <div className="w-100">
                  <div className="input-label">
                    <span>{item?.label}</span>
                    {item?.type === InputTypeEnum.INPUT ? (
                      <Input
                        type={`${item?.typeInput}`}
                        name={`${item?.value}`}
                        value={formik.values?.[`${item?.value}`] ?? ""}
                        onChange={formik.handleChange}
                        onBlur={() => handleBlur(item?.value)}
                        onFocus={() => handleFocus(item?.value)}
                        error={
                          formik.touched[item.value] &&
                          Boolean(formik.errors[item.value])
                        }
                      />
                    ) : (
                      <Autocomplete
                        options={getOptionByValue(item.value)}
                        getOptionLabel={(option: any) => option.name}
                        value={
                          getOptionByValue(item.value)?.find(
                            (option: any) =>
                              option.id === formik.values[item.value]
                          ) || null // Giữ giá trị đã chọn trong Formik
                        }
                        onChange={(_, newValue) => {
                          // Cập nhật giá trị trong Formik
                          formik.setFieldValue(item.value, newValue?.id || "");
                          // Đánh dấu trường đã được "touched" để Formik biết trường này đã thay đổi
                          formik.setFieldTouched(item.value, true);
                          onChangeSelect(item?.value, newValue?.id);
                        }}
                        onBlur={() => {
                          formik.handleBlur(item.value); // Đánh dấu trường là "touched"
                          formik.setFieldTouched(item.value, true); // Đảm bảo trường được đánh dấu là đã "touched"
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            error={
                              formik.touched[item.value] &&
                              Boolean(formik.errors[item.value])
                            }
                          />
                        )}
                      />
                    )}
                  </div>
                  {formik.errors?.[`${item?.value}`] &&
                  typeof formik.errors?.[`${item?.value}`] === "string" &&
                  formik.touched?.[`${item?.value}`] ? (
                    <BaseMessageLog
                      text={formik.errors?.[`${item?.value}`] ?? ""}
                    />
                  ) : null}
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
