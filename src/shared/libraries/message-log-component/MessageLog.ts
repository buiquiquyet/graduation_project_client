import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './MessageLog.scss'
export enum ToastStatus {
  success = "success",
  warning = "warning",
  error = "error",
  info = "info",
}
export class ToastMessage {
  public static show(type: ToastStatus, message: string, onClose?: () => void) {
    return toast[type as keyof typeof ToastStatus](message, {
      autoClose: 1800,
      onClose,
      className: 'custom-toast',
    });
  }
}
