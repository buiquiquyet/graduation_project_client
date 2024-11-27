import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";

interface TippyComponentProps {
  children: React.ReactNode;
  content: string; // tiêu đề tippy
  arrow?: boolean; // mũi tên
}
const TippyComponent: React.FC<TippyComponentProps> = ({
  children,
  content,
  arrow = true,
}) => {
  return (
    <div>
      <Tippy content={content} arrow={arrow}>
        <div>{children}</div>
      </Tippy>
    </div>
  );
};
export default TippyComponent;
