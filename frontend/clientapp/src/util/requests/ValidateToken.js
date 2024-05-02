const RefreshToken = async (refreshToken) => {
    try {
        let url = `http://localhost:8083/refresh`;
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
        const response = await fetch(`http://localhost:8083/valid`, {
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