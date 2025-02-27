import { paths } from "../../routes/paths";
import axios from "axios";

function jwtDecode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    try {
        const decodedString = atob(base64);
        const jsonPayload = decodeURIComponent(
            Array.prototype.map.call(decodedString, (c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join('')
        );

        return JSON.parse(jsonPayload);
    } catch (e) {
        throw new Error('Invalid JWT or payload decoding error');
    }
}

export const isValidToken = (accessToken: string) => {
    if (!accessToken) {
        return false;
    }

    const decoded = jwtDecode(accessToken);

    const currentTime = Date.now() / 1000;

    return decoded.exp > currentTime;
};

export const tokenExpired = (exp: number): void => {
    let expiredTimer;

    const currentTime = Date.now();

    const timeLeft = exp * 1000 - currentTime;

    clearTimeout(expiredTimer);

    expiredTimer = setTimeout(() => {
        localStorage.removeItem('token');

        window.location.href = paths.auth.signin;
    }, timeLeft);
};

export const setLocalStorage = (accessToken: string | null) => {
    if (accessToken) {
        localStorage.setItem('token', accessToken);

        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        const { exp } = jwtDecode(accessToken);
        tokenExpired(exp);
    } else {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common.Authorization;
    }
};
