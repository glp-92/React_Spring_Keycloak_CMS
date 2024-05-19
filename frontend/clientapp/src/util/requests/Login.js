export const LoginRequest = async (username, password, totp) => {
    try {
        const url = `http://localhost:8083/login`;
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