import axiosClient from "./axiosClient";

const savedPostApi = {
    getAll: (params) => {
        const url = "/save_post";
        return axiosClient.get(url, { params });
    },
    deleteOne: (id) => {
        const url = "/unsaved";
        return axiosClient.delete(url, id);
    },
    deleteMany: (ids) => {
        const url = "/many_unsaved";
        return axiosClient.delete(url, ids);
    },
    deleteAll: (data) => {
        const url = "/all_unsaved";
        return axiosClient.delete(url, data);
    }
};

export default savedPostApi;