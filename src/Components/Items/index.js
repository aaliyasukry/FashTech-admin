import React, { useEffect, useState } from 'react';
import itemService from '../../Services/itemService';
import AddItemModal from './addItemModal';

const Items = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await itemService.getItems();
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleItemAdded = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
    handleCloseModal();
  };

  return (
    <div>
      <h2>Items List</h2>
      <button onClick={handleOpenModal}>Add Item</button>

      <table className="styled-table">
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
          {items.map((item, index) => (
            <tr key={item.ItemId} className={index % 2 === 1 ? "active-row" : ""}>
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
      {isModalOpen && <AddItemModal onClose={handleCloseModal} onItemAdded={handleItemAdded} />}
    </div>
  );
};

export default Items;