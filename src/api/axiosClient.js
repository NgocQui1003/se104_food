import axios from 'axios';
import queryString from 'query-string';
import { Config } from '../Config';
import { getToken } from '../utils/Auth';
const axiosClient = axios.create({
    baseURL = Config.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    config.headers.authorization = `Bearer ${getToken()}`;
    return config;
});

axiosClient.interceptors.response.use((response) => {
    // Custom !!!
    // if (response && response.data) {
    //     return response.data;
    // }
    return response;
}, (error) => {
    // Handle error
    throw error;
});

export default axiosClient;