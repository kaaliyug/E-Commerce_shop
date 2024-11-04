//listens to a request that is going to the server and response that is coming from the server

import axios from "axios";

export const setLoadingInterceptor = ({ showLoading, hideLoading }) => {
    // setting up the interceptor goes to the server
    axios.interceptors.request.use(
        req => {
            if (!(req.data instanceof FormData)) showLoading();
            return req;
        },
        error => {
            hideLoading();
            return Promise.reject(error);
        }
    )

    axios.interceptors.response.use(
        //when res from server is ok hide the loading and return it
        res => {
            hideLoading();
            return res;
        },
        error => {
            hideLoading();
            return Promise.reject(error);
        }
    )
}

export default setLoadingInterceptor