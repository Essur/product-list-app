// src/store/productsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    addComment: (state, action: PayloadAction<{ productId: number; comment: Comment }>) => {
      const { productId, comment } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.comments.push(comment);
      }
    },
    deleteComment: (state, action: PayloadAction<{ productId: number; commentId: number }>) => {
      const { productId, commentId } = action.payload;
      const product = state.products.find(p => p.id === productId);
      if (product) {
        product.comments = product.comments.filter(c => c.id !== commentId);
      }
    },
  },
});

export const { addProduct, deleteProduct, setProducts, addComment, deleteComment, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
