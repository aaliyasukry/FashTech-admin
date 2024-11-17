import axios from 'axios';
import config from '../config'; // Import the config to get the backend URL

const API_URL = config.backendUrl; // Access the URL from config

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Get category by ID
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category by ID:', error);
    throw error;
  }
};

// Create a new category
export const addCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, categoryData);
    return response.data;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

// Update category by ID
export const updateCategory = async (id, name) => {
  try {
    const response = await axios.put(`${API_URL}/categories/${id}`, {
      name // Ensure 'name' is being passed correctly
    });
    if (response.data.success) {
      console.log("Category updated successfully");
    }
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Delete category by ID
export const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
