import {
  SubcategoryFormValues,
  subcategorySchema,
} from "@/schema/productSchema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useProdutos } from "@/hooks/useProdutos";
import { fetchCategories } from "@/services/produtosService";
import { useState } from "react";
import { Category } from "@/models/Categoria";

const NovaCategoria = () => {
  const queryClient = useQueryClient();
  const { error, cadastroSubcategoria } = useProdutos();
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subcategorySchema),
  });

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    staleTime: 20 * 60 * 1000,
  });

  const handleCategoryChange = (e: any) => {
    const value = e.target.value;
    setCurrentCategory(value);
  };

  async function onSubmit(data: FieldValues) {
    console.log("Dados para enviar:", data, "Categoria:", currentCategory);
    try {
      const subcategoria = data.subcategoria.toLowerCase();
      await cadastroSubcategoria(subcategoria, Number(currentCategory));
      queryClient.invalidateQueries({
        queryKey: ["subcategories"],
      });
      toast.success("Subcategoria cadastrada com sucesso!");
      reset({
        subcategoria: "",
      });
    } catch (error) {
      toast.error("Erro ao cadastrar subcategoria");
      console.error("Erro ao cadastrar subcategoria:", error);
    }
  }
  return (
    <div className="container flex items-center justify-center lg:px-4 px-1 mt-10">
      <div className="w-full max-w-4xl overflow-hidden">
        <h1 className="font-main text-2xl font-bold text-gray-800">
          Informe a categoria em que a subcategoria será registrada
        </h1>
        <form className="lg:p-6 p-3" onSubmit={handleSubmit(onSubmit)}>
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
              <option value="">Todas as Categorias</option>
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
              {...register("subcategoria")}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs font-semibold text-red-700 mt-1">
              <ErrorMessage errors={errors} name="subcategoria" />
            </p>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3 text-sm font-semibold w-full max-w-sm">
              {error}
            </div>
          )}
          <div className="mt-8 flex justify-end">
            <Button className=" bg-green-600" disabled={isSubmitting}>
              <span>Criar subcategoria</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovaCategoria;
