import { RefreshToken } from './Auth';

export const FetchWithAuth = async (url, options) => {
    let token = localStorage.getItem("jwt");

    const makeRequest = async () => {
        return await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${token}`
            }
        });
    };

    try {
        let response = await makeRequest();
        if (response.status === 401) {
            const newTokens = await RefreshToken();
            if (newTokens && newTokens.access_token) {
                token = newTokens.access_token;
                localStorage.setItem("jwt", token);
                response = await makeRequest();
            } else {
                throw new Error('RefreshFailError');
            }
        }
        return response;
    } catch (error) {
        throw new Error(`ProcessingRequestError ${error}`);
    }
};