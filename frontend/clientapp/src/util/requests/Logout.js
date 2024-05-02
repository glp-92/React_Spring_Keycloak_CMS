export const LogoutRequest = async () => {
    const token = localStorage.getItem("jwt");
    const refreshToken = localStorage.getItem("refresh")
    if (!token) return false;
    try {
        const url = `http://localhost:8083/revoke`;
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