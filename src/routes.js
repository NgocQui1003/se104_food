import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from "./Pages/Register";
import AdminProfile from './Pages/AdminProfile';
import Recipe from './Pages/Recipe';
import ForgotPassword from './Pages/ForgotPassword';
import SavedPostList from './Pages/SavedPostList';
import InformationUser from './Pages/InformationUser';
import ModifyPassword from './Pages/ModifyPassword';
import ModifyInformation from './Pages/ModifyInformation';
import NotFound from './Pages/NotFound';
import Contact from './Pages/Contact';
import Random from './Pages/Random';
import UsersList from './Pages/UsersList';
import UserPosts from './Pages/UserPosts';
import ResetPass from './Pages/ResetPassword';
<<<<<<< HEAD
import PostList from './Pages/PostList';
import CreateUser from './Pages/CreateUser';
import PostByUser from './Pages/PostByUser';
import UserProfilePage from './Pages/UserProfilePage';
import PostDetail from './Pages/PostDetail';
import UserSavedList from './Pages/UserSavedList';
=======
import Search from './Pages/Search';
import PostByUser from './Pages/PostByUser';
import ListPost from './Pages/ListPost';
import AdminListPost from './Pages/AdminListPost';
>>>>>>> admin/post

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
        path: '/admin/ho-so',
        component: AdminProfile,
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
        path: '/dat-lai-mat-khau/:token',
        component: ResetPass,
    },
    {
        path: '/luu',
        component: SavedPostList,
    },
    {
        path: '/danh-sach-bai-viet',
        component: ListPost,
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
<<<<<<< HEAD
        component: PostList,
    },
    {
        path: '/admin/tao-account',
        component: CreateUser,
    },
    {
        path: '/admin/danh-sach-nguoi-dung',
        component: UsersList,
=======
        component: Search,  
>>>>>>> admin/post
    },
    {
        path: '/danh-sach-bai-viet-ng-dung/:id',
        component: PostByUser,
    },
    {
<<<<<<< HEAD
        path: '/admin/thong-tin/:id',
        component: UserProfilePage,
        path: '/bai-dang/:_id',
        component: PostDetail,
    },
    {
        path: '/admin/thong-tin/ds-luu/:id',
        component: UserSavedList,
=======
        path: '/admin/danh-sach-bai-viet',
        component: AdminListPost,
>>>>>>> admin/post
    },
    {
        component: NotFound,
    }
];