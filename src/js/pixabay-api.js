import axios from 'axios';
const API_KEY = '56253935-84605c6ab25f84a7284cdd72a';
const BASE_URL = 'https://pixabay.com/api/';
export async function getImagesByQuery(query, page = 1) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: 15,
    });
    try {
        const response = await axios.get(`${BASE_URL}?${searchParams}`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}