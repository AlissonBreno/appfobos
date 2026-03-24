import { useMemo } from "react";
import { categoriesService } from "@/services";
import type { Category } from "../../types/category";

export const useCategories = () => {
  return useMemo(() => {
    try {
      const categories = categoriesService.getCategories() as Category[];
      const byId = categoriesService.getCategoriesMap();
      const getById = (categoryId: number) => byId.get(categoryId) ?? null;

      return {
        data: {
          categories,
          byId,
          getById
        },
        loading: false,
        error: null as Error | null
      };
    } catch (error) {
      const byId = new Map<number, Category>();
      const getById = () => null;

      return {
        data: {
          categories: [] as Category[],
          byId,
          getById
        },
        loading: false,
        error: error instanceof Error ? error : new Error("Failed to load categories")
      };
    }
  }, []);
};
