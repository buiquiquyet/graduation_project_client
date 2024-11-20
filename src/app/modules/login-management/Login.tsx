import { MyContext } from "@/App";
import "./css/main.css";
import "./css/util.css";
import "./Login.scss";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { ClientKey } from "./constants/Login.enum";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { EHeaderTabKey } from "@/app/layout/header-management/constants/Header.enum";
import * as ApiServiceLoginSignIn from "./services/Login.service";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import BaseMessageLog from "@/shared/libraries/message-log-text-component/MessageLogText";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import VerifyEmailCode from "./pages/verifyEmailCode-management/VerifyEmailCode";
import {
  ToastMessage,
  ToastStatus,
} from "@/shared/libraries/message-log-component/MessageLog";
import {
  UserFields,
  UsersDTO,
} from "../user-management/constants/User.interface";

export default function Login() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const navigate = useNavigate();
  const { publicUrl } = context;
  const [toRegister, setToRegister] = useState(
    window.location.href.endsWith(EHeaderTabKey.SIGN_IN)
  );
  const [showPassword, setShowPassword] = useState(false);
  // set nếu có mã xác nhận gửi về
  const [isVerifyEmailCode, SetVerifyEmailCode] = useState(false);
  // email được gửi về verify
  const [emailSendToVerify, SetEmailSendToVerify] = useState("");
  // usecontext set loading
  const { setLoading, setAuthenticated, isAuthenticated } = useContextCommon();
  //========
  // chuyển sang đăng ký
  const onClickToRegister = () => {
    setToRegister(!toRegister);
  };
  //=========
  // ẩn hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //========

  //===========
  // hàm xử lý login hoặc đăng ký
  const handleLoginOrSignIn = async (email: string, passWord: string) => {
    // nếu đang là đăng ký
    if (toRegister) {
      setLoading(true);
      const res: any = await ApiServiceLoginSignIn.createVerificationEmail({
        email,
        passWord,
      });
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        localStorage.setItem("token", res?.data?.data?.token);
        SetEmailSendToVerify(res?.data?.data?.[UserFields.EMAIL]);
        SetVerifyEmailCode(!isVerifyEmailCode);
      }
      // nếu login nhập tay
    } else {
      setLoading(true);
      const res: any = await ApiServiceLoginSignIn.login({
        email,
        passWord,
      });
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        localStorage.setItem("token", res?.data?.data?.token);
        setAuthenticated(!isAuthenticated);
        navigate(`/${EHeaderTabKey.HOME}`);
      }
    }
  };
  // login bằng google
  const handleSuccess = async (response: any) => {
    const loginGoogleData: any = jwtDecode(response?.credential);
    if (loginGoogleData) {
      const user: UsersDTO = {
        [UserFields.EMAIL]: loginGoogleData?.[UserFields.EMAIL],
        [UserFields.FULL_NAME]: loginGoogleData?.name,
        [UserFields.AVATAR]: loginGoogleData?.picture,
        [UserFields.IS_VERIFIED]: true,
      };
      setLoading(true);
      const res: any = await ApiServiceLoginSignIn.loginWithGoogle(user);
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        localStorage.setItem("token", res?.data?.data?.token);
        setAuthenticated(!isAuthenticated);
        navigate(`/${EHeaderTabKey.HOME}`);
      }
    }
  };
  // Hàm xử lý khi đăng nhập thất bại
  const handleError = () => {
    ToastMessage.show(ToastStatus.error, "Đăng nhập thất bại.");
  };
  // validate input
  const initialValues = {
    [UserFields.EMAIL]: "",
    [UserFields.PASS_WORD]: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Vui lòng nhập email của bạn")
      .min(3, "Email phải có ít nhất 3 ký tự")
      .max(50, "Email không được vượt quá 50 ký tự")
      .email("Email không hợp lệ")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Vui lòng không nhập ký tự đặc biệt và khoảng trắng"
      ),
    passWord: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Vui lòng nhập mật khẩu của bạn"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      handleLoginOrSignIn(
        values?.[UserFields.EMAIL],
        values?.[UserFields.PASS_WORD]
      );
    },
  });
  const handleBlur = (fieldName: string) => {
    formik.setFieldTouched(fieldName, true);
  };
  const handleFocus = (fieldName: string) => {
    formik.setFieldTouched(fieldName, false);
  };
  useEffect(() => {
    if (toRegister) {
      navigate(`/${EHeaderTabKey.SIGN_IN}`);
    } else {
      navigate(`/${EHeaderTabKey.LOGIN}`);
    }
  }, [toRegister]);
  return (
    <>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: `url(${publicUrl + "/images/bg_7.jpg"})` }}
        >
          {!isVerifyEmailCode && (
            <form
              onSubmit={formik.handleSubmit}
              className=" background-login wrap-login100  p-l-55 p-r-55 p-t-65 p-b-54"
            >
              <div className="login100-form validate-form">
                <span className="text-color  login100-form-title p-b-49">
                  {!toRegister ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
                </span>

                <div>
                  <div
                    className="wrap-input100 validate-input "
                    data-validate="Username is reauired"
                  >
                    <span className="text-color  label-input100">Email</span>
                    <input
                      className="text-color  input100"
                      type="text"
                      name="email"
                      value={formik.values?.[UserFields.EMAIL]}
                      onChange={formik.handleChange}
                      onBlur={() => handleBlur("email")}
                      onFocus={() => handleFocus("email")}
                    />
                  </div>
                  {formik.errors?.[UserFields.EMAIL] &&
                  formik.touched?.[UserFields.EMAIL] ? (
                    <BaseMessageLog text={formik.errors?.[UserFields.EMAIL]} />
                  ) : null}
                </div>

                <div>
                  <div
                    className="wrap-input100 validate-input"
                    data-validate="Password is required"
                  >
                    <span className="text-color  label-input100">Mật khẩu</span>
                    <div className="d-flex align-items-center">
                      <input
                        className="text-color  input100"
                        type={!showPassword ? "password" : "text"}
                        name="passWord"
                        value={formik.values?.[UserFields.PASS_WORD]}
                        onChange={formik.handleChange}
                        onBlur={() => handleBlur("passWord")}
                        onFocus={() => handleFocus("passWord")}
                      />
                      {showPassword ? (
                        <FaEyeSlash
                          style={{ cursor: "pointer" }}
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <FaEye
                          style={{ cursor: "pointer" }}
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </div>
                  {formik.errors?.[UserFields.PASS_WORD] &&
                  formik.touched?.[UserFields.PASS_WORD] ? (
                    <BaseMessageLog
                      text={formik.errors?.[UserFields.PASS_WORD]}
                    />
                  ) : null}
                </div>

                <div className="text-color  text-right p-t-8 p-b-31"></div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button className="text-color  login100-form-btn">
                      {!toRegister ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
                    </button>
                  </div>
                </div>

                {!toRegister && (
                  <>
                    <div className="txt1 text-center p-t-54 p-b-20">
                      <span className="text-color">Hoặc đăng nhập</span>
                    </div>
                    <GoogleOAuthProvider clientId={`${ClientKey.KEY_ID}`}>
                      <div className="d-flex align-items-center justify-content-center">
                        <GoogleLogin
                          onSuccess={handleSuccess}
                          onError={() => handleError()}
                          text="signin_with"
                          shape="circle"
                        />
                      </div>
                    </GoogleOAuthProvider>
                  </>
                )}

                <div className="flex-col-c p-t-155">
                  {!toRegister && (
                    <span className="text-color  txt1 p-b-17">
                      Hoặc đăng ký
                    </span>
                  )}

                  <div
                    className="d-flex align-items-center"
                    style={{ position: "relative" }}
                  >
                    {!toRegister && (
                      <div
                        className="txt2 text-color button-back-home"
                        onClick={() => {
                          navigate(`/${EHeaderTabKey.HOME}`);
                        }}
                      >
                        <FaArrowLeft />
                      </div>
                    )}
                    <div
                      style={{ cursor: "pointer" }}
                      className="txt2 text-color"
                      onClick={() => onClickToRegister()}
                    >
                      {toRegister ? "Quay lại đăng nhập" : "Đăng ký"}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
          {/* verify email code */}
          {isVerifyEmailCode && (
            <VerifyEmailCode email={emailSendToVerify}></VerifyEmailCode>
          )}
        </div>
      </div>
    </>
  );
}
