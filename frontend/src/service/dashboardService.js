import axios from 'axios';
import { backendUrl } from './api';

export const fetchDashboardData = async()=>{
    return await axios.get(`${backendUrl}/dashboard`, {headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`}}) 
}