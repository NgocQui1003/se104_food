import axiosClient from "./axiosClient";

const userApi = {
    login: (data) => {
        const url = '/login';
        return axiosClient.post(url, data);
    },
    
    register: (data) => {
        const url = '/register';
        return axiosClient.post(url, data);
    },

    forgotPassword: (data) => {
        const url = '/forgot-password';
        return axiosClient.post(url, data);
    },

}

export default userApi;