import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Recipe from './pages/Recipe';
import ForgotPassword from './pages/ForgotPassword';
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