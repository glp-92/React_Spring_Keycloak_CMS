export const GetCategories = async () => {
    try {
        const response = await fetch(`http://localhost:8083/categorie`);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const GetCategoriesPageable = async (page, perPage) => {
    try {
        let url = `http://localhost:8083/categorie?page=${page}`;
        if (perPage) {
            url += `&perpage=${perPage}`
        }
        const response = await fetch(url);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const CreateCategorie = async (newCategorie, token) => {
    try {
        const payload = {
            name: newCategorie,
            slug: newCategorie
        };
        const response = await fetch("http://localhost:8083/categorie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        return response
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const DeleteCategorie = async (categorieId, token) => {
    try {
        const response = await fetch(`http://localhost:8083/categorie/${categorieId}`, {
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

export const UpdateCategorie = async (categorie, token) => {
    try {
        const response = await fetch("http://localhost:8083/categorie", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(categorie)
        });
        return response
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};