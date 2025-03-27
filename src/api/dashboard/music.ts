import useSWR from 'swr';
import axios, { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { fetcher, endpoints } from '../../utils/axios-dashboard';
import { HOST_API } from '../../config-global';
import { useSnackbar } from 'notistack';

const STORAGE_KEY = 'token';

interface ErrorResponse {
    message: string;
}

export const useGetMusic = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    
    useEffect(() => {
        const token = localStorage.getItem(STORAGE_KEY);
        setAccessToken(token);
    }, []);

    const URL = endpoints.music.list;
    const { data, isLoading, error, isValidating, mutate } = useSWR(
        accessToken ? [URL, { headers: { Authorization: `Bearer ${accessToken}` } }] : null,
        fetcher
    );

    return useMemo(
        () => ({
            music: data || [],
            musicLoading: isLoading,
            musicError: error,
            musicValidating: isValidating,
            musicEmpty: !isLoading && !data?.length,
            mutate,
        }),
        [data, isLoading, error, isValidating, mutate]
    );
};

export const useCreateMusic = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const createMusic = async (formData: FormData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const URL = `${HOST_API}${endpoints.music.create}`;
        const accessToken = localStorage.getItem(STORAGE_KEY);

        try {
            const response = await axios.post(URL, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(true);
            enqueueSnackbar('Music created successfully!', { variant: 'success' });
            return { success: true, data: response.data };
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const message = axiosError?.response?.data?.message || 'Error creating the music.';
            setError(message);
            enqueueSnackbar(message, { variant: 'error' });
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    return { createMusic, loading, error, success };
};

export const useUpdateMusic = () => {
    const { enqueueSnackbar } = useSnackbar();

    const updateMusic = async (musicId: string | number, formData: FormData) => {
        if (!musicId) return { success: false, message: 'Music ID is required.' };

        const URL = `${HOST_API}${endpoints.music.update}/${musicId}`;
        console.log('API URL:', URL);
        const accessToken = localStorage.getItem(STORAGE_KEY);

        try {
            console.log("FormData before sending:", Array.from((formData as any).entries()));
            const response = await axios.post(URL, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            enqueueSnackbar('Music updated successfully!', { variant: 'success' });
            return { success: true, data: response.data };
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            console.error('Error Response:', axiosError.response?.data);
            const message = axiosError?.response?.data?.message || 'Error updating the music.';
            enqueueSnackbar(message, { variant: 'error' });
            return { success: false, message };
        }
    };

    return { updateMusic };
};

export const useDeleteMusic = () => {
    const { enqueueSnackbar } = useSnackbar();

    const deleteMusic = async (musicId: string | number) => {
        if (!musicId) return { success: false, message: 'Music ID is required.' };

        const URL = `${HOST_API}${endpoints.music.delete}/${musicId}`;
        const accessToken = localStorage.getItem(STORAGE_KEY);

        try {
            await axios.delete(URL, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            enqueueSnackbar('Music deleted successfully!', { variant: 'success' });
            return { success: true };
        } catch (err) {
            const axiosError = err as AxiosError<ErrorResponse>;
            const message = axiosError?.response?.data?.message || 'Error deleting the music.';
            enqueueSnackbar(message, { variant: 'error' });
            return { success: false, message };
        }
    };

    return { deleteMusic };
};
