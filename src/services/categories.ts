import { categoriesMock } from "@/mocks/categories";
import type { Category } from "@/types/category";

const getCategories = (): Category[] => {
  return categoriesMock as Category[];
};

const getCategoriesMap = (): Map<number, Category> => {
  return new Map(getCategories().map((category) => [category.id_categories, category]));
};

const getCategoryById = (categoryId: number): Category | null => {
  return getCategoriesMap().get(categoryId) ?? null;
};

export const categoriesService = {
  getCategories,
  getCategoriesMap,
  getCategoryById
};
