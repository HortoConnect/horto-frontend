import { useEffect, useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchCategories,
  fetchSubcategories,
} from "../services/produtosService";
import type { Category } from "@/models/Categoria";
import type { Subcategory } from "@/types/subcategorias";

const SearchFilter = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentCategory, setCurrentCategory] = useState(
    searchParams.get("category") || ""
  );
  const [currentSubcategory, setCurrentSubcategory] = useState(
    searchParams.get("subcategory") || ""
  );

  // Buscar categorias
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 20 * 60 * 1000,
  });

  const {
    data: subcategories = [],
    isLoading: subcategoriesLoading,
    error: subcategoriesError,
  } = useQuery({
    queryKey: ["subcategories", Number(currentCategory)],
    queryFn: () => fetchSubcategories(Number(currentCategory)),
    staleTime: 20 * 60 * 1000,
    enabled: !!currentCategory,
  });

  const handleCategoryChange = (e: any) => {
    const value = e.target.value;
    setCurrentCategory(value);
    if (value !== currentCategory) {
      setCurrentSubcategory("");
    }
  };

  const handleSubcategoryChange = (e: any) => {
    setCurrentSubcategory(e.target.value);
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams();

    if (currentCategory) newSearchParams.set("category", currentCategory);
    if (currentSubcategory)
      newSearchParams.set("subcategory", currentSubcategory);

    setSearchParams(newSearchParams);
  }, [currentCategory, currentSubcategory, setSearchParams]);

  const handleClearFilters = () => {
    setCurrentCategory("");
    setCurrentSubcategory("");

    const newSearchParams = new URLSearchParams();
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex flex-col w-full relative">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700 transition-colors duration-200 self-start mb-2"
        >
          <Filter />
          <span className="font-main">Filtros</span>
          <ChevronDown
            className={`h-5 w-5 transform transition-transform duration-200 ${
              showFilters ? "rotate-180" : ""
            }`}
          />
        </button>
        {currentCategory && (
          <button
            onClick={handleClearFilters}
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-700 text-white rounded-md shadow-md hover:bg-red-600 transition-colors duration-200 self-start mb-2"
          >
            <span className="font-main">Limpar filtro</span>
          </button>
        )}
      </div>

      {showFilters && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:p-6 py-6 px-2 bg-white rounded-xl shadow-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={currentCategory}
              onChange={handleCategoryChange}
              disabled={categoriesLoading}
            >
              <option value="">Todas as Categorias</option>
              {!categoriesLoading &&
                !categoriesError &&
                categories.map((category: Category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </select>
            {categoriesError && (
              <p className="text-red-500 text-sm mt-1">
                Erro ao carregar categorias
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subcategoria
            </label>
            <select
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={currentSubcategory}
              onChange={handleSubcategoryChange}
              disabled={!currentCategory || subcategoriesLoading}
            >
              <option value="">Todas as Subcategorias</option>
              {!subcategoriesLoading &&
                !subcategoriesError &&
                subcategories.map((subcategory: Subcategory) => (
                  <option key={subcategory.id} value={subcategory.name}>
                    {subcategory.name}
                  </option>
                ))}
            </select>
            {subcategoriesError && (
              <p className="text-red-500 text-sm mt-1">
                Erro ao carregar subcategorias
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
