import axiosClient from "./axiosClient";

const userApi = {
    login: (data) => {
        const url = '/api/auth/login';
        return axiosClient.post(url, data);
    },

    register: (data) => {
        const url = 'api/auth/register';
        return axiosClient.post(url, data);
    },

    getProfile: () => {
        const url = '/api/user/profile';
        return axiosClient.get(url);
    },

    forgotPassword: (data) => {
        const url = '/forgot-password';
        return axiosClient.post(url, data);
    },

    logout: () => {
        localStorage.removeItem('token');
    },
    getPosts: () => {
        const url = '/post/post_management';
        return axiosClient.get(url);
    },
    deleteOneUpload: (id) => {
        const url = `/post/delete/${id}`
        return axiosClient.delete(url);
    },
    deleteManyUpload: (id_list) => {
        const data = {
            data: {
                list_post: id_list
            }
        }
        const url = '/post/delete-many';
        return axiosClient.delete(url, data);
    }
}

export default userApi;