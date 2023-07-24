import React, { useState } from 'react';
import axios from 'axios';
import api from '../../services/api';
import "./AdminProductForm.css";

const AdminProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    stock: '',
    image: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    setProduct({ ...product, image: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Assuming you have the product state initialized in your component
      const formData = new FormData();
      formData.append('image', product.image);
      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('description', product.description);
      formData.append('stock', product.stock);

      console.log(formData);
  
      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // Assuming the response contains the newly created product
      const newProduct = response.data;
  
      // Call the callback function passed from the parent component
      onAddProduct(newProduct);
  
      // Reset the form fields
      setProduct({
        name: '',
        price: '',
        description: '',
        stock: '',
        image: null, // Reset image to null (assuming the initial value for image is null)
      });
    } catch (error) {
      console.log(error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2 style={{color:"#000"}}>Add Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea name="description" value={product.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" name="image" onChange={handleFileChange} />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AdminProductForm;
