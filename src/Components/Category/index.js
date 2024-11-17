import React, { useEffect, useState } from 'react';
import { getCategories, deleteCategory } from '../../services/categoryService';
import AddEditCategoryModal from './AddEditCategoryModal';
import { FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        if (data && data.success) {
          setCategories(data.data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  // Handle category edit
  const handleEditCategory = (category) => {
    setEditingCategory(category); // Set the category to be edited
    handleOpenModal(); // Open the modal for editing
  };

  const handleDeleteCategory = async (categoryId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (!isConfirmed) return;

    try {
      setLoading(true);
      await deleteCategory(categoryId);
      alert('Category deleted successfully!');
      setCategories((prevCategories) => prevCategories.filter(category => category.CategoryId !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
      alert("Failed to delete category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Categories List</h2>
      <button onClick={handleOpenModal}>Add Category</button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories && Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category) => (
              <tr key={category.CategoryId}>
                <td>{category.CategoryId}</td>
                <td>{category.CategoryName}</td>
                <td>
                  <button onClick={() => handleEditCategory(category)} title="Edit">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteCategory(category.CategoryId)} disabled={loading}>
                    {loading ? 'Deleting...' : 'Delete'}
                    <FaTrash />
                  </button>
                  <button onClick={() => console.log('More actions')} title="More">
                    <FaEllipsisH />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No categories available</td></tr>
          )}
        </tbody>
      </table>

      {/* Modal for adding/editing categories */}
      {isModalOpen && (
        <AddEditCategoryModal
          category={editingCategory} // Pass category to edit, or null for adding new
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Categories;
