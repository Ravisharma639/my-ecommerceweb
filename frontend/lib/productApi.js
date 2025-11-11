// frontend/lib/orderApi.js

import axiosInstance from './axiosInstance'; // Use your configured axios instance
// The base URL for your Express backend is likely set in your .env.local as NEXT_PUBLIC_API_URL

export const createOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post('/api/orders', orderData);
        // Assuming Express returns { orderId: '...' } on success
        return response.data; 
    } catch (error) {
        // Return a structured error object
        return { error: error.response?.data?.message || 'Error saving order on backend' };
    }
};