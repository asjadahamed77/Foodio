import axios from 'axios';
import { backendUrl } from './api';

export const addCategory = async (category) => {
   return await axios.post(`${backendUrl}/admin/categories`, category, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}}) 
}

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`${backendUrl}/admin/categories/${categoryId}`, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}})
}

export const fetchCategories = async () => {
    return await axios.get(`${backendUrl}/categories`, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}})
}