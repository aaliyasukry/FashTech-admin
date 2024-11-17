import axios from "axios";
import config from "../config";

const API_URL = config.backendUrl;

export const getPieces = async () => {
  try {
    const response = await axios.get(`${API_URL}/pieces`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching Pieces:', error);
    throw error;
  }
};

export const addPiece = async (pieceData) => {
  try {
    const response = await axios.post(`${API_URL}/pieces`, pieceData);
    return response.data;
  } catch (error) {
    console.error('Error adding Piece:', error);
    throw error;
  }
};

export const updatePiece = async (id, pieceData) => {
  try {
    console.log(id, "Request data:", pieceData);
    const response = await axios.put(`${API_URL}/pieces/${id}`, pieceData, {
      headers: {
        "Content-Type": "application/json",
    }   
  });
    console.log("Response:", response.data);
    if (response.data.success) {
      console.log("Piece updated successfully");
    }
  } catch (error) {
    console.error("Error updating piece:", error);
  }
};

export const deletePiece = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/pieces/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting piece:', error);
    throw error;
  }
};