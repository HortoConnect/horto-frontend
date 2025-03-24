import { Category } from "../models/Categoria";

export interface Quality {
  id: number;
  name: string;
}

export interface Size {
  id: number;
  name: string;
}
export interface Subcategory {
  id: number;
  name: string;
  category: Category;
  qualities: Quality[];
  sizes: Size[];
}
