// Components
export { ProductDetail } from './components/ProductDetail';

// Store
export {
  default as productsReducer,
  fetchProducts,
  fetchProductById,
  fetchCategories,
  setFilters,
  resetFilters,
  selectProducts,
  selectCategories,
  selectSelectedProduct,
  selectProductsLoading,
  selectProductsFilters,
} from './store/productsSlice';

// Services
export { productsApi } from './services/productsApi';
