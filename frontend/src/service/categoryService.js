import axios from 'axios';
import { backendUrl } from './api';

export const addCategory = async (category) => {
   return await axios.post(`${backendUrl}/categories`, category)
}

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`${backendUrl}/categories/${categoryId}`)
}

export const fetchCategories = async () => {
    return await axios.get(`${backendUrl}/categories`)
}