export const GetThemes = async () => {
    try {
        const response = await fetch(`http://localhost:8083/theme`);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const GetThemesPageable = async (page) => {
    try {
        const response = await fetch(`http://localhost:8083/theme?page=${page}`);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const CreateTheme = async (themeData, token) => {
    console.log(JSON.stringify(themeData))
    try {
        const response = await fetch("http://localhost:8083/theme", {
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
        const response = await fetch(`http://localhost:8083/theme/${themeId}`, {
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
        const response = await fetch("http://localhost:8083/theme", {
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