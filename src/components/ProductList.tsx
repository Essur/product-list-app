// src/components/ProductList.tsx
import { Grid, List } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as productsApi from '../api/productsApi';
import { deleteProduct, setProducts } from '../store/productsSlice';
import { RootState } from '../store/store';
import '../styles/ProductList.css';
import { Product } from '../types';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ProductModal from './ProductModal';

const ProductList: React.FC = () => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [sortOption, setSortOption] = useState<'alphabetical' | 'count' | 'date'>('alphabetical');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === 'alphabetical') {
            return a.name.localeCompare(b.name) || a.count - b.count;
        }
        if (sortOption === 'count') {
            return b.count - a.count || a.name.localeCompare(b.name);
        }
        if (sortOption === 'date') {
            return Number(b.id) - Number(a.id);
        }
        return 0;
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await productsApi.fetchProducts();
                dispatch(setProducts(response.data));
            }
            catch (error) {
                console.error('Failed to fetch products', error);
            }
        };
        fetchProducts();
    }, [dispatch]);

    const handleAddProduct = () => {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleDeleteProductClick = (product: Product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);

    };

    const confirmDelete = async () => {
        if (productToDelete) {
            try {
                await productsApi.deleteProductById(productToDelete.id);
                dispatch(deleteProduct(productToDelete.id));
            } catch (error) {
                console.error('Failed to delete product', error);
            }
        }
        setShowDeleteModal(false);
        setProductToDelete(null);
    };



    return (
        <div className="product-list-container">
            <div className="top-bar">
                <button onClick={handleAddProduct}>Add Product</button>

                <select className='' value={sortOption} onChange={(e) => setSortOption(e.target.value as any)}>
                    <option value="alphabetical">Sort: Alphabetical</option>
                    <option value="count">Sort: By Count</option>
                    <option value="date">Sort: By Date Added</option>
                </select>

                <div className="view-toggle">
                    <button
                        className={viewMode === 'grid' ? 'active' : ''}
                        onClick={() => setViewMode('grid')}
                        title="Grid View"
                    >
                        <Grid size={20} />
                    </button>
                    <button
                        className={viewMode === 'list' ? 'active' : ''}
                        onClick={() => setViewMode('list')}
                        title="List View"
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>

            <div className={`product-list ${viewMode}`}>
                {sortedProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.imageUrl} alt={product.name} />
                            <h3>{product.name}</h3>
                        </Link>
                        <p>Count: {product.count}</p>
                        <p>Size: {product.size.width} x {product.size.height}</p>
                        <p>Weight: {product.weight}</p>
                        <div className="actions">
                            <button className="btn" onClick={() => handleEditProduct(product)}>✏️ Edit</button>
                            <button className="btn" onClick={() => handleDeleteProductClick(product)}>🗑️Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct ?? undefined}
            />

            <ConfirmDeleteModal
                isOpen={showDeleteModal}
                productName={productToDelete?.name}
                onConfirm={confirmDelete}
                onCancel={() => setShowDeleteModal(false)}
            />

        </div>
    );
};

export default ProductList;
