// src/components/ProductModal.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, deleteProduct, updateProduct } from '../store/productsSlice';
import "../styles/Modal.css";
import { Product } from '../types';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product }) => {
  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [weight, setWeight] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCount(product.count);
      setWeight(product.weight);
      setImageUrl(product.imageUrl);
    }
  }, [product]);

  const handleSave = async () => {
    if (!name || !count || !weight || !imageUrl) {
      alert("Fields can`t be empty!")
      return;
    }
    const newProduct: Product = {
      id: product ? product.id : Date.now(),
      name,
      count,
      weight,
      imageUrl,
      size: { width: 100, height: 100 },
      comments: [],
    };
    try {
      if (product) {
        dispatch(updateProduct(newProduct));
      } else {
        dispatch(addProduct(newProduct));
      }
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = () => {
    if (product) {
      dispatch(deleteProduct(product.id));
      onClose();
    };
  }

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{product ? 'Edit Product' : 'Add Product'}</h2>

        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Count</label>
          <input type="number" value={count} onChange={(e) => setCount(Number(e.target.value))} />
        </div>

        <div className="form-group">
          <label>Weight</label>
          <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>

        <div className="modal-actions">
          <button className="btn primary" onClick={handleSave}>
            {product ? 'Save Changes' : 'Add Product'}
          </button>
          {product && (
            <button className="btn danger" onClick={handleDelete}>
              Delete Product
            </button>
          )}
          <button className="btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;