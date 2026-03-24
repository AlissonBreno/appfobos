import { useMemo } from "react";
import { categoriesMock } from "@/mocks/categories";
import type { MockCategory } from "./types";

export const useMockCategories = () => {
  return useMemo(() => {
    const categories = categoriesMock as MockCategory[];
    const byId = new Map<number, MockCategory>(
      categories.map((category) => [category.id_categories, category])
    );

    const getById = (categoryId: number) => byId.get(categoryId) ?? null;

    return {
      categories,
      byId,
      getById
    };
  }, []);
};
