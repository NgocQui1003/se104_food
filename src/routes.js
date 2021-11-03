import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from "./Pages/Register";
import Profile from './Pages/Profile';
import Recipe from './Pages/Recipe';
import ForgotPassword from './Pages/ForgotPassword';
export const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/recipe',
        component: Recipe,
    },
    {
        path: '/forgot-password',
        component: ForgotPassword,
    },
    {
        path: '/register',
        component: Register,
    },

];