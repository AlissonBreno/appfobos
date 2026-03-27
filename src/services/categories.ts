import { collection, getDocs } from "firebase/firestore";
import type { Category } from "@/types/category";
import { db } from "./firebase";

const CATEGORIES_COLLECTION = "categories";

const mapDocumentToCategory = (
  docId: string,
  raw: Record<string, unknown>
): Category => {
  const idCategoriesRaw = raw.id_categories;
  let id_categories: number;
  if (typeof idCategoriesRaw === "number" && Number.isFinite(idCategoriesRaw)) {
    id_categories = idCategoriesRaw;
  } else if (typeof idCategoriesRaw === "string") {
    const parsed = Number(idCategoriesRaw);
    id_categories = Number.isFinite(parsed) ? parsed : NaN;
  } else {
    id_categories = NaN;
  }
  if (!Number.isFinite(id_categories)) {
    const fromDocId = Number(docId);
    id_categories = Number.isFinite(fromDocId) ? fromDocId : 0;
  }

  const name = typeof raw.name === "string" ? raw.name : "";
  const color = typeof raw.color === "string" ? raw.color : "";
  const icon = typeof raw.icon === "string" ? raw.icon : "";

  return {
    id_categories,
    name,
    color,
    icon
  };
};

const fetchCategoriesFromFirestore = async (): Promise<Category[]> => {
  const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
  const categories = snapshot.docs.map((doc) =>
    mapDocumentToCategory(doc.id, doc.data() as Record<string, unknown>)
  );
  categories.sort((a, b) => a.id_categories - b.id_categories);
  return categories;
};

const getCategories = async (): Promise<Category[]> =>
  fetchCategoriesFromFirestore();

const getCategoriesMap = async (): Promise<Map<number, Category>> => {
  const list = await getCategories();
  return new Map(list.map((c) => [c.id_categories, c]));
};

const getCategoryById = async (
  categoryId: number
): Promise<Category | null> => {
  const map = await getCategoriesMap();
  return map.get(categoryId) ?? null;
};

export const categoriesService = {
  getCategories,
  getCategoriesMap,
  getCategoryById
};
