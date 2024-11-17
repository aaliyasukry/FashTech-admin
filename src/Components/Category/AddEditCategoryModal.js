import React, { useState, useEffect } from 'react';
import { addCategory, updateCategory } from '../../services/categoryService';
import { useNavigate } from 'react-router-dom';

const AddEditCategoryModal = ({ onClose, category }) => {
  const [categoryData, setCategoryData] = useState({ name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // If editing, pre-fill the form with the category data
  useEffect(() => {
    if (category) {
      setCategoryData({
        name: category.CategoryName || '', // Set to CategoryName if category exists
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveCategory = async () => {
    if (!categoryData.name || categoryData.name.trim() === '') {
      alert('Category name cannot be empty');
      return; // Prevent update if name is empty
    }
  
    try {
      setLoading(true);
  
      if (category) {
        // If editing, call updateCategory
        await updateCategory(category.CategoryId, categoryData.name );
        alert('Category updated successfully!');
        //navigate(0); 
      } else {
        await addCategory(categoryData);
        alert('Category saved successfully!');
        //navigate(0); 
      }
      onClose(); 
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      alert('Failed to save category. Reason: ' + (error.response?.data?.message || error.message || 'Unknown error.'));
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{category ? 'Edit Category' : 'Add New Category'}</h2>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={categoryData.name}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <div className="modal-actions">
          <button onClick={handleSaveCategory} disabled={loading}>
            {loading ? 'Saving...' : category ? 'Save Changes' : 'Add Category'}
          </button>
          <button onClick={onClose} disabled={loading}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddEditCategoryModal;
