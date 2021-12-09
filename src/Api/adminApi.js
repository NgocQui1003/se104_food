import axiosClient from "./axiosClient";

const adminApi = {
    createAccount: (data) => {
        const url = '/api/admin/add-user';
        return axiosClient.post(url, data);
    },
    getProfile: () => {
        const url = '/api/user/profile';
        return axiosClient.get(url);
    },
    getAllUsers: (params) => {
        let url = `/api/admin/get-users?page=${params.page}&limit=${params.limit}`;
        return axiosClient.get(url);
    },
    getUserProfile: (id) => {
        const url = `/api/admin/user/${id}`;
        return axiosClient.get(url);
    },
    getUserSavedList: (params) => {
        const url = `/save_post/savedPostUser/${params.userID}?limit=${params.limit}&page=${params.page}`;
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