import { DB_URI } from "app/constants";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";
import { getCookie } from "app/utils/cookie";
import { COOKIE_USER } from "app/constants";

const axiosClient = axios.create({
	baseURL: DB_URI,
	headers: {
		"content-type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config: AxiosRequestConfig) {
	// Do something before request is sent
	const user = JSON.parse(getCookie(COOKIE_USER));

	const token = user?.token;
	if (token) {
		// Add token to header request
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response :AxiosResponse) {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response.data;
}, function (error) {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error
	return Promise.reject(error);
});


export default axiosClient;