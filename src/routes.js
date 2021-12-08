import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from "./Pages/Register";
import Profile from './Pages/Profile';
import Recipe from './Pages/Recipe';
import ForgotPassword from './Pages/ForgotPassword';
import SavedPostList from './Pages/SavedPostList';
import InformationUser from './Pages/InformationUser';
import ModifyPassword from './Pages/ModifyPassword';
import ModifyInformation from './Pages/ModifyInformation';
import NotFound from './Pages/NotFound';
import Contact from './Pages/Contact';
import Random from './Pages/Random';
<<<<<<< HEAD
import Listusers from './Pages/Listusers';
=======
import UsersList from './Pages/UsersList';
import UserPosts from './Pages/UserPosts';
import ResetPass from './Pages/ResetPassword';
import PostList from './Pages/PostList';
import CreateUser from './Pages/CreateUser';
import PostByUser from './Pages/PostByUser';
>>>>>>> 38a079981eb9e30218f1d9aaeead03bfd55d6d8d

export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/dang-nhap',
        component: Login,
    },
    {
        path: '/dang-ki',
        component: Register,
    },
    {
        path: '/ho-so',
        component: Profile,
    },
    {
        path: '/cong-thuc',
        component: Recipe,
    },
    {
        path: '/quen-mat-khau',
        component: ForgotPassword,
    },
    {
        path: '/dat-lai-mat-khau',
        component: ResetPass,
    },
    {
        path: '/luu',
        component: SavedPostList,
    },
    {
        path: '/nguoi-dung',
        component: InformationUser,
    },
    {
        path: '/doi-mat-khau',
        component: ModifyPassword,
    },
    {
        path: '/doi-thong-tin',
        component: ModifyInformation,
    },
    {
        path: '/lien-he',
        component: Contact,
    },
    {
        path: '/random-mon-an',
        component: Random,
    },
    {
        path: '/danh-sach-bai-dang',
        component: UserPosts,
    },
    {
        path: '/reset-password',
        component: ResetPass,
    },
    {
        path: '/tim-kiem',
        component: PostList,
    },
    {
        path: '/admin/tao-account',
        component: CreateUser,
    },
    {
        path: '/admin/xoa-nguoi-dung',
        component: UsersList,
    },
    {
        path: '/danh-sach-bai-viet-ng-dung/:id',
        component: PostByUser,
    },
    {
        component: NotFound,
    }
];