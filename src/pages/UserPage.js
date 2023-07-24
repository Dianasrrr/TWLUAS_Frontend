import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import './UserPage.css';
import Navbar from '../components/navigation/navbar';

const UserPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [quantities, setQuantities] = useState({});
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

    const handleBuyProduct = async (productId) => {
        try {
            const quantity = quantities[productId] || 1;
            await api.post(`/products/${productId}/buy`, { quantity });
            const updatedProducts = products.map((product) =>
                product._id === productId ? { ...product, stock: product.stock - quantity } : product
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuantityChange = (productId, value) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: value
        }));
    };


    return (
        <div className="container">
            <Navbar />
            <h1>User Page</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2 style={{color:"#000"}}>Product List</h2>
                    {products.length === 0 ? (
                        <p>No products available.</p>
                    ) : (
                        <ul className="product-list">
                            {products.map((product) => (
                                <li key={product._id} style={{backgroundColor:"rgb(117 140 137)"}}>
                                    <div>
                                        <img src={'http://localhost:3001/img/' + product.image} alt="Product Image" />
                                    </div>
                                    <div>
                                        <strong>{product.name}</strong> - {product.price}
                                    </div>
                                    <div>{product.description}</div>
                                    <div>Stock: {product.stock}</div>
                                    <input
                                        id='quantity'
                                        type="number"
                                        min="1"
                                        value={quantities[product._id] || ''}
                                        onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                                    />
                                    <button onClick={() => handleBuyProduct(product._id)}>Buy</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserPage;
