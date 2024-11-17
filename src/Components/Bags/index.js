import React, { useEffect, useState } from 'react';
import AddBagModal from './addPieceModal';
import bagService from '../../services/pieceService';

const Bags = () => {
  const [bags, setBags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBags = async () => {
    try {
      const response = await bagService.getBags();
      setBags(response.data);
    } catch (error) {
      console.error('Error fetching bags:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBagAdded = (newBag) => {
    setBags([...bags, newBag]);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchBags();
  }, []);

  return (
    <div>
      <h2>Bags</h2>
      <button onClick={handleOpenModal}>Add Bag</button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>BagId</th>
            <th>BagRFID</th>
            <th>Piece</th>
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

export default Bags;