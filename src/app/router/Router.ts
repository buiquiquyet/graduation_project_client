import { useContextCommon } from "@/helper/ContextCommon/ContextCommon"
import DefaultLayout from "../layout/default-component-management/DefaultComponent"
import { EHeaderTabKey } from "../layout/header-management/constants/Header.enum"
import About from "../modules/about-management/About"
import Blog from "../modules/blog-management/Blog"
import Contact from "../modules/contact-management/Contact"
import Donate from "../modules/donate-management/Donate"
import Events from "../modules/events-management/Events"
import Home from "../modules/home-management/pages/Home"
import Login from "../modules/login-management/Login"
import User from "../modules/user-management/User"
import { UserFields } from "../modules/user-management/constants/User.interface"
import { RoleUser } from "@/helper/ContextCommon/ContextCommon.enum"
// const { dataUser } = useContextCommon();
const publicRouter = [
    {path: `${EHeaderTabKey.HOME}`, component: Home, children: null, layout: DefaultLayout, type: ''},
    {path: `${EHeaderTabKey.ABOUT}`, component: About, children: null, layout: DefaultLayout, type: ''},
    {path: `${EHeaderTabKey.BLOG}`, component: Blog, children: null, layout: DefaultLayout, type: ''},
    {path: `${EHeaderTabKey.CONTACT}`, component: Contact, children: null, layout: DefaultLayout, type: ''},
    {path: `${EHeaderTabKey.DONATE}`, component: Donate, children: null, layout: DefaultLayout, type: ''},
    {path: `${EHeaderTabKey.EVENTS}`, component: Events, children: null, layout: DefaultLayout, type: ''},
    {path: `${EHeaderTabKey.LOGIN}`, component: Login, children: null, type: ''},
    {path: `${EHeaderTabKey.SIGN_IN}`, component: Login, children: null, type: ''},
    
    // {path: '/pageNotFound',  component: PageNotFound, type: 'pageNotFound'},

]
const privateUserRouter = [
    {path: `${EHeaderTabKey.ROLE}`, component: User, children: null,layout: DefaultLayout, isBackImgHeader: false, type: ''},
]
const privateAdminRouter = [
    {path: `${EHeaderTabKey.ROLE}`, component: User, children: null,layout: DefaultLayout, isBackImgHeader: false, type: ''},
]
export const getRoutes = (dataUser?: any) => {
    if(!dataUser) return publicRouter
    const mainRouter = [
        ...publicRouter
    ]
    if(dataUser?.[UserFields.ROLE] === RoleUser.USER) {
        mainRouter.push(...privateUserRouter)
    }
    if(dataUser?.[UserFields.ROLE] === RoleUser.ADMIN) {
        mainRouter.push(...privateAdminRouter)
    }
    return mainRouter
}
