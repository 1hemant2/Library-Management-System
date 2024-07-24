/**
 * setup for sending jwt token for each request 
 */

import axios from "axios";
import { baseUrl } from "./baseUrl";

function getToken() {
    return localStorage.getItem("token");
}

export const axiosInstances = axios.create({
    baseURL: baseUrl,
    headers: {
        authorization: `Bearer ${getToken()}`
    }
})

axiosInstances.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${getToken()}`;
    return config;
});