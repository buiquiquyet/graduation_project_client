import { useEffect, useRef, useState } from "react";
import "./VerifyEmailCode.scss";
import { useContextCommon } from "@/helper/ContextCommon/ContextCommon";
import * as ApiServiceLoginSignIn from "./../../services/Login.service";
import { handleResponseInterceptor } from "@/shared/constants/base.constants";
import { useNavigate } from "react-router-dom";
import { EHeaderTabKey } from "@/app/layout/header-management/constants/Header.enum";
import { validateToken } from "@/app/modules/user-management/services/User.services";
interface VerifyEmailCodeProps {
  email: string; // email được gửi xác thực
}

export default function VerifyEmailCode({ email }: VerifyEmailCodeProps) {
  const arrInput = [...Array(6)];
  const [values, setValues] = useState<string[]>(Array(6).fill("")); // Khởi tạo giá trị cho 6 ô nhập
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // State để lưu trữ timeout
  // load ding
  const { setLoading, setDataUser } = useContextCommon();
  const navigate = useNavigate();
  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    if (newValue.length <= 1) {
      // Chỉ cho phép 1 ký tự
      const newValues = [...values];
      newValues[index] = newValue; // Cập nhật giá trị mới
      setValues(newValues);

      // Chuyển focus đến input tiếp theo nếu có
      if (newValue && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Kiểm tra nếu tất cả các input đã được nhập đầy đủ
      if (newValues.every((value) => value.length === 1)) {
        if (timer) clearTimeout(timer); // Dọn dẹp timer nếu đang tồn tại
        const newTimer = setTimeout(() => {
          handleCallApiVerifyCode(newValues);
        }, 1000);
        setTimer(newTimer); // Lưu trữ timer mới
      } else if (timer) {
        clearTimeout(timer); // Nếu không đủ 6 ký tự, dọn dẹp timer
        setTimer(null);
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      if (values[index] === "") {
        // Nếu Backspace và input hiện tại trống, chuyển focus đến input trước
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        // Nếu Backspace và có giá trị, xóa giá trị
        const newValues = [...values];
        newValues[index] = ""; // Xóa input hiện tại
        setValues(newValues);
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = event.clipboardData.getData("text");
    const newValues = paste
      .slice(0, 6)
      .split("")
      .concat(Array(6).fill(""))
      .slice(0, 6); // Lấy tối đa 6 ký tự và điền vào array
    setValues(newValues);
    const nextIndex = newValues.findIndex((val) => val === "") || 5;
    inputRefs.current[nextIndex]?.focus();
    event.preventDefault();

    // Kiểm tra nếu tất cả các input đã được nhập đầy đủ
    if (newValues.every((value) => value.length === 1)) {
      if (timer) clearTimeout(timer); // Dọn dẹp timer nếu đang tồn tại
      const newTimer = setTimeout(() => {
        handleCallApiVerifyCode(newValues);
      }, 1000);
      setTimer(newTimer); // Lưu trữ timer mới
    } else if (timer) {
      clearTimeout(timer); // Nếu không đủ 6 ký tự, dọn dẹp timer
      setTimer(null);
    }
  };

  // xác thực email code
  const handleCallApiVerifyCode = async (newValues: string[]) => {
    const joinCodeVerify = newValues.join("");
    if (joinCodeVerify) {
      setLoading(true);
      const res: any = await ApiServiceLoginSignIn.verificationEmail(
        email,
        joinCodeVerify,
      );
      if (handleResponseInterceptor(res)) {
        const token = res?.data?.data?.token 
        // gọi hàm validate người dùng sau khi đăng ký
        if (token) {
          const resValidate: any = await validateToken(token);
          const dataValidate = resValidate?.data?.data;
          if (!dataValidate?.error) {
            setDataUser(dataValidate?.dataUser);
            navigate(`/${EHeaderTabKey.HOME}`);
          } else {
            setDataUser(null);
          }
        }
        setLoading(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="verify-div">
      <div className="">
        <div className="container">
          <div className="title">
            <h3 className="container-title">Xác thực email</h3>
            <h5 className="container-subtitle">
              Chúng tôi đã gửi cho bạn mã gồm sáu chữ số qua email đến
              <span className="container-subtitle-email"> {email}</span>. Nhập
              mã bên dưới để xác nhận địa chỉ email của bạn.
            </h5>
          </div>
          <div className="code-section">
            {arrInput.map((_, index) => (
              <div key={index} className={`code-box`}>
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  maxLength={1} // Giới hạn số ký tự nhập
                  className="code-number"
                  value={values[index]} // Giá trị ô nhập từ state
                  onChange={(e) => handleChange(index, e)} // Gọi hàm xử lý khi có sự thay đổi
                  onKeyDown={(event) => handleKeyDown(index, event)}
                  onPaste={handlePaste} // Xử lý sự kiện paste
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
