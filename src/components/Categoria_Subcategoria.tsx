import { CategoryFormValues, categorySchema } from "@/schema/productSchema";
import {
  SubcategoryFormValues,
  subcategorySchema,
} from "@/schema/productSchema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useProdutos } from "@/hooks/useProdutos";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { fetchCategories } from "@/services/produtosService";
import { useState } from "react";
import { Category } from "@/models/Categoria";

const Categoria_Subgategoria = () => {
  const queryClient = useQueryClient();
  const { error, cadastroCategoria, cadastroSubcategoria } = useProdutos();
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );

  // Formulário de Categoria
  const {
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    reset: resetCategory,
    formState: { isSubmitting: isSubmittingCategory, errors: errorsCategory },
  } = useForm<CategoryFormValues>({ resolver: zodResolver(categorySchema) });

  // Formulário de Subcategoria
  const {
    register: registerSubcategory,
    handleSubmit: handleSubmitSubcategory,
    reset: resetSubcategory,
    formState: {
      isSubmitting: isSubmittingSubcategory,
      errors: errorsSubcategory,
    },
  } = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subcategorySchema),
  });

  // Query para categorias
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 20 * 60 * 1000,
  });

  // Handlers
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentCategory(e.target.value);
  };

  // Submit Categoria
  const onSubmitCategory = async (data: FieldValues) => {
    try {
      const categoria = data.categoria.toLowerCase();
      await cadastroCategoria(categoria);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria cadastrada com sucesso!");
      resetCategory({ categoria: "" });
    } catch (error) {
      toast.error("Erro ao cadastrar categoria");
      console.error("Erro ao cadastrar categoria:", error);
    }
  };

  // Submit Subcategoria
  const onSubmitSubcategory = async (data: FieldValues) => {
    try {
      const subcategoria = data.subcategoria.toLowerCase();
      await cadastroSubcategoria(subcategoria, Number(currentCategory));
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      toast.success("Subcategoria cadastrada com sucesso!");
      resetSubcategory({ subcategoria: "" });
    } catch (error) {
      toast.error("Erro ao cadastrar subcategoria");
      console.error("Erro ao cadastrar subcategoria:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-center lg:px-4 px-1 mt-10">
      <div className="w-full max-w-4xl overflow-hidden">
        {/* Formulário de Categoria */}
        <h1 className="font-main text-2xl font-bold text-gray-800">
          Informe o nome da categoria que deseja criar:
        </h1>
        <form
          className="lg:p-6 p-3"
          onSubmit={handleSubmitCategory(onSubmitCategory)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Categoria
            </label>
            <input
              type="text"
              id="categoria"
              {...registerCategory("categoria")}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs font-semibold text-red-700 mt-1">
              <ErrorMessage errors={errorsCategory} name="categoria" />
            </p>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3 text-sm font-semibold w-full max-w-sm">
              {error}
            </div>
          )}
          <div className="mt-8 flex justify-end">
            <Button className="bg-green-600" disabled={isSubmittingCategory}>
              Criar categoria
            </Button>
          </div>
        </form>

        <Separator orientation="horizontal" className="my-4" />

        {/* Formulário de Subcategoria */}
        <h1 className="font-main text-2xl font-bold text-gray-800 mt-6">
          Informe a categoria em que a subcategoria será registrada
        </h1>
        <form
          className="lg:p-6 p-3"
          onSubmit={handleSubmitSubcategory(onSubmitSubcategory)}
        >
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={currentCategory}
              onChange={handleCategoryChange}
              disabled={categoriesLoading}
            >
              <option value="">Selecione uma categoria</option>
              {!categoriesLoading &&
                !categoriesError &&
                categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
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
              Nome da Subcategoria
            </label>
            <input
              type="text"
              id="subcategoria"
              {...registerSubcategory("subcategoria")}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs font-semibold text-red-700 mt-1">
              <ErrorMessage errors={errorsSubcategory} name="subcategoria" />
            </p>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3 text-sm font-semibold w-full max-w-sm">
              {error}
            </div>
          )}
          <div className="mt-8 flex justify-end">
            <Button className="bg-green-600" disabled={isSubmittingSubcategory}>
              Criar subcategoria
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Categoria_Subgategoria;
