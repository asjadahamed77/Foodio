import axios from 'axios';
import { backendUrl } from './api';

export const createRazorpayOrder = async (data) => {
    return await axios.post(`${backendUrl}/payments/create-order`, data, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
} 

export const verifyPayment = (paymentData) => {
    return axios.post(`${backendUrl}/payments/verify`, paymentData, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
}