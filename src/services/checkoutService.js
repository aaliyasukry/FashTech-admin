import axios from "axios";
import config from "../config";

const API_URL = config.backendUrl;

export const getLatestRFIDTag = async () => {
    try {
        const response = await axios.get(`${API_URL}/adminRfid`);
        return response.data;
    } catch (error) {
        console.error('Error fetching RFID data:', error);
        throw error;
    }
};