import axios from "axios";
import config from "../config";

const API_URL = config.backendUrl;

export const getVariants = async () => {
  try {
    const response = await axios.get(`${API_URL}/variants`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching Variants:', error);
    throw error;
  }
};

export const addVariant = async (variantData) => {
  try {
    const response = await axios.post(`${API_URL}/variants`, variantData);
    return response.data;
  } catch (error) {
    console.error('Error adding Variant:', error);
    throw error;
  }
};

export const updateVariant = async (id, variantData) => {
  try {
    console.log(id, "Request data:", variantData);
    const response = await axios.put(`${API_URL}/variants/${id}`, variantData, {
      headers: {
        "Content-Type": "application/json",
    }   
  });
    console.log("Response:", response.data);
    if (response.data.success) {
      console.log("Variant updated successfully");
    }
  } catch (error) {
    console.error("Error updating variant:", error);
  }
};

export const deleteVariant = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/variants/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting variant:', error);
    throw error;
  }
};