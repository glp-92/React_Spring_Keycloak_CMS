const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const GetCategories = async () => {
    try {
        const response = await fetch(`${backendUrl}/category`);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const GetCategoriesPageable = async (page, perPage) => {
    try {
        let url = `${backendUrl}/category?page=${page}`;
        if (perPage) {
            url += `&perpage=${perPage}`
        }
        const response = await fetch(url);
        return response;
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};

export const CreateCategory = async (newCategory, token) => {
    try {
        const payload = {
            name: newCategory,
            slug: newCategory
        };
        const response = await fetch(`${backendUrl}/category`, {
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

export const DeleteCategory = async (categoryId, token) => {
    try {
        const response = await fetch(`${backendUrl}/category/${categoryId}`, {
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

export const UpdateCategory = async (category, token) => {
    try {
        const response = await fetch(`${backendUrl}/category`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(category)
        });
        return response
    } catch (error) {
        throw new Error(`Error en la solicitud: ${error}`);
    }
};