import { EErrorCode, ESuccessCode, ResponseDTOKey } from "../enums/responseDataDTO.enum";
import {
  ToastMessage,
  ToastStatus,
} from "../libraries/message-log-component/MessageLog";
import { AxiosResponseObjDTO, EAxiosResponse } from "../ultils/request";

// hàm trả check trả về của api
export function handleResponseInterceptor(
  response: AxiosResponseObjDTO<any>,
  isToastMessage: boolean = true,
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
      isToastMessage ? ToastMessage.show(ToastStatus.success, newMessage) : null;
    }
    return true;
  } else if (response?.[EAxiosResponse.STATUS] in EErrorCode) {
    isToastMessage ? ToastMessage.show(
      ToastStatus.error,
      response?.[EAxiosResponse.DATA]?.message ??
        response?.[EAxiosResponse.MESSAGE] ??
        response?.[EAxiosResponse.DATA]?.error
    ) : null;
    return false;
  }
  return false;
}
// check response success
export function handleCheckSuccessResponse(res: any) {
  if(res?.data?.[EAxiosResponse.MESSAGE] === ResponseDTOKey.SUCCESS) return true 
  return false
}