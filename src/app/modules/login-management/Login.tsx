import { MyContext } from "@/App";
import "./css/main.css";
import "./css/util.css";
import "./Login.scss";
import { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
import { useLoading } from "@/helper/LoadingContext/LoadingContext";
import VerifyEmailCode from "./pages/verifyEmailCode-management/VerifyEmailCode";

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
  const { setLoading } = useLoading();
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
  // login bằng google
  const handleSuccess = (response: any) => {
    const loginData = jwtDecode(response?.credential);
    if (loginData) {
      console.log(loginData);
    }
  };
  // Hàm xử lý khi đăng nhập thất bại
  const handleError = (error?: any) => {
    console.log("Login Failed:", error);
  };

  //===========
  // hàm xử lý login hoặc đăng ký
  const handleLoginOrSignIn = async (email: string) => {
    // nếu đang là đăng ký
    if (toRegister) {
      setLoading(true);
      const res: any = await ApiServiceLoginSignIn.createVerificationEmail(
        email
      );
      setLoading(false);
      if (handleResponseInterceptor(res)) {
        SetEmailSendToVerify(res?.data?.data?.email)
        SetVerifyEmailCode(!isVerifyEmailCode);
      }
    }
  };
  // validate input
  const initialValues = {
    email: "",
    passWord: "",
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
      handleLoginOrSignIn(values.email);
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
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={() => handleBlur("email")}
                      onFocus={() => handleFocus("email")}
                    />
                  </div>
                  {formik.errors.email && formik.touched.email ? (
                    <BaseMessageLog text={formik.errors.email} />
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
                        value={formik.values.passWord}
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
                  {formik.errors.passWord && formik.touched.passWord ? (
                    <BaseMessageLog text={formik.errors.passWord} />
                  ) : null}
                </div>

                <div className="text-color  text-right p-t-8 p-b-31"></div>

                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn"></div>
                    <button
                      // onClick={handleLoginOrSignIn}
                      className="text-color  login100-form-btn"
                    >
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
                    style={{ cursor: "pointer" }}
                    className="txt2 text-color"
                    onClick={() => onClickToRegister()}
                  >
                    {toRegister ? "Quay lại đăng nhập" : "Đăng ký"}
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
