import { EErrorCode, ESuccessCode } from "../enums/responseDataDTO.enum";
import {
  ToastMessage,
  ToastStatus,
} from "../libraries/message-log-component/MessageLog";
import { AxiosResponseObjDTO, EAxiosResponse } from "../ultils/request";

// hàm trả check trả về của api
export function handleResponseInterceptor(
  response: AxiosResponseObjDTO<any>,
  message?: string,
  isToatMessage: boolean = true
) {
  if (
    [ESuccessCode.OK, ESuccessCode.CREATED].includes(
      response?.[EAxiosResponse.STATUS]
    )
  ) {
    if (message && isToatMessage) {
      ToastMessage.show(ToastStatus.success, message);
    }
    return true;
  } else if (response?.[EAxiosResponse.STATUS] in EErrorCode) {
    ToastMessage.show(
      ToastStatus.error,
      response?.[EAxiosResponse.DATA]?.message ??
        response?.[EAxiosResponse.MESSAGE]
    );
    return false;
  }
  return false;
}
