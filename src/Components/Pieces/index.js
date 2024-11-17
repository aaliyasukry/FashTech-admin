import React, { useEffect, useState } from 'react';
import AddEditPieceModal from './AddEditPieceModal';
import { FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa';
import { getPieces, deletePiece } from '../../services/pieceService';

const Pieces = () => {
  const [pieces, setPieces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPieces = async () => {
      try {
        const data = await getPieces();
        if (data && data.success){
          setPieces(data.data);
        } else {
          console.error('Failed to fetch pieces');
        } 
      } catch (error) {
        console.error('Error fetching pieces:', error);
      }
    };
    fetchPieces();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleEditPiece = (piece) => {
    setEditingItem(piece);
    handleOpenModal(); 
  };

  const handleDeletePiece = async (pieceId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (!isConfirmed) return;

    try {
      setLoading(true);
      await deletePiece(pieceId);
      alert('Piece deleted successfully!');
      setPieces((prevItems) => prevItems.filter(piece => piece.PieceId !== pieceId));
    } catch (error) {
      console.error('Error deleting piece:', error);
      alert("Failed to delete piece.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Pieces</h2>
      <button onClick={handleOpenModal}>Add Piece</button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>PieceId</th>
            <th>VariantId</th>
            <th>TagUID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pieces && Array.isArray(pieces) && pieces.length > 0 ? (
            pieces.map((piece) => (
            <tr key={piece.PieceId}>
              <td>{piece.PieceId}</td>
              <td>{piece.VariantId}</td>
              <td>{piece.TagUID}</td>
              <td>
                  <button onClick={() => handleEditPiece(piece)} title="Edit">
                    <FaEdit /> 
                  </button>
                  <button onClick={() => handleDeletePiece(piece.PieceId)} title="Delete">
                    <FaTrash /> 
                  </button>
                  <button onClick={() => console.log('More actions')} title="More">
                    <FaEllipsisH /> 
                  </button>
                </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className='8'>No pieces available</td>
          </tr>
        )}
        </tbody>
      </table>
      {isModalOpen && (
        <AddEditPieceModal
          piece={editingItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Pieces;