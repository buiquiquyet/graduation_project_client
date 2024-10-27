import { MyContext } from "@/App";
import "./css/main.css";
import "./css/util.css";
import "./Login.scss";
import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
export default function Login() {
  const context = useContext(MyContext);
  if (!context) {
    return null;
  }
  const { publicUrl } = context;
  const [toRegister, setToRegister] = useState(false);

  const onClickToRegister = () => {
    setToRegister(!toRegister);
  };
  return (
    <>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: `url(${publicUrl + "/images/bg_7.jpg"})` }}
        >
          <div className=" background-login wrap-login100  p-l-55 p-r-55 p-t-65 p-b-54">
            <form className="login100-form validate-form">
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
                  name="username"
                />
                {/* <span className="focus-input100" data-symbol="&#xf206;"></span> */}
              </div>

              <div
                className="wrap-input100 validate-input"
                data-validate="Password is required"
              >
                <span className="text-color  label-input100">Mật khẩu</span>
                <input
                  className="text-color  input100"
                  type="password"
                  name="pass"
                />
                {/* <span className="focus-input100" data-symbol="&#xf190;"></span> */}
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
                    <span className="text-color">Hoặc đăng ký</span>
                  </div>

                  <div className="flex-c-m">
                    <a href="#" className="login100-social-item bg2">
                      <FcGoogle size={24} color="red" />
                    </a>
                  </div>
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
            </form>
          </div>
        </div>
      </div>

      <div id="dropDownSelect1"></div>
    </>
  );
}
