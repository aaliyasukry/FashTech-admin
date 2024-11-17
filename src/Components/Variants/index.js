import React, { useEffect, useState } from 'react';
import { getVariants, deleteVariant} from '../../services/variantService';
import { FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa';
import AddEditVariantModal from './addEditVariantModal';

const Variants = () => {
  const [variants, setVariants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const data = await getVariants(); 
        if (data && data.success) {
          setVariants(data.data); 
        } else {
          console.error('Failed to fetch variants');
        }
      } catch (error) {
        console.error('Error fetching variants:', error);
      }
    };
    fetchVariants();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleEditVariant = (variant) => {
    setEditingItem(variant);
    handleOpenModal(); 
  };

  const handleDeleteVariant = async (variantId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this category?");
    if (!isConfirmed) return;

    try {
      setLoading(true);
      await deleteVariant(variantId);
      alert('Variant deleted successfully!');
      setVariants((prevItems) => prevItems.filter(variant => variant.VariantId !== variantId));
    } catch (error) {
      console.error('Error deleting variant:', error);
      alert("Failed to delete variant.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Variants</h2>
      <button onClick={handleOpenModal}>Add Variant</button>

      <table className="styled-table">
        <thead>
          <tr>
            <th>VariantId</th>
            <th>ItemId</th>
            <th>SizeLabel</th>
            <th>ColorName</th>
            <th>Image</th>
            <th>StockQuantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {variants && Array.isArray(variants) && variants.length > 0 ? (
            variants.map((variant) => (
              <tr key={variant.VariantId}>
                <td>{variant.VariantId}</td>
                <td>{variant.ItemId}</td>
                <td>{variant.SizeLabel}</td>
                <td>{variant.ColorName}</td>
                <td>{variant.ImageUrl ? (
                      <img 
                        src={variant.ImageUrl} 
                        alt={`Variant ${variant.VariantId}`} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                      />
                    ) : (
                      'No Image'
                    )}
                </td>
                <td>{variant.StockQuantity}</td>
                <td>
                  <button onClick={() => handleEditVariant(variant)} title="Edit">
                    <FaEdit /> 
                  </button>
                  <button onClick={() => handleDeleteVariant(variant.VariantId)} title="Delete">
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
              <td colSpan="8">No variants available</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <AddEditVariantModal
          variant ={editingItem}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Variants;
