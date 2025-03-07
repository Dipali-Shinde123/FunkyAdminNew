import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { fetcher, endpoints } from '../../utils/axios-dashboard';
import { HOST_API } from '../../config-global';

const STORAGE_KEY = 'token';

interface ErrorResponse {
    message: string;
}

export const useGetNews = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const URL = endpoints.news.list;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        accessToken ? [URL, { headers: { Authorization: `Bearer ${accessToken}` } }] : null,
        fetcher
    );

    const memoizedValue = useMemo(
        () => ({
            news: data || [],
            newsLoading: isLoading,
            newsError: error,
            newsValidating: isValidating,
            newsEmpty: !isLoading && !data?.length,
            mutate,
        }),
        [data, isLoading, error, isValidating, mutate]
    );

    return memoizedValue;
}

export const useGetNewsDetail = (newsId: string | number) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const URL = newsId ? `${endpoints.news.details}/${newsId}` : null;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        accessToken ? [URL, { headers: { Authorization: `Bearer ${accessToken}` } }] : null,
        fetcher
    );

    const memoizedValue = useMemo(
        () => ({
            newsDetail: data || {},
            newsDetailLoading: isLoading,
            newsDetailError: error,
            newsDetailValidating: isValidating,
            newsDetailEmpty: !isLoading && !data?.length,
            mutate,
        }),
        [data, isLoading, error, isValidating, mutate]
    );

    return memoizedValue;
}

export const useCreateNews = (formData: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const createNews = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const URL = HOST_API + endpoints.news.create; // Ensure you're calling the correct endpoint
        try {
            const response = await axios.post(URL, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            return { success: true, data: response.data };
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>; // Type AxiosError with expected response structure
            // Safely access error properties with fallback
            const message = axiosError?.response?.data?.message || 'Error creating the News. Please try again.';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    return {
        createNews,
        loading,
        error,
        success
    };
};

// export const useUpdateCategories = (categoryId: string | number, formData: any) => {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [accessToken, setAccessToken] = useState<string | null>(null);

//     useEffect(() => {
//         const token = localStorage.getItem(STORAGE_KEY);
//         setAccessToken(token);
//     }, []);

//     const updateCategory = async () => {
//         setLoading(true);
//         setError(null);

//         const URL = `${HOST_API + endpoints.users.update}/${categoryId}`;
//         try {
//             const response = await axios.post(URL, formData, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             return { success: true, data: response.data };
//         } catch (error) {
//             const axiosError = error as AxiosError;
//             setError(axiosError.response?.data?.message || 'Something went wrong.');
//             return { success: false, message: axiosError.response?.data?.message || 'Something went wrong.' };
//         } finally {
//             setLoading(false);
//         }
//     };

//     return {
//         updateCategory,
//         loading,
//         error,
//     };
// };