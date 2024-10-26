import React, { useState } from 'react';
import variantService from '../../services/variantService';

const AddVariantModal = ({ onClose, onVariantAdded }) => {
    const [variantData, setVariantData] = useState({
        ItemId: '',
        SizeLabel: '',
        ColorName: '',
        ImageUrl: '',
        StockQuantity: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVariantData({
            ...variantData,
            [name]: value
        });
    };

    const handleAddVariant = async () => {
        try {
            const response = await variantService.addVariant(variantData);
            if (response.success) {
                // Combine new variant data with the returned variant ID
                const newVariant = {
                    ...variantData,
                    VariantId: response.variantId.VariantId // Extract VariantId from response
                };
                onVariantAdded(newVariant); // Pass the new variant back to the parent
                alert('Variant added successfully!');
            } else {
                alert('Failed to add variant. Please try again.');
            }
        } catch (error) {
            console.error('Error adding variant:', error);
            alert('Failed to add variant. Please try again.');
        }
    };

    return (
        <div className="modal">
            <h2>Add New Variant</h2>
            <input
                type="text"
                name="ItemId"
                placeholder="Item ID"
                value={variantData.ItemId}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="SizeLabel"
                placeholder="Size Label"
                value={variantData.SizeLabel}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="ColorName"
                placeholder="Color Name"
                value={variantData.ColorName}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="ImageUrl"
                placeholder="Image URL"
                value={variantData.ImageUrl}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="StockQuantity"
                placeholder="Stock Quantity"
                value={variantData.StockQuantity}
                onChange={handleChange}
                required
            />
            <button onClick={handleAddVariant}>Add Variant</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
};

export default AddVariantModal;
