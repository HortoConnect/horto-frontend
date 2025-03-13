import {
  fetchCategories,
  fetchSubcategories,
  listaFornecedoresService,
  listaProductsService,
  listaQualidadesService,
  listaTamanhosService,
} from "@/services/produtosService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProdByFornecedorFormValues,
  prodByFornecedorSchema,
} from "@/schema/productSchema";
import { useProdutos } from "@/hooks/useProdutos";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Category } from "@/models/Categoria";
import { Subcategory } from "@/types/subcategorias";
import { toast } from "sonner";

const ProdFornecedores = () => {
  const { ProdutoByFornecedor } = useProdutos();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<ProdByFornecedorFormValues>({
    resolver: zodResolver(prodByFornecedorSchema),
  });

  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );

  const [currentProductId, setCurrentProductId] = useState<string | undefined>(
    undefined
  );

  const [currentSubcategory, setCurrentSubcategory] = useState();

  const [currentQualidade, setCurrentQualidade] = useState<string | undefined>(
    undefined
  );
  const [currentSize, setCurrentSize] = useState<string | undefined>(undefined);

  const [currentFornecedor, setCurrentFornecedor] = useState<
    string | undefined
  >(undefined);

  const handleProductChange = (e: any) => {
    const value = e.target.value;
    setCurrentProductId(value);
  };

  const handleQualidadeChange = (e: any) => {
    const value = e.target.value;
    setCurrentQualidade(value);
  };

  const handleSizeChange = (e: any) => {
    const value = e.target.value;
    setCurrentSize(value);
  };

  const handleFornecedorChange = (e: any) => {
    const value = e.target.value;
    setCurrentFornecedor(value);
  };

  const handleCategoryChange = (e: any) => {
    const value = e.target.value;
    setCurrentCategory(value);
  };

  const handleSubcategoryChange = (e: any) => {
    setCurrentSubcategory(e.target.value);
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

// Buscar subcategoria 
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

  // Busca qualidades
  const {
    data: qualidades = [],
    isLoading: qualidadesLoading,
    error: qualidadesError,
  } = useQuery({
    queryKey: ["qualidades"],
    queryFn: () => listaQualidadesService(),
    staleTime: 20 * 60 * 1000,
  });

  // Busca tamanhos
  const {
    data: sizes = [],
    isLoading: sizesLoading,
    error: sizesError,
  } = useQuery({
    queryKey: ["sizes"],
    queryFn: () => listaTamanhosService(),
    staleTime: 20 * 60 * 1000,
  });

  // Busca fornecedores
  const {
    data: fornecedores = [],
    isLoading: fornecedoresLoading,
    error: fornecedoresError,
  } = useQuery({
    queryKey: ["fornecedores"],
    queryFn: () => listaFornecedoresService(),
    staleTime: 20 * 60 * 1000,
  });

  // Busca produtos
  const {
    data: products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products", currentSubcategory],
    queryFn: () => listaProductsService(Number(currentSubcategory)),
    staleTime: 20 * 60 * 1000,
  });

  async function onSubmit(data: FieldValues) {
    const quality_id = Number(currentQualidade);
    const size_id = Number(currentSize);
    const supplier_id = Number(currentFornecedor);
    const product_id = Number(currentProductId);
    try {
        await ProdutoByFornecedor(Number(data.preco), quality_id, size_id, product_id, supplier_id);
        toast.success('Conexão feita com sucesso!');
        reset({
          preco: "",
        });
      } catch (error) {
        console.error("Erro ao fazer conexão com o fornecedor. Tente novamente. ", error);
      }
  }

  return (
    <div className="w-full flex items-center justify-center lg:px-4 px-1 mt-10">
      <div className="w-full max-w-4xl overflow-hidden">
        <h1 className="font-main text-2xl font-bold text-gray-800">
          Informe qual fornecedor pertence ao produto:
        </h1>
        <form className="lg:p-6 p-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3 mb-5">
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
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Produto
            </label>
            <select
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={currentProductId}
              onChange={handleProductChange}
              disabled={!currentSubcategory || productsLoading}
              >
              <option value="">Selecione o Produto</option>
              {!productsLoading &&
                !productsError &&
                products.map((product: any) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
            </select>
            {qualidadesError && (
              <p className="text-red-500 text-sm mt-1">
                Erro ao carregar qualidades
              </p>
            )}
          </div>
          <Separator
            orientation="horizontal"
            className="my-4 h-[1px] bg-green-500"
          />
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fornecedor
            </label>
            <select
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={currentFornecedor}
              onChange={handleFornecedorChange}
              disabled={fornecedoresLoading}
            >
              <option value="">Selecione um fornecedor</option>
              {!fornecedoresLoading &&
                !fornecedoresError &&
                fornecedores.map((fornecedor: any) => (
                  <option key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.name} | {fornecedor.cnpj}
                  </option>
                ))}
            </select>
            {qualidadesError && (
              <p className="text-red-500 text-sm mt-1">
                Erro ao carregar tamanhos
              </p>
            )}
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do produto para esse fornecedor
            </label>
            <input
              type="number"
              id="preco"
              {...register("preco")}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
            />
            <p className="text-xs font-semibold text-red-700 mt-1">
              <ErrorMessage errors={errors} name="preco" />
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualidade
              </label>
              <select
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={currentQualidade}
                onChange={handleQualidadeChange}
                disabled={qualidadesLoading}
              >
                <option value="">Selecione uma qualidades</option>
                {!qualidadesLoading &&
                  !qualidadesError &&
                  qualidades.map((qualidade: any) => (
                    <option key={qualidade.id} value={qualidade.id}>
                      {qualidade.name}
                    </option>
                  ))}
              </select>
              {qualidadesError && (
                <p className="text-red-500 text-sm mt-1">
                  Erro ao carregar qualidades
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tamanho
              </label>
              <select
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={currentSize}
                onChange={handleSizeChange}
                disabled={sizesLoading}
              >
                <option value="">Selecione um tamanhos</option>
                {!sizesLoading &&
                  !sizesError &&
                  sizes.map((size: any) => (
                    <option key={size.id} value={size.id}>
                      {size.name}
                    </option>
                  ))}
              </select>
              {qualidadesError && (
                <p className="text-red-500 text-sm mt-1">
                  Erro ao carregar tamanhos
                </p>
              )}
            </div>
          </div>
          <div className="mt-8 flex justify-end items-">
            <Button className="bg-green-600" disabled={isSubmitting}>
              Criar conexão
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProdFornecedores;
