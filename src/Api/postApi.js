import axiosClient from "./axiosClient";

const postApi = {
    getPost: (params) => {
        const url = '/post';
        return axiosClient.get(url, { params });
    },

    getPostRandom: () => {
        const url = '/post/random';
        return axiosClient.get(url);
    },

    getPostDetail: (id) => {
        const url = `post/${id}`;
        return axiosClient.get(url)
    },

    createPost: (data) => {
        const url = 'post/create';
        return axiosClient.post(url, data);
    },

    updatePost: (id, data) => {
        const url = `post/${id}`;
        return axiosClient.put(url, data);
    },
}

export default postApi;