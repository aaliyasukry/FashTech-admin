import axios from 'axios';
import config from '../config'; 

const API_URL = config.backendUrl; 

// Get all categories
export const getBags = async () => {
  try {
    const response = await axios.get(`${API_URL}/bags`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bags:', error);
    throw error;
  }
};

// Get category by ID
export const getBagById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/bags/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bag by ID:', error);
    throw error;
  }
};

// Create a new category
export const addBag = async (bagData) => {
  try {
    const response = await axios.post(`${API_URL}/bags`, bagData);
    return response.data;
  } catch (error) {
    console.error('Error adding bag:', error);
    throw error;
  }
};

// Update category by ID
export const updateBag = async (id, name) => {
  try {
    const response = await axios.put(`${API_URL}/bags/${id}`, {
      name // Ensure 'name' is being passed correctly
    });
    if (response.data.success) {
      console.log("Bag updated successfully");
    }
  } catch (error) {
    console.error("Error updating bag:", error);
  }
};

// Delete category by ID
export const deleteBag = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/bags/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting bag:', error);
    throw error;
  }
};
