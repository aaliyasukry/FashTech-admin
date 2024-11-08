import React, { useEffect, useState } from 'react';
import AddVariantModal from './addVariantModal';
import variantService from '../../Services/variantService';

const Variants = () => {
  const [variants, setVariants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchVariants = async () => {
    try {
      const response = await variantService.getVariants(); // Fetch variants
      setVariants(response.data); // Set the state with the data directly
    } catch (error) {
      console.error('Error fetching variants:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVariantAdded = (newVariant) => {
    setVariants([...variants, newVariant]); // Add the new variant to the state
    setIsModalOpen(false); // Close the modal after adding
  };

  useEffect(() => {
    fetchVariants(); // Fetch variants when component mounts
  }, []);

  return (
    <div>
      <h2>Variants</h2>
      <button onClick={handleOpenModal}>Add Variant</button>
      <table className="styled-table"> {/* Same class as Items table */}
        <thead>
          <tr>
            <th>VariantId</th>
            <th>ItemId</th>
            <th>SizeLabel</th>
            <th>ColorName</th>
            <th>ImageUrl</th>
            <th>StockQuantity</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => (
            <tr key={variant.VariantId}>
              <td>{variant.VariantId}</td>
              <td>{variant.ItemId}</td>
              <td>{variant.SizeLabel}</td>
              <td>{variant.ColorName}</td>
              <td>{variant.ImageUrl}</td>
              <td>{variant.StockQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <AddVariantModal onClose={handleCloseModal} onVariantAdded={handleVariantAdded} />
      )}
    </div>
  );
};

export default Variants;
