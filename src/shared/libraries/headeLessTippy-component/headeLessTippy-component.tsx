import HeadelessTippy from "@tippyjs/react/headless";
import { memo, useState } from "react";
import WrapperComponent from "./wrapper-component/wrapper-component";
import "./headeLessTippy-component.scss";
interface HeadelessTippyProps {
  children: React.ReactNode;
  childrenMenu: React.ReactNode;
  widthChildrenMenu?: string|number, // chiều rộng children menu
}
const HeadelessTippyComponent: React.FC<HeadelessTippyProps> = ({
  children,
  childrenMenu,
  widthChildrenMenu
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTippyToggle = () => {
    setIsOpen((prevState) => !prevState); // Chuyển đổi trạng thái mở/đóng
  };
  return (
    <HeadelessTippy
      visible={isOpen} // Quản lý việc hiển thị Tippy
      render={(attrs) => (
        <div className="info-result" tabIndex={-1} {...attrs}>
          <WrapperComponent width={widthChildrenMenu}>
            <>{childrenMenu}</>
          </WrapperComponent>
        </div>
      )}
      interactive
      placement="top"
      trigger="click"
      arrow={true}
      onClickOutside={() => setIsOpen(false)} // Đóng khi nhấn ra ngoài
    >
      <div className=""  onClick={handleTippyToggle}>{children}</div>
    </HeadelessTippy>
  );
};

export default memo(HeadelessTippyComponent);
