import axios from 'axios';

import Constants from './Constants';

import React from "react";



const axiosClient = axios.create({
    baseURL: `${Constants.BASE_URL}/api`,
})


axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.token}`
    return config
});

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {

        return error;

    }else if (error.response && error.response.status === 500){

    }
    throw error;
});

export default axiosClient;
