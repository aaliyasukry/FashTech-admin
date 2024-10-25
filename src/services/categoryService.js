import axios from "axios";
import config from "../config";

const addCategory = async (categoryData) => {
    try{
        const response = await axios.post(`${config.backendUrl}/categories`, categoryData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {addCategory};