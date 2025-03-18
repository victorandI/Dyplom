import axios from 'axios';

const API_URL = 'http://192.168.3.10:5000/api';
export const uploadImage = async (formData) => {
    try {
        console.log('Sending data to API:', Object.fromEntries(formData));

        const response = await axios.post(`${API_URL}/predict`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('API response:', response.data);
        return response.data;
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message || error);
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