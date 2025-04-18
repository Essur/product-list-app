// src/components/CommentModal.tsx
import React, { useState } from 'react';
import "../styles/Modal.css";

interface CommentModalProps {
    isOpen: boolean;
    productId: string;
    onAdd: (comment: { productId: string, description: string, date: string}) => void;
    onClose: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, productId, onAdd, onClose }) => {
    const [description, setDescription] = useState('');

    const handleAdd = () => {
        if (!description.trim()) return;
        onAdd({
            productId,
            description,
            date: new Date().toLocaleString(),
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className='form-group'>
                    <h3>Add Comment</h3>
                    <textarea className='text-area'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter comment"
                    />
                </div>
                <div className="modal-actions">
                    <button className='btn primary' onClick={handleAdd}>Add</button>
                    <button className='btn' onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default CommentModal;
