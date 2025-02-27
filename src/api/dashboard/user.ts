import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { fetcher, endpoints } from '../../utils/axios-dashboard';
import { HOST_API } from '../../config-global';

const STORAGE_KEY = 'token';

interface ErrorResponse {
    message: string;
}

export const useGetUsers = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const URL = endpoints.users.list;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        accessToken ? [URL, { headers: { Authorization: `Bearer ${accessToken}` } }] : null,
        fetcher
    );

    const memoizedValue = useMemo(
        () => ({
            users: data || [],
            usersLoading: isLoading,
            usersError: error,
            usersValidating: isValidating,
            usersEmpty: !isLoading && !data?.length,
            mutate,
        }),
        [data, isLoading, error, isValidating, mutate]
    );

    return memoizedValue;
}

export const useGetUserDetail = (userId: string | number) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const URL = userId ? `${endpoints.users.details}/${userId}` : null;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        accessToken ? [URL, { headers: { Authorization: `Bearer ${accessToken}` } }] : null,
        fetcher
    );

    const memoizedValue = useMemo(
        () => ({
            userDetail: data || {},
            userDetailLoading: isLoading,
            userDetailError: error,
            userDetailValidating: isValidating,
            userDetailEmpty: !isLoading && !data?.length,
            mutate,
        }),
        [data, isLoading, error, isValidating, mutate]
    );

    return memoizedValue;
}

export const useCreateUsers = (formData: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const createUser = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const URL = HOST_API + endpoints.users.create; // Ensure you're calling the correct endpoint
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
            const message = axiosError?.response?.data?.message || 'Error creating the category. Please try again.';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    return {
        createUser,
        loading,
        error,
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