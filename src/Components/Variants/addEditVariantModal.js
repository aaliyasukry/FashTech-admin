import React, { useEffect, useState } from 'react';
import { addVariant, updateVariant } from '../../services/variantService';

const AddEditVariantModal = ({ onClose, variant }) => {
    const [variantData, setVariantData] = useState(variant || {
        ItemId: '',
        SizeLabel: '',
        ColorName: '',
        ImageUrl: '',
        StockQuantity: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (variant) {
            setVariantData({
                ItemId: variant.ItemId || '',
                SizeLabel: variant.SizeLabel || '',
                ColorName: variant.ColorName || '',
                ImageUrl: variant.ImageUrl || '',
                StockQuantity: variant.StockQuantity || ''
            })
        }
    }, [variant]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVariantData({
            ...variantData,
            [name]: value
        });
    };

    const pareseNumericFields = (data) => {
        return {
            ...data,
            ItemId: parseInt(data.ItemId, 10) || 0,
            StockQuantity: parseInt(data.StockQuantity, 10) || 0,
        }
    }
    const handleSaveVariant = async () => {
        const parsedVariantData = pareseNumericFields(variantData);
        console.log('Parsed Item Data:', parsedVariantData);

        try {
            setLoading(true);

            if (variant) {
                await updateVariant(variant.VariantId, parsedVariantData);
                alert('Variant Updated Successfully');
            } else {
                await addVariant(variantData);
                alert('variant Added Successfully');
            }
            onClose();
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            alert('Failed to save variant. Reason: ' + (error.response?.data?.message || error.message || 'Unknown error.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{variant ? 'Edit Variant' : 'Add New Variant'}</h2>
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
                    type="text"
                    name="StockQuantity"
                    placeholder="Stock Quantity"
                    value={variantData.StockQuantity}
                    onChange={handleChange}
                    required
                />
                <div className='modal-actions'>
                    <button onClick={handleSaveVariant} disabled={loading}>
                        {loading ? 'Saving...' : variant ? 'Save Changes' : 'Add Variant'}
                    </button>
                    <button onClick={onClose} disabled={loading}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddEditVariantModal;