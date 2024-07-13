const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const GetPostList = async (page, criteria) => {
    let fetchedPosts = null;
    try {
        let url = `${backendUrl}/post?page=${page}`;
        if (criteria !== null) {
            url += criteria;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener posts: ${response.statusText}`);
        }
        fetchedPosts = await response.json();
        return fetchedPosts;
    } catch (error) {
        console.log(`Error on fetch Posts! ${error}`)
    }
    return fetchedPosts;
};