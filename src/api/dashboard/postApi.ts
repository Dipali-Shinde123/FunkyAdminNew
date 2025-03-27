import useSWR from 'swr';
import { useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { fetcher, endpoints } from '../../utils/axios-dashboard';
import { HOST_API } from '../../config-global';

const STORAGE_KEY = 'token';

interface ErrorResponse {
    message: string;
}

const getToken = () => localStorage.getItem(STORAGE_KEY);

export const useGetUsers = () => {
    const accessToken = getToken();
    const URL = endpoints.users.list;

    const { data, isLoading, error, isValidating, mutate } = useSWR(
        accessToken ? [URL, { headers: { Authorization: `Bearer ${accessToken}` } }] : null,
        fetcher
    );

    return useMemo(
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
};

export const useGetUserDetail = (userId: string | number) => {
    const accessToken = getToken();
    const URL = userId ? `${endpoints.users.details}/${userId}` : null;

    const { data, isLoading, error, isValidating, mutate } = useSWR(
        accessToken ? [URL, { headers: { Authorization: `Bearer ${accessToken}` } }] : null,
        fetcher
    );

    return useMemo(
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
};

export const useCreateUsers = (formData: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const accessToken = getToken();

    const createUser = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post(`${HOST_API}${endpoints.users.create}`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            return { success: true, data: response.data };
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const message = axiosError?.response?.data?.message || 'Error creating the user. Please try again.';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    return { createUser, loading, error, success };
};

export const fetchCountries = async () => {
    const token = getToken();
    const response = await axios.get(`${HOST_API}/country`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.country_data || [];
};

export const fetchUsers = async () => {
    const token = getToken();
    const response = await axios.get(`${HOST_API}/taguser/list`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data || [];
};

export const createPost = async (formData: FormData) => {
    const token = getToken();
    const response = await axios.post(`${HOST_API}/admin/post`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const fetchPosts = async () => {
    const token = getToken();
    const response = await axios.get(`${HOST_API}/admin/post/list`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data || [];
};

export const deletePost = async (postId: number) => {
    const token = getToken();
    await axios.delete(`${HOST_API}/admin/post/delete/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
export const createStory = async (formData: FormData) => {
    const token = getToken();
    const response = await axios.post(`${HOST_API}/admin/story`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
    console.log(response.data)
    return response.data;
};

export const fetchUserContentList = async () => {
    const token = getToken();
    const response = await axios.get(`${HOST_API}/admin/user/content/list`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    console.log("API Story Data:",response .data);
    return response.data.data || [];
};

export const deleteStory = async (storyId: number) => {
    const token = getToken();
    await axios.delete(`${HOST_API}/admin/story/delete/${storyId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

