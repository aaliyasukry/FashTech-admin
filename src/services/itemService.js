import axios from "axios";
import config from "../config";

const addItem = async (itemData) => {
    try{
        const response = await axios.post(`${config.backendUrl}/items`, itemData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {addItem};