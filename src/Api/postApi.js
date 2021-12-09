import axiosClient from "./axiosClient";

const postApi = {
    getPost: (params) => {
        const url = `/post?page=1&limit=${params.limit}`;
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
    },

    getPostByUser: (id, params) => {
        console.log(id, params);

        const url = `/post/user/${id}`;
        return axiosClient.get(url, { params });
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