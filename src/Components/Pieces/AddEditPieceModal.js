import React, { useState, useEffect } from 'react';
import { addPiece, updatePiece } from '../../services/pieceService';

const AddEditPieceModal = ({ onClose, piece }) => {
  const [pieceData, setPieceData] = useState({
    variantId: '',
    tagUID: ''
  });
  const [loading, setLoading] = useState(false);

  // Update pieceData when piece prop changes (edit mode)
  useEffect(() => {
    if (piece) {
      setPieceData({
        variantId: piece.variantId || '',
        tagUID: piece.tagUID || ''
      });
    }
  }, [piece]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPieceData({
      ...pieceData,
      [name]: value
    });
  };

  const pareseNumericFields = (data) => {
    return {
      ...data,
      variantId: parseInt(data.variantId, 10) || 0,
    };
  };

  const handleSavePiece = async () => {
    const parsedPieceData = pareseNumericFields(pieceData);
    console.log('Parsed Piece Data:', parsedPieceData);

    if (!parsedPieceData.variantId || !parsedPieceData.tagUID) {
      alert("VariantId and TagUID are required.");
      return;
    }

    try {
      setLoading(true);

      if (piece) {
        // Edit existing piece
        await updatePiece(piece.PieceId, parsedPieceData);
        alert('Piece Updated Successfully');
      } else {
        // Add new piece
        await addPiece(parsedPieceData);
        alert('Piece Added Successfully');
      }
      onClose();
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      alert('Failed to save piece. Reason: ' + (error.response?.data?.message || error.message || 'Unknown error.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{piece ? 'Edit Piece' : 'Add New Piece'}</h2>
        <input
          type="text"
          name="variantId"
          placeholder="Variant ID"
          value={pieceData.variantId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tagUID"
          placeholder="Tag UID"
          value={pieceData.tagUID}
          onChange={handleChange}
          required
        />
        <div className='modal-actions'>
          <button onClick={handleSavePiece} disabled={loading}>
            {loading ? 'Saving...' : piece ? 'Save Changes' : 'Add Piece'}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddEditPieceModal;
