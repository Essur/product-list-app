import { Route, Routes } from 'react-router-dom';
import './App.css';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App
