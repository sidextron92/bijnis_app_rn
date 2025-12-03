import { productsApi as mockProductsApi, categoriesApi as mockCategoriesApi } from '@/mocks';

const USE_MOCK = true;

interface GetProductsParams {
  page?: number;
  limit?: number;
  categoryId?: string | null;
  search?: string;
  sortBy?: 'popularity' | 'price_low' | 'price_high' | 'newest';
}

export const productsApi = {
  getProducts: async (params: GetProductsParams) => {
    if (USE_MOCK) {
      const response = await mockProductsApi.getProducts({
        page: params.page,
        limit: params.limit,
        categoryId: params.categoryId || undefined,
        search: params.search,
      });
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },

  getProductById: async (productId: string) => {
    if (USE_MOCK) {
      const response = await mockProductsApi.getProduct(productId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },

  getCategories: async () => {
    if (USE_MOCK) {
      const response = await mockCategoriesApi.getCategories();
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },

  getCategoryById: async (categoryId: string) => {
    if (USE_MOCK) {
      const response = await mockCategoriesApi.getCategory(categoryId);
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },

  searchProducts: async (query: string) => {
    if (USE_MOCK) {
      const response = await mockProductsApi.searchProducts(query);
      if (!response.success) {
        throw new Error(response.error);
      }
      return { data: response.data };
    }
    throw new Error('Real API not implemented');
  },
};
