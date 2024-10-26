import React, { useEffect, useState } from 'react';
import itemService from '../../services/itemService';
import AddItemModal from './addItemModal';

const Items = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch items when component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await itemService.getItems();
        setItems(response.data);  // Set the items from API response
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Handle adding the new item to the list
  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);  // Append new item to the items list
    handleCloseModal();  // Close the modal after adding item
  };

  return (
    <div>
      <h2>Items List</h2>
      <button onClick={handleOpenModal}>Add Item</button>
      
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Category ID</th>
            <th>Material</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.ItemId}>
              <td>{item.ItemId}</td>
              <td>{item.Name}</td>
              <td>{item.Description}</td>
              <td>{item.Price}</td>
              <td>{item.StockQuantity}</td>
              <td>{item.CategoryId}</td>
              <td>{item.Material}</td>
              <td>{item.Type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render AddItemModal if isModalOpen is true */}
      {isModalOpen && <AddItemModal onClose={handleCloseModal} onItemAdded={handleItemAdded} />}
    </div>
  );
};

export default Items;
