const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const LoginRequest = async (username, password, totp) => {
    try {
        const url = `${backendUrl}/login`;
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "username": username, "password": password, "totp": totp })
            });
        if (!response.ok) {
            throw new Error(`Login error: ${response.statusText}`);
        }
        const login_response = await response.json();
        localStorage.setItem("jwt", login_response.access_token);
        localStorage.setItem("refresh", login_response.refresh_token)
        return login_response;
    } catch (error) {
        console.log(`Error on fetch Posts! ${error}`)
    }
    return null;
};

export const LogoutRequest = async () => {
    const token = localStorage.getItem("jwt");
    const refreshToken = localStorage.getItem("refresh")
    if (!token) return false;
    try {
        const url = `${backendUrl}/revoke`;
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "refresh_token": refreshToken
                })

            });
        if (!response.ok) {
            throw new Error(`Error on logout: ${response.statusText}`);
        }
        localStorage.removeItem("jwt");
        localStorage.removeItem("refresh")
        return true;
    } catch (error) {
        console.log("Logout error", error)
        return false;
    }
};

const RefreshToken = async (refreshToken) => {
    try {
        let url = `${backendUrl}/refresh`;
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "refresh_token": refreshToken})
            });
        if (!response.ok) {
            throw new Error(`Refresh error: ${response.statusText}`);
        }
        const login_response = await response.json();
        return login_response;
    } catch (error) {
        console.log(`Error on fetch Posts! ${error}`)
    }
    return null;
}

export const ValidateToken = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return false;
    try {
        const response = await fetch(`${backendUrl}/valid`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Error validating token: ${response.statusText}`);
        }
        return true;
    } catch (error) {
        const refresh_token = localStorage.getItem("refresh");
        if (refresh_token) {
            const refresh_response = await RefreshToken(refresh_token);
            if (refresh_response) {
                localStorage.setItem("jwt", refresh_response.access_token)
                localStorage.setItem("refresh", refresh_response.refresh_token)
                console.log("token refresh ");
                return true;
            }
        }
        return false;
    }
};