const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const SavePost = async (method, token, postData) => {
    try {
        const response = await fetch(`${backendUrl}/post`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const DeletePost = async (postId, token) => {
    try {
        const response = await fetch(`${backendUrl}/post/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
}