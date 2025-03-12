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
import { ProductFormValues, productSchema } from "@/schema/productSchema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useProdutos } from "@/hooks/useProdutos";
import { toast } from "sonner";

const page = () => {
  const { cadastroProduto, error } = useProdutos();

  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );
  const [files, setFiles] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [currentSubcategory, setCurrentSubcategory] = useState();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ProductFormValues>({ resolver: zodResolver(productSchema) });

  const handleCategoryChange = (e: any) => {
    const value = e.target.value;
    setCurrentCategory(value);
  };

  const handleSubcategoryChange = (e: any) => {
    setCurrentSubcategory(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0]; 
      const newUrl = URL.createObjectURL(newFile);
      setFiles(newFile);
      setPreviewUrl(newUrl);
      setValue("imagem", e.target.files);
    }
  };

  const handleRemovePhoto = () => {
    setFiles(null);
    setPreviewUrl(null);
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
      queryKey: ["subcategories", Number(currentCategory)],
      queryFn: () => fetchSubcategories(Number(currentCategory)),
      staleTime: 20 * 60 * 1000,
      enabled: !!currentCategory,
    });
  

  async function onSubmit(data: FieldValues) {
    try {
    if (currentSubcategory === undefined) {
      toast.error('Subcategoria não selecionada')
      console.error("Subcategoria não selecionada");
      return;
    }
      await cadastroProduto(data.nome, Number(currentSubcategory), data.imagem);
      toast.success('Produto criado com sucesso!');
      reset({
        nome: "",
      });
    } catch (error) {
      toast.error('Erro ao cadastrar produto')
      console.error("Erro ao cadastrar produto:", error);
    }
  }

  return (
    <div className="w-full flex items-center justify-center lg:px-4 px-1 mt-10">
      <div className="w-full max-w-4xl overflow-hidden">
        <form className="lg:p-6 p-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Produto
                </label>
                <input
                  type="text"
                  id="nome"
                  {...register("nome")}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                />
                <p className="text-xs font-semibold text-red-700 mt-1">
                  <ErrorMessage errors={errors} name="nome" />
                </p>
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
                      <option key={subcategory.id} value={subcategory.id}>
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
                  Imagem do produto
                </label>
                <div className="flex space-x-2">
                  <input
                    type="file"
                    id="fotos"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="mt-1 w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                  <p className="text-xs font-semibold text-red-700 mt-1">
                    <ErrorMessage errors={errors} name="imagem" />
                  </p>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-md p-4 h-64 flex items-center justify-center">
                {previewUrl ? (
                  <div className="relative mb-4">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-[200px] object-cover rounded-md"
                    />
                    <Button
                      variant="destructive"
                      onClick={handleRemovePhoto}
                      className="absolute top-2 right-2 text-xs"
                    >
                      Excluir
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                    <p>Preview da imagem</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3 text-sm font-semibold w-full max-w-sm">
              {error}
            </div>
          )}


          <div className="mt-8 flex justify-end">
            <Button className=" bg-green-600" disabled={isSubmitting}>
              <span>Salvar Produto</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
