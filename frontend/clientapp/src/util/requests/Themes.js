const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const GetThemes = async () => {
    try {
        const response = await fetch(`${backendUrl}/theme`);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const GetThemesPageable = async (page, perPage) => {
    try {
        let url = `${backendUrl}/theme?page=${page}`;
        if (perPage) {
            url += `&perpage=${perPage}`
        }
        const response = await fetch(url);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const CreateTheme = async (themeData, token) => {
    console.log(JSON.stringify(themeData))
    try {
        const response = await fetch(`${backendUrl}/theme`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(themeData)
        });
        return response
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const DeleteTheme = async (themeId, token) => {
    try {
        const response = await fetch(`${backendUrl}/theme/${themeId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const UpdateTheme = async (themeData, token) => {
    try {
        const response = await fetch(`${backendUrl}/theme`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(themeData)
        });
        return response
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};