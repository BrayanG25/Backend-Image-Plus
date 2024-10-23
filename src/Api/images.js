import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env' });

const BASE_URL = process.env.API_BASE_URL_IMAGES;
const CLIENT_ID = process.env.API_CLIENT_ID_IMAGES;

export const fetchImagesByKeywords = async (searchQuery, page = 1, perPage = 10) => {
    try {
        const url = `${BASE_URL}?query=${encodeURIComponent(searchQuery)}&page=${page}&per_page=${perPage}&client_id=${CLIENT_ID}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Request failed: ${response.statusText}`);
        }
        
        return await response.json();
        
    } catch (error) {
        console.error(`Fetch request error: ${error}`);
        throw error;
    }
};