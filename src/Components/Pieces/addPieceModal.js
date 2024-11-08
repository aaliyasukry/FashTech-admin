import React, { useState } from 'react';
import pieceService from '../../Services/pieceService';

const AddPieceModal = ({ onClose, onPieceAdded }) => {
  const [pieceData, setPieceData] = useState({
    PieceId: '',
    VariantId: '',
    TagUID: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPieceData({
      ...pieceData,
      [name]: value
    });
  };

  const handleAddPiece = async () => {
    try {
      const newPiece = await pieceService.addPiece(pieceData);
      onPieceAdded(newPiece);
      alert('Piece added successfully!');
    } catch (error) {
      console.error('Error adding piece:', error);
      alert('Failed to add piece. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Piece</h2>
        <input
          type="text"
          name="PieceId"
          placeholder="Piece ID"
          value={pieceData.PieceId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="VariantId"
          placeholder="Variant ID"
          value={pieceData.VariantId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="TagUID"
          placeholder="Tag UID"
          value={pieceData.TagUID}
          onChange={handleChange}
          required
        />
        <button onClick={handleAddPiece}>Add Piece</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddPieceModal;