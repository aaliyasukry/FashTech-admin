import React, { useState, useEffect } from 'react';
import { addItem, updateItem } from '../../services/itemService'

const AddEditItemModal = ({ onClose, item }) => {
  const [itemData, setItemData] = useState(item || {
    Name: '',
    Description: '',
    Price: '',
    StockQuantity: '',
    CategoryId: '',
    Material: '',
    Type: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setItemData({
        Name: item.Name || '',
        Description: item.Description || '',
        Price: item.Price || '',
        StockQuantity: item.StockQuantity || '',
        CategoryId: item.CategoryId || '',
        Material: item.Material || '',
        Type: item.Type || ''
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Helper function to parse numeric fields
  const parseNumericFields = (data) => {
    return {
      ...data,
      Price: parseFloat(data.Price) || 0, // Parse Price as float (double)
      StockQuantity: parseInt(data.StockQuantity, 10) || 0,
      CategoryId: parseInt(data.CategoryId, 10) || 0,
    };
  };

  const handleSaveItem = async () => {
    const parsedItemData = parseNumericFields(itemData);
    console.log('Parsed Item Data:', parsedItemData);
    try {
      setLoading(true);

      if (item) {
        await updateItem(item.ItemId, parsedItemData);
        alert('Item updated Successfully');
      } else {
        await addItem(itemData);
        alert('Item saved successfully!');
      }
      onClose();
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      alert('Failed to save item. Reason: ' + (error.response?.data?.message || error.message || 'Unknown error.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{item ? 'Edit Item' : 'Add New Item'}</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          name="Name"
          placeholder="Item Name"
          value={itemData.Name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Description"
          placeholder="Description"
          value={itemData.Description}
          onChange={handleChange}
        />
        <input
          type="text"  
          name="Price"
          placeholder="Price"
          value={itemData.Price}
          onChange={handleChange}
          required
        />
        <input
          type="text"  // StockQuantity as text to allow free typing
          name="StockQuantity"
          placeholder="Stock Quantity"
          value={itemData.StockQuantity}
          onChange={handleChange}
        />
        <input
          type="text"
          name="CategoryId"
          placeholder="Category ID"
          value={itemData.CategoryId}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Material"
          placeholder="Material"
          value={itemData.Material}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Type"
          placeholder="Type"
          value={itemData.Type}
          onChange={handleChange}
        />
        <div className='modal-actions'>
          <button onClick={handleSaveItem} disabled={loading}>
            {loading ? 'Saving...' : item ? 'Save Changes' : 'Add Item'}
          </button>
          <button onClick={onClose} disabled={loading}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddEditItemModal;
