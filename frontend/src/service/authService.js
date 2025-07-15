import axios from "axios";
import { backendUrl } from "./api";

export const login = async(data) => {
    return await axios.post(`${backendUrl}/login`, data); 
}