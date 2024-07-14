const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const LoginRequest = async (username, password, totp) => {
    const url = `${backendUrl}/login`;
    try {
        const response = await fetch(url,
            {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "username": username, "password": password, "totp": totp })
            });
        if (!response.ok) {
            throw new Error(`Login error: ${response.statusText}`);
        }
        const loginResponse = await response.json();
        localStorage.setItem("jwt", loginResponse.access_token);
        return loginResponse;
    } catch (error) {
        throw new Error(`LoginError`)
    }
};

export const LogoutRequest = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return false;
    const url = `${backendUrl}/revoke`;
    try {
        const response = await fetch(url,
            {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        if (!response.ok) {
            throw new Error(`Error on logout: ${response.statusText}`);
        }
        localStorage.removeItem("jwt");
        return true;
    } catch (error) {
        return false;
    }
};

export const ValidateToken = async () => {
    let token = localStorage.getItem("jwt");

    const makeValidateTokenRequest = async () => {
        const response = await fetch(`${backendUrl}/valid`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response
    }

    try {
        let response = await makeValidateTokenRequest();
        if (response.status === 401) {
            const newTokens = await RefreshToken();
            if (newTokens && newTokens.access_token) {
                token = newTokens.access_token;
                localStorage.setItem("jwt", token);
                response = await makeValidateTokenRequest();
            } else {
                throw new Error(`Refresh error: ${response.statusText}`);
            }
        } else if (!response.ok) {
            throw new Error(`Refresh error: ${response.statusText}`);
        }
        return true;
    } catch (error) {
        throw new Error(`ValueError ${error}`)
    }
};

export const RefreshToken = async () => {
    let url = `${backendUrl}/refresh`;
    const response = await fetch(url,
        {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        });
    if (!response.ok) {
        throw new Error(`Refresh error: ${response.statusText}`);
    }
    const login_response = await response.json();
    return login_response;
};