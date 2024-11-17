// import React, { useState } from 'react';
// import {addItem} from '../../services/itemService';

// const AddItemModal = ({ onClose, onItemAdded }) => {
//   const [itemData, setItemData] = useState({
//     Name: '',
//     Description: '',
//     Price: 0,
//     StockQuantity: 0,
//     CategoryId: '',
//     Material: '',
//     Type: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setItemData({
//       ...itemData,
//       [name]: value
//     });
//   };

//   const handleAddItem = async () => {
//     try {
//       const newItem = await itemService.addItem(itemData);
//       onItemAdded(newItem); // Notify parent component of new item
//       alert('Item added successfully!');
//     } catch (error) {
//       console.error('Error adding item:', error);
//       alert('Failed to add item. Please try again.');
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Add New Item</h2>
//         <input
//           type="text"
//           name="Name"
//           placeholder="Item Name"
//           value={itemData.Name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="Description"
//           placeholder="Description"
//           value={itemData.Description}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="Price"
//           placeholder="Price"
//           value={itemData.Price}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="StockQuantity"
//           placeholder="Stock Quantity"
//           value={itemData.StockQuantity}
//           onChange={handleChange}
//         />
//         <input
//           type="number"
//           name="CategoryId"
//           placeholder="Category ID"
//           value={itemData.CategoryId}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="Material"
//           placeholder="Material"
//           value={itemData.Material}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="Type"
//           placeholder="Type"
//           value={itemData.Type}
//           onChange={handleChange}
//         />
//         <button onClick={handleAddItem}>Add Item</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default AddItemModal;