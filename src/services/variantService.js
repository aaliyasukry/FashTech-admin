import axios from "axios";
import config from "../config";

const getVariants = async () => {
  try {
    const response = await axios.get(`${config.backendUrl}/variants`);
    return response.data; // Return the response data
  } catch (error) {
    throw error;
  }
};

const addVariant = async (variantData) => {
  try {
    const response = await axios.post(`${config.backendUrl}/variants`, variantData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default { getVariants, addVariant };
