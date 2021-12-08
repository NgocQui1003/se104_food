import axiosClient from "./axiosClient";

const thirdpartyApi = {
    requestFacebook: ({ accessToken, userID }) => {
        const url = '/api/auth/login-facebook';
        return axiosClient.post(url, { accessToken, userID });
    },

    requestGoogle: (tokenId) => {
        const data = {
            tokenId: tokenId
        }
        const url = '/api/auth/login-google';
        return axiosClient.post(url, data);
    }
}

export default thirdpartyApi;