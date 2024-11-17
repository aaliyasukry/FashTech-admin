import React, { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../../services/itemService'; // Importing getItems from the service file
import AddEditItemModal from './AddEditItemModal';
import { FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa'; 

const Items = () => {
  const [items, setItems] = useState([]); // State to hold fetched items
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch items when component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems(); 
        if (data && data.success) {
          setItems(data.data); 
        } else {
          console.error('Failed to fetch items');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems(); 
  }, []); 

  // Handle modal open/close
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    handleOpenModal(); 
  };

  // Handle delete item action
  const handleDeleteItem = async (itemId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (!isConfirmed) return;

    try {
      setLoading(true);
      await deleteItem(itemId);
      alert('Item deleted successfully!');
      setItems((prevItems) => prevItems.filter(item => item.ItemId !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
      alert("Failed to delete item.");
    } finally {
      setLoading(false);
    }
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items && Array.isArray(items) && items.length > 0 ? (
            items.map((item) => (
              <tr key={item.ItemId}>
                <td>{item.ItemId}</td>
                <td>{item.Name}</td>
                <td>{item.Description}</td>
                <td>{item.Price}</td>
                <td>{item.StockQuantity}</td>
                <td>{item.CategoryId}</td>
                <td>{item.Material}</td>
                <td>{item.Type}</td>
                <td>
                  <button onClick={() => handleEditItem(item)} title="Edit">
                    <FaEdit /> {/* Edit Icon */}
                  </button>
                  <button onClick={() => handleDeleteItem(item.ItemId)} title="Delete">
                    <FaTrash /> {/* Delete Icon */}
                  </button>
                  <button onClick={() => console.log('More actions')} title="More">
                    <FaEllipsisH /> {/* More Icon (Ellipsis) */}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No items available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for adding or editing an item */}
      {isModalOpen && (
        <AddEditItemModal
          item={editingItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Items;
