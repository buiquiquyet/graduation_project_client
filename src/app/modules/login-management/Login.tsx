import { MyContext } from "@/App";
import "./css/main.css";
import "./css/util.css";
import "./Login.scss";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { ClientKey } from "./constants/Login.enum";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { EHeaderTabKey } from "@/app/layout/header-management/constants/Header.enum";
import * as ApiServiceLoginSignIn from './services/Login.service'
import { ToastMessage, ToastStatus } from "@/shared/libraries/message-log-component/MessageLog";
import { ResponseDTOKey } from "@/shared/enums/responseDataDTO.enum";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";


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
  const [valueEmail, setValueEmail] = useState("");
  const [valuePassWord, setValuePassWord] = useState("");
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

  //=========
  // set value email
  const onChangeValueEmail = (value: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(value.target.value);
  };
  // set value pasword
  const onChangeValuePassWord = (value: ChangeEvent<HTMLInputElement>) => {
    setValuePassWord(value.target.value);
  };
  //===========
  // hàm xử lý login hoặc đăng ký
  const handleLoginOrSignIn = async () => {
    // nếu đang là đăng ký

    if (toRegister) {
      const res: any = await ApiServiceLoginSignIn.createVerificationEmail(valueEmail)
      if(handleResponseInterceptor(res)) {
        
      }
      
    }
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
          <div className=" background-login wrap-login100  p-l-55 p-r-55 p-t-65 p-b-54">
            <div className="login100-form validate-form">
              <span className="text-color  login100-form-title p-b-49">
                {!toRegister ? "ĐĂNG NHẬP" : "ĐĂNG KÝ"}
              </span>

              <div
                className="wrap-input100 validate-input m-b-23"
                data-validate="Username is reauired"
              >
                <span className="text-color  label-input100">Email</span>
                <input
                  className="text-color  input100"
                  type="text"
                  value={valueEmail}
                  onChange={(value: ChangeEvent<HTMLInputElement>) =>
                    onChangeValueEmail(value)
                  }
                />
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <span className="text-color  label-input100">Mật khẩu</span>
                <div className="d-flex align-items-center">
                  <input
                    className="text-color  input100"
                    type={!showPassword ? "password" : "text"}
                    value={valuePassWord}
                    onChange={(value: ChangeEvent<HTMLInputElement>) =>
                      onChangeValuePassWord(value)
                    }
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

              <div className="text-color  text-right p-t-8 p-b-31"></div>

              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button
                    onClick={handleLoginOrSignIn}
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
                  <span className="text-color  txt1 p-b-17">Hoặc đăng ký</span>
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
        </div>
      </div>

      <div id="dropDownSelect1"></div>
    </>
  );
}
