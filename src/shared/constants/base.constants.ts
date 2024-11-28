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
  // message trong response
  const messRes = response?.[EAxiosResponse.DATA]?.[EAxiosResponse.MESSAGE];
  if (
    [ESuccessCode.OK, ESuccessCode.CREATED].includes(
      response?.[EAxiosResponse.STATUS]
    )
  ) {
    if ((message && isToatMessage) || messRes) {
      let newMessage = message ?? messRes;
      ToastMessage.show(ToastStatus.success, newMessage);
    }
    return true;
  } else if (response?.[EAxiosResponse.STATUS] in EErrorCode) {
    ToastMessage.show(
      ToastStatus.error,
      response?.[EAxiosResponse.DATA]?.message ??
        response?.[EAxiosResponse.MESSAGE] ??
        response?.[EAxiosResponse.DATA]?.error
    );
    return false;
  }
  return false;
}
