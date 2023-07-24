import React, { useState } from 'react';
import Modal from 'react-modal';
import api from '../../services/api';
import "./AdminProductList.css";

const AdminProductList = ({ onUpdateProduct, onDeleteProduct }) => {

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


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
        fetchProducts();
    };

    const handleEditProduct = () => {
        // Logika untuk mengedit produk
        onUpdateProduct(selectedProduct);
        setIsModalOpen(false);
    };

    const handleDelete = (productId) => {
        onDeleteProduct(productId);
    };

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);



    return (
        <div>
            <div>
                <h2 style={{color:"#fff"}}>Product List</h2>
                <button onClick={fetchProducts}>Refresh Products</button>
                {products.length === 0 ? (
                    <p style={{color:"#fff"}}>No products available.</p>
                ) : (
                    <div className="product-grid">
                        {products.map((product, index) => (
                            <div key={product.id} className={`product-item ${index >= 5 ? 'second-row' : ''}`}>
                                <img src={'https://twluas-backend.vercel.app/img/' + product.image} alt="Product Image" />
                                <div>
                                    <strong>{product.name}</strong> - {product.price}
                                </div>
                                <div>{product.description}</div>
                                <div>Stock: {product.stock}</div>
                                <button onClick={() => handleUpdate(product)}>Update</button>
                                <button onClick={() => handleDelete(product._id)} style={{backgroundColor:"#ff0000"}}>Delete</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Modal isOpen={isModalOpen}>
                <h2>Edit Product</h2>
                {selectedProduct && (
                    <>
                        <label>Nama:</label>
                        <input
                            type="text"
                            value={selectedProduct.name}
                            onChange={(e) =>
                                setSelectedProduct({ ...selectedProduct, name: e.target.value })
                            }
                        />
                        <label>Price:</label>
                        <input
                            type="number"
                            value={selectedProduct.price}
                            onChange={(e) =>
                                setSelectedProduct({ ...selectedProduct, price: e.target.value })
                            }
                        />
                        <label>Description:</label>
                        <input
                            type="text"
                            value={selectedProduct.description}
                            onChange={(e) =>
                                setSelectedProduct({ ...selectedProduct, description: e.target.value })
                            }
                        />
                        <label>Stock:</label>
                        <input
                            type="number"
                            value={selectedProduct.stock}
                            onChange={(e) =>
                                setSelectedProduct({ ...selectedProduct, stock: e.target.value })
                            }
                        />
                        {/* Add other input fields for editing product attributes */}
                        <button onClick={handleEditProduct}>Save</button>
                        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default AdminProductList;
