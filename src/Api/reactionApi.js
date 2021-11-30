import axiosClient from "./axiosClient";

const reactionApi = {
    liked: (id) => {
        const url = `/reaction/liked/${id}`;
        return axiosClient.post(url);
    },

    unliked: (id) => {
        const url = `/reaction/unliked/${id}`;
        return axiosClient.post(url);
    },
}

export default reactionApi;