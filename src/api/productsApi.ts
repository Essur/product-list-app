import axios from 'axios';
import { Product } from '../types';

const BASE_URL = 'http://localhost:3001/products';

export const fetchProducts = () => axios.get<Product[]>(BASE_URL);

export const addProduct = (product: Product) => axios.post<Product>(BASE_URL, product);

export const updateProduct = (id: number, product: Product) =>
  axios.put<Product>(`${BASE_URL}/${id}`, product);

export const deleteProductById = (id: number) =>
  axios.delete(`${BASE_URL}/${id}`);

export const addCommentToProduct = (productId: number, comment: { description: string; date: string }) =>
    axios.post(`${BASE_URL}/${productId}/comments`, comment);

export const deleteCommentFromProduct = (productId: number, commentId: number) =>
    axios.delete(`${BASE_URL}/${productId}/comments/${commentId}`);