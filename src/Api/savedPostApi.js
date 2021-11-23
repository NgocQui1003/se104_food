import axiosClient from "./axiosClient";

const savedPostApi = {
    getAll: (data) => {
        const url = "/save_post";
        return axiosClient.get(url);
    },
    deleteOne: (id) => {
        const url = "/unsaved";
        return axiosClient.delete(url, id);
    },
    deleteMany: (id) => {
        const url = "/many_unsaved";
        return axiosClient.delete(url, id);
    },
    deleteAll: (data) => {
        const url = "/all_unsaved";
        return axiosClient.delete(url, data);
    }
};

export default savedPostApi;