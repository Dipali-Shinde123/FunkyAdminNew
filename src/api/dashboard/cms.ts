import useSWR from 'swr';
import { useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { fetcher, endpoints } from '../../utils/axios-dashboard';
import { HOST_API } from '../../config-global';

const STORAGE_KEY = 'token';

interface ErrorResponse {
    message: string;
}

export const useGetCMS = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const URL = endpoints.cms.list;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        accessToken ? [URL, { headers: { Authorization: `Bearer ${accessToken}` } }] : null,
        fetcher
    );

    const memoizedValue = useMemo(
        () => ({
            cms: data || [],
            cmsLoading: isLoading,
            cmsError: error,
            cmsValidating: isValidating,
            cmsEmpty: !isLoading && !data?.length,
            mutate,
        }),
        [data, isLoading, error, isValidating, mutate]
    );

    return memoizedValue;
}

export const useGetCMSDetail = (cmsId: string | number) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const URL = cmsId ? `${endpoints.cms.details}/${cmsId}` : null;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        accessToken ? [URL, { headers: { Authorization: `Bearer ${accessToken}` } }] : null,
        fetcher
    );

    const memoizedValue = useMemo(
        () => ({
            cmsDetail: data || {},
            cmsDetailLoading: isLoading,
            cmsDetailError: error,
            cmsDetailValidating: isValidating,
            cmsDetailEmpty: !isLoading && !data?.length,
            mutate,
        }),
        [data, isLoading, error, isValidating, mutate]
    );

    return memoizedValue;
}

export const useCreateCMS = (formData: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const createCMS = async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const URL = HOST_API + endpoints.cms.create; // Ensure you're calling the correct endpoint
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
        createCMS,
        loading,
        error,
        success
    };
};

export const useUpdateCMS = (cmsId: string | number, formData: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const updateCMS = async () => {
        setLoading(true);
        setError(null);

        const URL = `${HOST_API + endpoints.cms.update}/${cmsId}`;
        try {
            const response = await axios.post(URL, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            return { success: true, data: response.data };
        } catch (error) {
            // Cast the error as an AxiosError to access the response data
            const axiosError = error as AxiosError<ErrorResponse>;

            // Safely access the error message
            const message = axiosError.response?.data?.message || 'Something went wrong.';
            console.log(message);
            setError(message);

            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    return {
        updateCMS,
        loading,
        error,
    };
};