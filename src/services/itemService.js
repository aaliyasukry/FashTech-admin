import axios from 'axios';
import config from '../config'; 

const API_URL = config.backendUrl; 

// Function to fetch all items
export const getItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data; // Return the full response data
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error; // Throw the error so it can be handled by the caller
  }
};

// Add a new item 
export const addItem = async (newItem) => {
  try {
    const response = await axios.post(`${API_URL}/items`, newItem);
    return response.data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

export const updateItem = async (id, itemData) => {
  try {
    console.log(id, "Request data:", itemData);
    const response = await axios.put(`${API_URL}/items/${id}`, itemData, {
      headers: {
        "Content-Type": "application/json",
    }   
  });
    console.log("Response:", response.data);
    if (response.data.success) {
      console.log("Item updated successfully");
    }
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

// Delete category by ID
export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/items/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};
