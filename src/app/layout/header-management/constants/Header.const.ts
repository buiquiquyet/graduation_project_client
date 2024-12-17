import { RoleUser } from "@/helper/ContextCommon/ContextCommon.enum";
import { EHeaderTab, EHeaderTabKey, EHeaderTabText } from "./Header.enum";
import { TabListProjectFundProcessing } from "@/app/modules/user-modules/project-fund-user-management/constants/Project-fund-user.enum";

export class HeaderConst {
  // mảng các tab trên header
  public static readonly arrTabHeader = [
    {
      value: EHeaderTab.HOME,
      label: EHeaderTabText.HOME,
      key: EHeaderTabKey.HOME,
    },
    {
      value: EHeaderTab.ABOUT,
      label: EHeaderTabText.ABOUT,
      key: EHeaderTabKey.ABOUT,
    },
    {
      value: EHeaderTab.BLOG,
      label: EHeaderTabText.BLOG,
      key: EHeaderTabKey.BLOG,
    },
    // {
    //   value: EHeaderTab.CONTACT,
    //   label: EHeaderTabText.CONTACT,
    //   key: EHeaderTabKey.CONTACT,
    // },
    {
      value: EHeaderTab.INSTRUCT,
      label: EHeaderTabText.INSTRUCT,
      key: EHeaderTabKey.INSTRUCT,
    },
    {
      value: EHeaderTab.LOGIN,
      label: EHeaderTabText.LOGIN,
      key: EHeaderTabKey.LOGIN,
    },
  ];
  // mảng các element tippy user hoặc admin
  public static getArrayTippyUser(
    role: RoleUser = RoleUser.USER,
    isEmissary: TabListProjectFundProcessing 
  ) {
    // role của người dùng khi là sứ giả sẽ được tạo dự án
    const roleEmissary = {
      value: EHeaderTab.PROJECT_FUND_USER,
      label: EHeaderTabText.PROJECT_FUND_USER,
      key: EHeaderTabKey.PROJECT_FUND_USER,
    };
    // quyền người dùng
    const roleUser = [
      {
        value: EHeaderTab.ROLE,
        label: EHeaderTabText.ROLE,
        key: EHeaderTabKey.ROLE,
      },
      {
        value: EHeaderTab.LOGIN,
        label: EHeaderTabText.LOGOUT,
        key: EHeaderTabKey.LOGIN,
      },
    ];
    // quyền admin
    const roleAdmin = [
      {
        value: EHeaderTab.APPROVAL_EMISSARY,
        label: EHeaderTabText.APPROVAL_EMISSARY,
        key: EHeaderTabKey.APPROVAL_EMISSARY,
      },
      {
        value: EHeaderTab.ADMIN_USER,
        label: EHeaderTabText.ADMIN_USER,
        key: EHeaderTabKey.ADMIN_USER,
      },
      {
        value: EHeaderTab.PROJECT_FUND,
        label: EHeaderTabText.PROJECT_FUND,
        key: EHeaderTabKey.PROJECT_FUND,
      },
      {
        value: EHeaderTab.APPROVAL_PROJECT,
        label: EHeaderTabText.APPROVAL_PROJECT,
        key: EHeaderTabKey.APPROVAL_PROJECT,
      },
      {
        value: EHeaderTab.CHARITY_FUND,
        label: EHeaderTabText.CHARITY_FUND,
        key: EHeaderTabKey.CHARITY_FUND,
      },
      {
        value: EHeaderTab.CATEGORY,
        label: EHeaderTabText.CATEGORY,
        key: EHeaderTabKey.CATEGORY,
      },
      ...roleUser,
    ];
    if (role === RoleUser.ADMIN) return roleAdmin;
    if (isEmissary === TabListProjectFundProcessing.APPROVED)
      return [roleEmissary, ...roleUser];
    return roleUser;
  }
}
