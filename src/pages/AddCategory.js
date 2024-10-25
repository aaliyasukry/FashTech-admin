import React, { useState } from "react";
import categoryService from '../services/categoryService';

const AddCategory = () => {
    const [categoryData, setCategoryData] = useState({
        name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoryData({
            ...categoryData,
            [name]: value
        });
    };
    
    const handleAddCategory = async () => {
        try {
            const result = await categoryService.addCategory(categoryData);
            alert('Category added successfully!');
            console.log(result);
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Failed to add category. Please try again.');
        }
    };

    return (
        <div>
            <h2>Add New Item</h2>
            <input
                type="text"
                name="name"
                placeholder="Category Name"
                value={categoryData.name}
                onChange={handleChange}
                required
            />
            <button onClick={handleAddCategory}>Add Category</button>
        </div>
    );
}

export default AddCategory;
