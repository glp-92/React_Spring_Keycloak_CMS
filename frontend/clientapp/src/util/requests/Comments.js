const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const CreateComment = async (commentPayload) => {
    try {
        const response = await fetch(`${backendUrl}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentPayload)
        });
        return response
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};


export const DeleteComment = async (commentId) => {
    const token = localStorage.getItem("jwt");
    try {
        const response = await fetch(`${backendUrl}/comment/${commentId}`, {
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