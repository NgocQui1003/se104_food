import axiosClient from "./axiosClient";

const userApi = {
    login: (data) => {
        const url = '/api/auth/login';
        return axiosClient.post(url, data);
    },
    
    register: (data) => {
        const url = '/register';
        return axiosClient.post(url, data);
    },

    getProfile: () => {
        const url ='/api/user/profile';
        return axiosClient.get(url);
    },

    forgotPassword: (data) => {
        const url = '/forgot-password';
        return axiosClient.post(url, data);
    },

    logout: () => {
        localStorage.removeItem('token');
    }

}

export default userApi;