import { TabListProjectFundProcessing } from "../../project-fund-user-management/constants/Project-fund-user.enum";

export class ApprovalProjectConst {

  // tab của dự án người dùng
  public static readonly tabTabeList = [
    {
      value: TabListProjectFundProcessing.PROCESSING,
      label: "Cần xử lý",
    },
    {
      value: TabListProjectFundProcessing.APPROVED,
      label: "Đã duyệt",
    },
    {
      value: TabListProjectFundProcessing.REJECTED,
      label: "Từ chối duyệt",
    },
  ]
  // trạng thái duyệt
  
}
