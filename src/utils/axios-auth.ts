import axios from "axios";
import { HOST_API } from "../config-global";
import { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
);

export default axiosInstance;

export const fetcher = async (args: [string, AxiosRequestConfig?] | string) => {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await axiosInstance.get(url, { ...config });
    return res.data;
};

export const poster = async (
    url: string,
    data: any,
    headers: Record<string, string> = {}
): Promise<any> => {
    try {
        if (!url) {
            throw new Error("URL is required for POST request");
        }

        const fullUrl = `${HOST_API}${url}`;
        console.log(fullUrl)

        // Set default headers if not provided
        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers,
        };

        const res = await axios.post(fullUrl, data, { headers: defaultHeaders });
        return res.data;

    } catch (error) {
        console.error("Error posting data:", error);
        throw error;
    }
};

// export const changePasswordPoster = async (url, data, token, headers = {}) => {
//     console.log("inside change password poster")

//     if (!url) {
//         throw new Error("URL is required for POST request");
//     }

//     const fullUrl = `${HOST_API}${url}`;
//     console.log(fullUrl);

//     // Set default headers if not provided
//     const defaultHeaders = {
//         "Content-Type": "application/json",
//         ...(token && { Authorization: `Bearer ${token}` }),  // Only include Authorization header if token exists
//         ...headers,
//     };

//     try {
//         const res = await axios.post(fullUrl, data, { headers: defaultHeaders });
//         return res.data;
//     } catch (error) {
//         console.error("Error posting data:", error);
//         throw error;
//     }
// };

export const puter = async (
    url: string,
    data: any,
    headers: Record<string, string> = {}
): Promise<any> => {
    const URL = `${HOST_API}${url}`;

    // You can add type for headers if you want strict typing
    const res = await axios.put(URL, data, { headers: { ...headers } });
    return res.data;
};

export const deleter = async (url: string, headers: Record<string, string>) => {
    const URL = `${HOST_API}${url}`;
    const res = await axios.delete(URL, { ...headers });
    return res.data;
}

export const endpoints = {
    auth: {
        login: '/admin/login',
        changePassword: '/admin/change-password'
    }
}