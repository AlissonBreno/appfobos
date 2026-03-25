import { useCallback, useEffect, useMemo, useState } from "react";
import { categoriesService } from "@/services";
import type { Category } from "../../types/category";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const list = await categoriesService.getCategories();
        if (!cancelled) {
          setCategories(list);
        }
      } catch (e) {
        if (!cancelled) {
          setCategories([]);
          setError(
            e instanceof Error ? e : new Error("Failed to load categories")
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const byId = useMemo(
    () =>
      new Map(
        categories.map((category) => [category.id_categories, category])
      ),
    [categories]
  );

  const getById = useCallback(
    (categoryId: number) => byId.get(categoryId) ?? null,
    [byId]
  );

  return {
    data: {
      categories,
      byId,
      getById
    },
    loading,
    error
  };
};
