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

    forgotPassword: (email) => {
        const url = '/api/user/forgot-password';
        return axiosClient.post(url, email);
    },
    resetPassword: ({token, data}) => {
        console.log(data);
        const URL = `api/user/reset-password/${token}`
        return axiosClient.put(URL, data)
    },

    changePassword: (data) => {
        console.log('CALL API');
        console.log(data);
        const url = '/api/user/changepassword';
        return axiosClient.put(url, data)
    },

    changeAvatar: (data) => {
        const url = 'api/user/change-avatar';
        return axiosClient.put(url, data);
    },

    updateProfile: (data) => {
        const url = 'api/user/update';
        return axiosClient.put(url, data)
    },

    logout: () => {
        localStorage.removeItem('token');
    },
    getPosts: (data) => {
        const url = `/post/post_management/`;
        return axiosClient.get(url, {
            params: {
                limit: data.limit,
                page: data.page
            }
        });
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