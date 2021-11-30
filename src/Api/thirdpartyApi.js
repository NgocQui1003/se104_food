import axiosClient from "./axiosClient";

const thirdpartyApi = {
    requestFacebook: ({ accessToken, userID }) => {
        const url = 'api/login-facebook';
        return axiosClient.post(url, { accessToken, userID });
    },

    requestGoogle: (tokenId) => {
        const url = 'api/login-google';
        return axiosClient.post(url, tokenId);
    }
}

export default thirdpartyApi;