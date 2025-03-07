import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  fetchCategories,
  fetchSubcategories,
} from "@/services/produtosService";
import { Category } from "@/models/Categoria";
import { Subcategory } from "@/types/subcategorias";
import { useQuery } from "@tanstack/react-query";

const page = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(undefined);
  const [currentSubcategory, setCurrentSubcategory] = useState();

  const handleImagePreview = (url: string) => {
    setImagePreview(url);
  };

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
    queryKey: ["subcategories", currentCategory],
    queryFn: () => fetchSubcategories(currentCategory || ""),
    staleTime: 20 * 60 * 1000,
    enabled: !!currentCategory,
  });
 
  const handleCategoryChange = (e: any) => {
    const value = e.target.value;
    setCurrentCategory(value);
  };

  const handleSubcategoryChange = (e: any) => {
    setCurrentSubcategory(e.target.value);
  };

  return (
    <div className="container flex items-center justify-center px-4 mt-10">
      <div className="w-full max-w-4xl overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                />
              </div>

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

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL da Imagem
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="URL"
                    onChange={(e) => handleImagePreview(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 h-64 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain rounded-md"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                    <p>Preview da imagem</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <Button className=" bg-green-600">
              <span>Salvar Produto</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
