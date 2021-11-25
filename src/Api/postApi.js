import axiosClient from "./axiosClient";

const postApi = {
    getPost: (params) => {
        const url = '/post';
        return axiosClient.get(url, { params });
    }
}

export default postApi;