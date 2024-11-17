import React, { useEffect, useState } from 'react';
import AddEditBagModal from './AddEditBagModal';
import { getBags, deleteBag } from '../../services/bagService';
import { FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa';

const Bags = () => {
  const [bags, setBags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBags = async () => {
      try {
        const data = await getBags(); 
        if (data && data.success) {
          setBags(data.data); 
        } else {
          console.error('Failed to fetch bags');
        }
      } catch (error) {
        console.error('Error fetching bags:', error);
      }
    };
    fetchBags(); 
  }, []); 

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleEditBag = (bag) => {
    setEditingItem(bag);
    handleOpenModal(); 
  };

  const handleDeleteBag = async (bagId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this bag?");
    if (!isConfirmed) return;

    try {
      setLoading(true);
      await deleteBag(bagId);
      alert('Bag deleted successfully!');
      setBags((prevItems) => prevItems.filter(bag => bag.BagId !== bagId));
    } catch (error) {
      console.error('Error deleting bag:', error);
      alert("Failed to delete bag.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Bags</h2>
      <button onClick={handleOpenModal}>Add Bag</button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>BagId</th>
            <th>BagRFID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bags && Array.isArray(bags) && bags.length > 0 ? (
            bags.map((bag) => (
            <tr key={bag.BagId}>
              <td>{bag.BagId}</td>
              <td>{bag.BagRFID}</td>
              <td>
                  <button onClick={() => handleEditBag(bag)} title="Edit">
                    <FaEdit /> 
                  </button>
                  <button onClick={() => handleDeleteBag(bag.BagId)} title="Delete">
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
            <td colSpan="8">No bags available</td>
          </tr>
        )}
        </tbody>
      </table>
      {isModalOpen && (
        <AddEditBagModal
          bag={editingItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Bags;