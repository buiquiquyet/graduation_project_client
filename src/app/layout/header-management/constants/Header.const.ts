import { RoleUser } from "@/helper/ContextCommon/ContextCommon.enum";
import { EHeaderTab, EHeaderTabKey, EHeaderTabText } from "./Header.enum";

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
    {
      value: EHeaderTab.CONTACT,
      label: EHeaderTabText.CONTACT,
      key: EHeaderTabKey.CONTACT,
    },
    {
      value: EHeaderTab.DONATE,
      label: EHeaderTabText.DONATE,
      key: EHeaderTabKey.DONATE,
    },
    {
      value: EHeaderTab.EVENTS,
      label: EHeaderTabText.EVENTS,
      key: EHeaderTabKey.EVENTS,
    },
    {
      value: EHeaderTab.LOGIN,
      label: EHeaderTabText.LOGIN,
      key: EHeaderTabKey.LOGIN,
    },
    
  ];
  // mảng các element tippy user hoặc admin
  public static getArrayTippyUser(role: RoleUser = RoleUser.USER) {
    const roleUser =  [
      {
        value: EHeaderTab.ROLE,
        label: EHeaderTabText.ROLE,
        key: EHeaderTabKey.ROLE,
      },
      {
        value: EHeaderTab.LOGIN,
        label: EHeaderTabText.LOGIN,
        key: EHeaderTabKey.LOGIN,
      },
    ];
    const roleAdmin = [
      {
        value: EHeaderTab.ADMIN,
        label: EHeaderTabText.ADMIN,
        key: EHeaderTabKey.ADMIN,
      },
      {
        value: EHeaderTab.CHARITY_FUND,
        label: EHeaderTabText.CHARITY_FUND,
        key: EHeaderTabKey.CHARITY_FUND,
      },
      ...roleUser
    ]
    return role === RoleUser.ADMIN? roleAdmin : roleUser;
  }
}
