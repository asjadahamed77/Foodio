import axios from 'axios';
import { backendUrl } from './api';

export const addUser = async (user) => {
    return await axios.post(`${backendUrl}/admin/register`, user, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
}

export const deleteUser = async (id) => {
    return await axios.delete(`${backendUrl}/admin/users/${id}`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
}

export const fetchUsers = async () => {
    return await axios.get(`${backendUrl}/admin/users`, {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    });
}