import './BaseDialog.scss'
import { FaTimes } from "react-icons/fa";
interface BaseDialogProps {
  onClickHideDialog?: () => void;
  label?: string,
  children?: any;
  style?: React.CSSProperties
}
function BaseDialog({ onClickHideDialog, children, label, style }: BaseDialogProps) {
  return (
    <div className="dialog">
      <div className="over-flow"></div>
      <div className="dialog-content" style={style}>
        <div className="dialog-header mb-3">
          <div className="dialog-title fw-bold fs-5">{label}</div>
          <div className="dialog-icon" onClick={onClickHideDialog}>
            <FaTimes size={20} /> 
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default BaseDialog;
