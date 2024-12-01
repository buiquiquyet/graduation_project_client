import DefaultLayout from "../layout/default-component-management/DefaultComponent";
import { EHeaderTabKey } from "../layout/header-management/constants/Header.enum";
import AboutComponent from "../modules/about-management/About";
import BlogComponent from "../modules/blog-management/Blog";
import ContactComponent from "../modules/contact-management/Contact";
import DonateComponent from "../modules/donate-management/Donate";
import EventsComponent from "../modules/events-management/Events";
import HomeComponent from "../modules/home-management/pages/Home";
import LoginComponent from "../modules/login-management/Login";
import UserComponent from "../modules/user-management/User";
import { UserFields } from "../modules/user-management/constants/User.interface";
import { RoleUser } from "@/helper/ContextCommon/ContextCommon.enum";
// import Admin from "../modules/admin-management/Admin"
import CharityFundComponent from "../modules/charity-fund-management/Charity-fund";
import ProjectFundComponent from "../modules/project-admin-management/Project-fund";
import CategoryComponent from "../modules/category-management/Category";
const publicRouter = [
  {
    path: `${EHeaderTabKey.HOME}`,
    component: HomeComponent,
    children: null,
    layout: DefaultLayout,
    type: "",
  },
  {
    path: `${EHeaderTabKey.ABOUT}`,
    component: AboutComponent,
    children: null,
    layout: DefaultLayout,
    type: "",
  },
  {
    path: `${EHeaderTabKey.BLOG}`,
    component: BlogComponent,
    children: null,
    layout: DefaultLayout,
    type: "",
  },
  {
    path: `${EHeaderTabKey.CONTACT}`,
    component: ContactComponent,
    children: null,
    layout: DefaultLayout,
    type: "",
  },
  {
    path: `${EHeaderTabKey.DONATE}`,
    component: DonateComponent,
    children: null,
    layout: DefaultLayout,
    type: "",
  },
  {
    path: `${EHeaderTabKey.EVENTS}`,
    component: EventsComponent,
    children: null,
    layout: DefaultLayout,
    type: "",
  },
  {
    path: `${EHeaderTabKey.LOGIN}`,
    component: LoginComponent,
    children: null,
    type: "",
  },
  {
    path: `${EHeaderTabKey.SIGN_IN}`,
    component: LoginComponent,
    children: null,
    type: "",
  },

  // {path: '/pageNotFound',  component: PageNotFound, type: 'pageNotFound'},
];
const privateUserRouter = [
  {
    path: `${EHeaderTabKey.ROLE}`,
    component: UserComponent,
    children: null,
    layout: DefaultLayout,
    isBackImgHeader: false,
    type: "",
  },
];
const privateAdminRouter = [
  {
    path: `${EHeaderTabKey.PROJECT_FUND}`,
    component: ProjectFundComponent,
    children: null,
    layout: DefaultLayout,
    isBackImgHeader: false,
    type: "",
  },
  {
    path: `${EHeaderTabKey.CHARITY_FUND}`,
    component: CharityFundComponent,
    children: null,
    layout: DefaultLayout,
    isBackImgHeader: false,
    type: "",
  },
  {
    path: `${EHeaderTabKey.CATEGORY}`,
    component: CategoryComponent,
    children: null,
    layout: DefaultLayout,
    isBackImgHeader: false,
    type: "",
  },
];
export const getRoutes = (dataUser?: any) => {
  // if(!dataUser) return publicRouter
  if (!dataUser) {
    const pathName: EHeaderTabKey = location.pathname.replace(
      "/",
      ""
    ) as EHeaderTabKey;
    const arrRoleAdminAcitve = [
      EHeaderTabKey.CHARITY_FUND,
      EHeaderTabKey.PROJECT_FUND,
      EHeaderTabKey.CATEGORY,
    ]; // mảng trong headeTippy user
    if (arrRoleAdminAcitve.includes(pathName)) {
      return [...publicRouter, ...privateAdminRouter, ...privateUserRouter];
    } else if (pathName === EHeaderTabKey.ROLE) {
      return [...publicRouter, ...privateUserRouter];
    }
    return publicRouter;
  }
  const mainRouter = [...publicRouter];
  if (dataUser?.[UserFields.ROLE] === RoleUser.USER) {
    mainRouter.push(...privateUserRouter);
  }
  if (dataUser?.[UserFields.ROLE] === RoleUser.ADMIN) {
    mainRouter.push(...privateAdminRouter, ...privateUserRouter);
  }
  return mainRouter;
};
