import DefaultLayout from "../layout/default-component-management/DefaultComponent";
import { EHeaderTabKey } from "../layout/header-management/constants/Header.enum";
import AboutComponent from "../modules/about-management/About";
import BlogComponent from "../modules/blog-management/Blog";
import ContactComponent from "../modules/contact-management/Contact";
import DonateComponent from "../modules/donate-management/Donate";
import HomeComponent from "../modules/home-management/pages/Home";
import LoginComponent from "../modules/login-management/Login";
import UserComponent from "../modules/user-management/User";
import { UserFields } from "../modules/user-management/constants/User.interface";
import { RoleUser } from "@/helper/ContextCommon/ContextCommon.enum";
// import Admin from "../modules/admin-management/Admin"
import CharityFundComponent from "../modules/charity-fund-management/Charity-fund";
import CategoryComponent from "../modules/category-management/Category";
import ProjectFundDetailComponent from "../modules/project-fund-detail-management/ProjectFundDetail";
import ProjectFundComponent from "../modules/project-fund-admin-management/Project-fund";
import ProjectFundUserComponent from "../modules/project-fund-user-management/Project-user-fund";
import ApprovalProject from "../modules/approval-project-management/ApprovalProject";
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
    path: `${EHeaderTabKey.INSTRUCT}`,
    component: DonateComponent,
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
  {
    path: `${EHeaderTabKey.PROJECT_FUND_DETAIL}/:projectFundId`,
    component: ProjectFundDetailComponent,
    children: null,
    layout: DefaultLayout,
    isBackImgHeader: false,
    type: "",
  },
  // {path: '/pageNotFound',  component: PageNotFound, type: 'pageNotFound'},
];
// router của người dùng đã đăng nhậP
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
// nếu user là sứ giả
const privateUserRouterIsEmissary = [
  {
    path: `${EHeaderTabKey.PROJECT_FUND_USER}`,
    component: ProjectFundUserComponent,
    children: null,
    layout: DefaultLayout,
    isBackImgHeader: false,
    type: "",
  },
];
// router của admin
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
  {
    path: `${EHeaderTabKey.APPROVAL_PROJECT}`,
    component: ApprovalProject,
    children: null,
    layout: DefaultLayout,
    isBackImgHeader: false,
    type: "",
  },
];

const getPublicRoutes = () => publicRouter;

const getAdminRoutes = () => [...publicRouter, ...privateAdminRouter, ...privateUserRouter];

const getUserRoutes = (isEmissary: boolean) => {
  if (isEmissary) {
    return [...publicRouter, ...privateUserRouter, ...privateUserRouterIsEmissary];
  }
  return [...publicRouter, ...privateUserRouter];
};

const getRoutesBasedOnPath = (pathName: EHeaderTabKey, dataUser: any) => {
  const arrRoleAdminAcitve = [
    EHeaderTabKey.CHARITY_FUND,
    EHeaderTabKey.PROJECT_FUND,
    EHeaderTabKey.CATEGORY,
    EHeaderTabKey.APPROVAL_PROJECT,
  ];
  const arrRoleUserAcitve = [
    EHeaderTabKey.ROLE,
    EHeaderTabKey.PROJECT_FUND_USER,
  ];
  if (arrRoleAdminAcitve.includes(pathName)) {
    return getAdminRoutes();
  } else if (arrRoleUserAcitve.includes(pathName) ) {
    return getUserRoutes(dataUser?.[UserFields.IS_EMISSARY]);
  }
  return getPublicRoutes();
};

export const getRoutes = (dataUser?: any) => {
  if (!dataUser) {
    const pathName = location.pathname.replace("/", "") as EHeaderTabKey;
    return getRoutesBasedOnPath(pathName, dataUser);
  }


  if (dataUser?.[UserFields.ROLE] === RoleUser.USER) {
    return  getUserRoutes(dataUser?.[UserFields.IS_EMISSARY]);
  }
  
  if (dataUser?.[UserFields.ROLE] === RoleUser.ADMIN) {
    return getAdminRoutes();
  }

  return getPublicRoutes();
};


