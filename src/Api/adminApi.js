import axiosClient from "./axiosClient";

const adminApi = {
    createAccount: (data) => {
        const url = '/api/auth/add-user';
        return axiosClient.post(url, data);
    },
    getProfile: () => {
        const url = '/api/user/profile';
        return axiosClient.get(url);
    }
}

export default adminApi;