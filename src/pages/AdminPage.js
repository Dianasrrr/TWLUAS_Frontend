import React, { useState, useEffect } from 'react';
import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navigation/navbar';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (newProduct) => {
        try {
            const response = await api.post('/products', newProduct);
            setProducts([...products, response.data]);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdateProduct = async (product) => {
        console.log(product);
        try {
            const response = await api.put(`/products/${product._id}`, product);
            const updatedProducts = products.map((product) =>
                product.id === product.id ? response.data : product
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteProduct = async (productId) => {
        console.log(productId);
        try {
            await api.delete(`/products/${productId}`);
            const updatedProducts = products.filter((product) => product.id !== productId);
            setProducts(updatedProducts);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        // Remove the token from local storage
        localStorage.removeItem('token');

        // Navigate back to the login page
        navigate('/login');
    };

    return (
        <div className="container">
            <Navbar />
            <h1>Admin Page</h1>
            <div className="admin-form">
                <AdminProductForm onAddProduct={handleAddProduct} />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="admin-list">
                    <AdminProductList
                        products={products}
                        onUpdateProduct={handleUpdateProduct}
                        onDeleteProduct={handleDeleteProduct}
                    />
                </div>
            )}
        </div>
    );
};

export default AdminPage;
