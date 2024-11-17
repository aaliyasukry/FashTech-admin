import React, { useEffect, useState } from 'react';
import AddPieceModal from './addPieceModal';
import pieceService from '../../services/pieceService';

const Pieces = () => {
  const [pieces, setPieces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPieces = async () => {
    try {
      const response = await pieceService.getPieces();
      setPieces(response.data);
    } catch (error) {
      console.error('Error fetching pieces:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePieceAdded = (newPiece) => {
    setPieces([...pieces, newPiece]);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchPieces();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {pieces.map((piece) => (
            <tr key={piece.PieceId}>
              <td>{piece.PieceId}</td>
              <td>{piece.VariantId}</td>
              <td>{piece.TagUID}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddPieceModal onClose={handleCloseModal} onPieceAdded={handlePieceAdded} />
      )}
    </div>
  );
};

export default Pieces;