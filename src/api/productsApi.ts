import axios from 'axios';
import { Product } from '../types';

const BASE_URL = 'http://localhost:3001/products';

export const fetchProducts = () => axios.get<Product[]>(BASE_URL);

export const addProduct = (product: Omit<Product, 'id'>) =>
  axios.post<Product>(BASE_URL, product);

export const updateProduct = (id: string, product: Product) =>
  axios.put<Product>(`${BASE_URL}/${id}`, product);

export const deleteProductById = (id: string) =>
  axios.delete(`${BASE_URL}/${id}`);

export const addCommentToProduct = (productId: string, newComment: { productId: string, description: string, date: string }) =>
  axios.post(`${BASE_URL}/${productId}/comments`, newComment);

export const deleteCommentFromProduct = (productId: string, commentId: string) =>
  axios.delete(`${BASE_URL}/${productId}/comments/${commentId}`);