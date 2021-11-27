import axios from 'axios';
import queryString from 'query-string';
import { Config } from '../Config';
import Auth from '../Utils/Auth';


const axiosClient = axios.create({
    baseURL: Config.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': Config.API_URL
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    if (Auth.getToken() != null)
        config.headers.Authorization = `Bearer ${Auth.getToken()}`;
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    return error.response.data;
});

export default axiosClient;