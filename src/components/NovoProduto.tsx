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
import {
  ProductFormValues,
  productSchema,
  QualityFormValues,
  qualitySchema,
  SizeFormValues,
  sizeSchema,
} from "@/schema/productSchema";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { useProdutos } from "@/hooks/useProdutos";
import { toast } from "sonner";
import { CreateCategoryModal } from "../components/CreateCategory";
import { CreateSubcategoryModal } from "../components/CreateSubcategory";
import { Separator } from "./ui/separator";

const page = () => {
  const { cadastroProduto, cadastroTamanho, cadastroQualidade, error } =
    useProdutos();
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();
  const [currentSubcategory, setCurrentSubcategory] = useState();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<ProductFormValues>({ resolver: zodResolver(productSchema) });

  // Formulário de Tamanho
  const {
    register: registerSize,
    handleSubmit: handleSubmitSize,
    reset: resetSize,
    formState: { isSubmitting: isSubmittingSize, errors: errorsSize },
  } = useForm<SizeFormValues>({ resolver: zodResolver(sizeSchema) });

  // Formulário de Qualidade
  const {
    register: registerQuality,
    handleSubmit: handleSubmitQuality,
    reset: resetQuality,
    formState: { isSubmitting: isSubmittingQuality, errors: errorsQuality },
  } = useForm<QualityFormValues>({ resolver: zodResolver(qualitySchema) });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrentCategory(value);
    setCurrentSubcategory(undefined);
  };

  const handleSubcategoryChange = (e: any) => {
    setCurrentSubcategory(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const newUrl = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(newUrl);
      setValue("imagem", e.target.files);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl(null);
  };

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
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

  async function onProductSubmit(data: FieldValues) {
    try {
      if (!currentSubcategory) {
        toast.error("Selecione uma subcategoria");
        return;
      }
      await cadastroProduto(data.nome, Number(currentSubcategory), data.imagem);
      toast.success("Produto criado com sucesso!");
      reset({ nome: "" });
      setPreviewUrl(null);
    } catch (error) {
      toast.error("Erro ao cadastrar produto");
    }
  }

  const onSubmitSize = async (data: FieldValues) => {
    try {
      const name = data.tamanho.toLowerCase();
      await cadastroTamanho(name);
      toast.success("Tamanho cadastrado com sucesso!");
      resetSize({ tamanho: "" });
    } catch (error) {
      toast.error("Erro ao cadastrar tamanho");
      console.error("Erro ao cadastrar tamanho:", error);
    }
  };

  const onSubmitQuality = async (data: FieldValues) => {
    try {
      const name = data.qualidade.toLowerCase();
      await cadastroQualidade(name);
      toast.success("Qualidade cadastrada com sucesso!");
      resetQuality({ qualidade: "" });
    } catch (error) {
      toast.error("Erro ao cadastrar qualidade");
      console.error("Erro ao cadastrar qualidade:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center lg:px-4 px-1 mt-10">
      <div className="w-full max-w-4xl overflow-hidden">
        <form className="lg:p-6 p-3" onSubmit={handleSubmit(onProductSubmit)}>
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
                <div className="flex gap-2">
                  <select
                    className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={currentCategory}
                    onChange={handleCategoryChange}
                    disabled={categoriesLoading}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category: Category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <CreateCategoryModal />
                </div>
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
                <div className="flex gap-2">
                  <select
                    className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={currentSubcategory}
                    onChange={handleSubcategoryChange}
                    disabled={!currentCategory || subcategoriesLoading}
                  >
                    <option value="">Selecione uma subcategoria</option>
                    {subcategories.map((subcategory: Subcategory) => (
                      <option key={subcategory.id} value={subcategory.id}>
                        {subcategory.name}
                      </option>
                    ))}
                  </select>
                  <CreateSubcategoryModal currentCategoryId={currentCategory} />
                </div>
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
            <Button className="bg-green-600" disabled={isSubmitting}>
              <span>Salvar Produto</span>
            </Button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-4xl">
        {/* Criar tamanho e qualidade */}
        <Separator orientation="horizontal" className="my-4" />
        {/* Tamanhos */}
        <h1 className="font-main text-2xl font-bold text-gray-800 mt-6">
          Crie novos tamanhos
        </h1>
        <form className="lg:p-6 p-3" onSubmit={handleSubmitSize(onSubmitSize)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamanho
            </label>
            <input
              type="text"
              id="size"
              {...registerSize("tamanho")}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs font-semibold text-red-700 mt-1">
              <ErrorMessage errors={errorsSize} name="tamanho" />
            </p>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3 text-sm font-semibold w-full max-w-sm">
              {error}
            </div>
          )}
          <div className="mt-8 flex justify-end items-">
            <Button className="bg-green-600" disabled={isSubmittingSize}>
              Criar tamanho
            </Button>
          </div>
        </form>

        <Separator orientation="horizontal" className="my-4" />
        {/* Cadastro qualidades */}
        <h1 className="font-main text-2xl font-bold text-gray-800 mt-6">
          Crie novas qualidades
        </h1>
        <form
          className="lg:p-6 p-3"
          onSubmit={handleSubmitQuality(onSubmitQuality)}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualidade
            </label>
            <input
              type="text"
              id="qualidade"
              {...registerQuality("qualidade")}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs font-semibold text-red-700 mt-1">
              <ErrorMessage errors={errorsQuality} name="qualidade" />
            </p>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-3 text-sm font-semibold w-full max-w-sm">
              {error}
            </div>
          )}
          <div className="mt-8 flex justify-end items-">
            <Button className="bg-green-600" disabled={isSubmittingQuality}>
              Criar qualidade
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
