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

export const updateItem = async (id, params) => {
  try {
    // Make the API call to update the item
    const response = await axios.put(`${API_URL}/items/${id}`, null, {
      params,
    });

    // Handle the response
    if (response.status === 200) {
      console.log('Item updated successfully:', response.data);
      return response.data;
    } else {
      console.error('Failed to update item:', response.data);
    }
  } catch (error) {
    console.error('Error updating item:', error.message);
    throw new Error('Error updating the item');
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
