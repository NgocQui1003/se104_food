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
<<<<<<< HEAD
    createPost: (data) => {
        const url = 'post/create';
        return axiosClient.post(url, data);
    },

    updatePost: (id, data) => {
        const url = `post/${id}`;
        return axiosClient.put(url, data);
    },
=======
    deleteOneUpload: (id) => {
        const url = `/post/delete/${id}`
        return axiosClient.delete(url);
    },
    deleteManyUpload: (id_list) => {
        const data = {
            data: {
                list_post: id_list
            }
        }
        const url = '/post/delete-many';
        return axiosClient.delete(url, data);
    }
>>>>>>> admin/post
}

export default postApi;