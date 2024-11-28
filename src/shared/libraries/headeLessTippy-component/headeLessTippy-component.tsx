import HeadelessTippy from "@tippyjs/react/headless";
import React, { memo, ReactNode, useState } from "react";
import WrapperComponent from "./wrapper-component/wrapper-component";
import "./headeLessTippy-component.scss";
interface HeadelessTippyProps {
  children: React.ReactNode;
  // childrenMenu: React.ReactNode;
  widthChildrenMenu?: string|number, // chiều rộng children menu
}
const HeadelessTippyComponent: React.FC<HeadelessTippyProps> = ({
  children,
  // childrenMenu,
  widthChildrenMenu
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTippyToggle = () => {
    setIsOpen((prevState) => !prevState); // Chuyển đổi trạng thái mở/đóng
  };

  let childrenContent: ReactNode = null; // children item click
  let childrenMenuContent: ReactNode = null; // children dropdown content
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === MenuHeadeLessTippy) {
      childrenMenuContent = child.props.children;
    } else {
      childrenContent = child;
    }
  });
  return (
    <HeadelessTippy
      visible={isOpen} // Quản lý việc hiển thị Tippy
      render={(attrs) => (
        <div className="info-result" tabIndex={-1} {...attrs}>
          <WrapperComponent width={widthChildrenMenu}>
            <>{childrenMenuContent}</>
          </WrapperComponent>
        </div>
      )}
      interactive
      placement="top"
      trigger="click"
      arrow={true}
      onClickOutside={() => setIsOpen(false)} // Đóng khi nhấn ra ngoài
    >
      <div className=""  onClick={handleTippyToggle}>{childrenContent}</div>
    </HeadelessTippy>
  );
};
export const MenuHeadeLessTippy: React.FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;

export default memo(HeadelessTippyComponent);
