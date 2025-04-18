// src/components/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addComment, deleteComment } from '../store/productsSlice';
import { RootState } from '../store/store';
import "../styles/ProductDetail.css";
import CommentModal from './CommentModal';
import ProductModal from './ProductModal';
import * as productsApi from "../api/productsApi";

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.products);
    const product = products.find((p) => p.id.toString() === id);

    const [showCommentModal, setShowCommentModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!product) {
            navigate('/');
        }
    }, [product, navigate]);

    const handleEditProduct = () => {
        setIsModalOpen(true);
    };

    const handleAddComment = async (comment: { productId: string, description: string, date: string }) => {
        try {
            const addedComment = await productsApi.addCommentToProduct(comment.productId, comment);
            dispatch(addComment({ productId: comment.productId, comment: addedComment }));
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await productsApi.deleteCommentFromProduct(product.id, commentId);
            dispatch(deleteComment({ productId: product.id, commentId }));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.weight}</p>
            <p>Count: {product.count}</p>
            <p>Size: {product.size.width} x {product.size.height}</p>

            <div>
                <button onClick={handleEditProduct}>Edit</button>
            </div>

            <div>
                <h3>Comments</h3>
                {product.comments && product.comments.length > 0 ? (
                    <ul className="comment-list">
                        {product.comments.map((comment) => (
                            <li key={comment.id} className="comment-item">
                                <p>{comment.description}</p>
                                <small>{new Date(comment.date).toLocaleString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</small>
                                <button className="btn" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet.</p>
                )}
                <button onClick={() => setShowCommentModal(true)}>Add Comment</button>
                <Link to={`/`}>Back</Link>
            </div>

            <CommentModal
                isOpen={showCommentModal}
                productId={product.id}
                onAdd={handleAddComment}
                onClose={() => setShowCommentModal(false)}
            />

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={product}
            />
        </div>
    );
};

export default ProductDetail;
