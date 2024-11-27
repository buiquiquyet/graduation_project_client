import "./wrapper-component.scss";
interface WrapperProps {
  children: React.ReactNode;
  className?: string;
  width?: string|number; // chiều rộng wrapper
}
const WrapperComponent: React.FC<WrapperProps> = ({
  children,
  className,
  width = 150,
}) => {
  return (
    <div className={`wrapper-component ${className ? ` ${className}` : ""}`} style={{width: `${width}px`}}>
      {children}
    </div>
  );
};

export default WrapperComponent;
