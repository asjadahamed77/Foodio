import axios from 'axios';
import { backendUrl } from './api';

export const addItem = async (item) => {
    return await axios.post(`${backendUrl}/admin/items`, item, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
}

export const deleteItem = async (itemId) => {
    return await axios.delete(`${backendUrl}/admin/items/${itemId}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
}

export const fetchItems = async () => {
    return await axios.get(`${backendUrl}/items`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
}