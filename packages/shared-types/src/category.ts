/**
 * Category entity types
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  parentId?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithChildren extends Category {
  children: Category[];
}

export interface CategoryTree extends Category {
  children: CategoryTree[];
  productCount?: number;
}

export interface CategoryListResponse {
  categories: Category[];
  total: number;
}
