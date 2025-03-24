import { Subcategory } from "../types/subcategorias";
import { Pictures } from "./Pictures";

export interface Product {
  id: number;
  name: string;
  subcategory: Subcategory;
  pictures: Pictures[];
}