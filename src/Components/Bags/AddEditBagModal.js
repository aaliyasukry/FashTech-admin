// components/AddEditBagModal.js

import React, { useState, useEffect } from 'react';
import { addBag, updateBag } from '../../services/bagService';

const AddEditBagModal = ({ onClose, bag }) => {
  const [bagData, setBagData] = useState({
    bagRFID: ''
  });
  const [loading, setLoading] = useState(false);

  // If bag is provided (for edit mode), populate form with existing data
  useEffect(() => {
    if (bag) {
      setBagData({
        bagRFID: bag.BagRFID || ''
      });
    }
  }, [bag]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBagData({
      ...bagData,
      [name]: value
    });
  };

  const handleSaveBag = async () => {
    if (!bagData.bagRFID) {
      alert("BagRFID is required.");
      return;
    }

    try {
      setLoading(true);
      if (bag) {
        // Update existing bag
        await updateBag(bag.BagID, bagData);
        alert('Bag Updated Successfully');
      } else {
        // Add new bag
        await addBag(bagData);
        alert('Bag Added Successfully');
      }
      onClose();
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      alert('Failed to save bag. Reason: ' + (error.response?.data?.message || error.message || 'Unknown error.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{bag ? 'Edit Bag' : 'Add New Bag'}</h2>
        <input
          type="text"
          name="bagRFID"
          placeholder="Bag RFID"
          value={bagData.bagRFID}
          onChange={handleChange}
          required
        />
        <div className='modal-actions'>
          <button onClick={handleSaveBag} disabled={loading}>
            {loading ? 'Saving...' : bag ? 'Save Changes' : 'Add Bag'}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddEditBagModal;

