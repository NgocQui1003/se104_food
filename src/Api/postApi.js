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

    getPostSearch: (params) => {
        const url = '/post/search';
        return axiosClient.get(url, { params });
    }
}

export default postApi;