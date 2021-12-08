import axiosClient from "./axiosClient";

const adminApi = {
    createAccount: (data) => {
        const url = '/api/auth/add-user';
        return axiosClient.post(url, data);
    },
    getProfile: () => {
        const url = '/api/user/profile';
        return axiosClient.get(url);
    },
    getAllUsers: () => {
        const url = '/api/admin/get-users';
        return axiosClient.get(url);
    },
    deleteOne: (id) => {
        const url = `/api/admin/delete-user/${id}`;
        return axiosClient.delete(url)
    },
    deleteMultiple: (id_list) => {
        const data = {
            data: {
                id_users: id_list
            }
        }
        const url = '/api/admin/delete-users';
        return axiosClient.delete(url, data);
    }
}

export default adminApi;