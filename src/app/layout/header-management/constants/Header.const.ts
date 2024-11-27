import { EHeaderTab, EHeaderTabKey, EHeaderTabText } from "./Header.enum";

export class HeaderConst {
  // mảng các tab trên header
  public static arrTabHeader = [
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
  // mảng các element tippy user
  public static arrTabHeaderUser = [
   
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
}
