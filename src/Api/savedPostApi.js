import axiosClient from "./axiosClient";

const savedPostApi = {
    getAll: (id) => {
        const url = "/save_post";
        return axiosClient.get(url, id);
    },
    unsavedMany: (id_list) => {
        const data = {
            list_post: id_list
        }
        const url = "save_post/many_unsaved";
        return axiosClient.post(url, data);
    },
    unsavedAll: (id_user) => {
        const data = {
            id_user: id_user
        }
        const url = "save_post/all_unsaved";
        return axiosClient.delete(url, data);
    },
    savedPost: (id) => {
        const data = {
            id_post: id
        }
        const url = `save_post/saved`;
        return axiosClient.post(url, data)
    },

    unsavedPost: (id) => {
        const data = {
            id_post: id
        }
        const url = `save_post/unsaved`;
        return axiosClient.post(url, data)
    }
};

export default savedPostApi;