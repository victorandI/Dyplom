import axios from 'axios';

const API_URL = 'http://192.168.3.10:5000/api';
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000, // 10 секунд
    headers: {
        'Content-Type': 'application/json'
    }
});
export const uploadImage = async (formData) => {
    try {
        const response = await api.post(`/predict`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return response.data;

    } catch (error) {
        console.error('API Error:', error.response || error);
        throw error;
    }
};

export const checkApiHealth = async () => {
    try {
        const response = await axios.get(`${API_URL}/health`);
        return response.data;
    } catch (error) {
        console.error('Health check failed:', error);
        throw error;
    }
};