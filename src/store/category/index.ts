import { create } from 'zustand';

import { createCategory, deleteCategory, editCategory, getCategories } from '@/services/categories';
import { Category } from '@/utils/schemas/category';

type CategoryState = {
  loading: boolean;
  categories: Category[];
  getCategories: () => Promise<void>;
  createCategory: (category: Category) => Promise<void>;
  editCategory: (category: Category) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  loading: true,
  categories: [],
  getCategories: async () => {
    try {
      set(() => ({ loading: true }));

      const categories = await getCategories();

      set(() => ({ loading: false, categories }));
    } catch (e) {
      set(() => ({ loading: false }));
      throw e;
    }
  },
  createCategory: async (category: Category) => {
    try {
      set(() => ({ loading: true }));

      const newCategory = await createCategory(category);

      set((state) => ({
        loading: false,
        categories: [...state.categories, newCategory]
      }));
    } catch (e) {
      set(() => ({ loading: false }));
      throw e;
    }
  },
  editCategory: async (category: Category) => {
    try {
      set(() => ({ loading: true }));

      const editedCategory = await editCategory(category);

      set((state) => ({
        loading: false,
        categories: [...state.categories.map(c => c.id === editedCategory.id ? editedCategory : c)]
      }));
    } catch (e) {
      set(() => ({ loading: false }));
      throw e;
    }
  },
  deleteCategory: async (categoryId: string) => {
    try {
      set(() => ({ loading: true }));

      await deleteCategory(categoryId);

      set((state) => ({
        loading: false,
        categories: [...state.categories.filter(c => c.id !== categoryId)]
      }));
    } catch (e) {
      set(() => ({ loading: false }));
      throw e;
    }
  },
}));