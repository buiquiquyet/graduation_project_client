import DefaultLayout from "../layout/default-component-management/DefaultComponent"
import { EHeaderTabKey } from "../layout/header-management/constants/Header.enum"
import About from "../modules/about-management/About"
import Home from "../modules/home-management/Home"

const publicRouter = [
    {path: `${EHeaderTabKey.HOME}`, component: Home, children: null, layout: DefaultLayout, type: ''},
    {path: `${EHeaderTabKey.ABOUT}`, component: About, children: null, layout: DefaultLayout, type: ''},
    // {path: '/friendPage',  component: UserFriend, layout: DefaultLayoutWithHeader, type: 'friendPage'},
    // {path: '/feedPage',  component: UserFeed, layout: DefaultLayoutWithHeader, type: 'feedPage'},
    // {path: '/viewFeedPage/:idFeed',  component: UserViewFeed, layout: DefaultLayoutWithHeader, type: 'viewFeedPage'},
    // {path: '/searchPage/:nameUser',  component: UserSearch, layout: DefaultLayoutWithHeader, type: 'searchPage'},
    // {path: '/userPost/:userId', children: PostUserPage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userPost'},
    // {path: '/userFriend/:userId', children: FriendPage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userFriend'},
    // {path: '/userIntroduce/:userId', children: IntroducePage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userIntroduce'},
    // {path: '/userImage/:userId', children: ImagePage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userImage'},
    // {path: '/userVideo', children: VideoPage, component: UserPage, layout: DefaultLayoutWithHeader, type: 'userVideo'},
    // {path: '/pageNotFound',  component: PageNotFound, type: 'pageNotFound'},

 

]


export  { publicRouter }