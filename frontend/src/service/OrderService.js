import axios from 'axios';
import { backendUrl } from './api';

export const latestOrders = async()=>{
    return await axios.get(`${backendUrl}/orders/latest`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
}

export const createOrder = async (order) => {
    return await axios.post(`${backendUrl}/orders`, order, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
}

export const deleteOrder = async (id) => {
    return await axios.delete(`${backendUrl}/orders/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
}