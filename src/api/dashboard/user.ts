import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { fetcher, endpoints } from '../../utils/axios-dashboard';
import { HOST_API } from '../../config-global';

const STORAGE_KEY = 'token';

interface ErrorResponse {
    message: string;
}

// GET ALL USERS
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
};

// GET USER DETAILS
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
};

// CREATE USER
export const useCreateUsers = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const createUser = async (formData: any) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const URL = HOST_API + endpoints.users.create;
        const token = localStorage.getItem(STORAGE_KEY);

        try {
            const response = await axios.post(URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess(true);
            return {
                success: true,
                message: response.data.message || 'User created successfully',
                data: response.data.data,
                status: response.status,
            };
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const message = axiosError?.response?.data?.message || 'Error creating the user. Please try again.';
            setError(message);
            return {
                success: false,
                message,
                status: axiosError?.response?.status || 500,
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        createUser,
        loading,
        error,
        success,
    };
};

// UPDATE USER
export const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const updateUser = async (userId: string | number, formData: any) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const token = localStorage.getItem(STORAGE_KEY);
        const URL = `${HOST_API + endpoints.users.update}/${userId}`;

        try {
            const response = await axios.post(URL, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setSuccess(true);
            return {
                success: true,
                message: response.data.message || 'User updated successfully',
                data: response.data.data,
            };
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const message = axiosError?.response?.data?.message || 'Error updating user.';
            setError(message);
            return {
                success: false,
                message,
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        updateUser,
        loading,
        error,
        success,
    };
};

// BLOCK / UNBLOCK / SUSPEND / REWARD USER
export const useBlockUnblockUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const blockUnblockUser = async (userId: string | number, status: 'active' | 'suspend' | 'block' | 'reward') => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const token = localStorage.getItem(STORAGE_KEY);
        const URL = HOST_API + endpoints.users.blockUnblock;

        try {
            const response = await axios.post(URL, {
                userId,
                status,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccess(true);
            return {
                success: true,
                message: response.data.message || 'User status updated successfully',
            };
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const message = axiosError?.response?.data?.message || 'Failed to update user status.';
            setError(message);
            return {
                success: false,
                message,
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        blockUnblockUser,
        loading,
        error,
        success,
    };
};
