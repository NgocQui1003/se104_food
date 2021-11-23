import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from "./Pages/Register";
import Profile from './Pages/Profile';
import Recipe from './Pages/Recipe';
import ForgotPassword from './Pages/ForgotPassword';
import SavedPostList from './Pages/SavedPostList';
import NotFound from './Pages/NotFound';

import InformationUser from './Pages/InfomationUser';
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
        path: '/luu',
        component: SavedPostList,
    },
    {
        component: NotFound,
        path: '/nguoi-dung',
        component: InformationUser,
    }
];