import { Product } from "@/models/Product";
import {
  listaFornecedoresProdutoService,
  listaQualidadesService,
  listaTamanhosService,
} from "@/services/produtosService";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle, Package, Scale } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

const DetailsProduct = ({ produto }: { produto: Product }) => {
  const hero = produto.pictures?.[0]?.url || "/imagem-padrao.jpg";

  const [currentQualidade, setCurrentQualidade] = useState<string | undefined>(
    undefined
  );
  const [currentSize, setCurrentSize] = useState<string | undefined>(undefined);

  const handleQualidadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrentQualidade(value);
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrentSize(value);
  };

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
    queryKey: ["fornecedoresProduct", produto.id],
    queryFn: () => listaFornecedoresProdutoService(produto.id),
    staleTime: 20 * 60 * 1000,
  });

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-[400px]">
            <img
              src={hero}
              alt={produto.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Coluna de Detalhes */}
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              {/* Seletor de Qualidade */}
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
                  <option value="">Selecione uma qualidade</option>
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

              {/* Seletor de Tamanho */}
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
                  <option value="">Selecione um tamanho</option>
                  {!sizesLoading &&
                    !sizesError &&
                    sizes.map((size: any) => (
                      <option key={size.id} value={size.id}>
                        {size.name}
                      </option>
                    ))}
                </select>
                {sizesError && (
                  <p className="text-red-500 text-sm mt-1">
                    Erro ao carregar tamanhos
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Fornecedores */}
      </div>
      <div className="mt-12 md:p-8 p-3">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Fornecedores Disponíveis
        </h2>
        <div className="space-y-4">
          {fornecedoresLoading ? (
            <>
              <Skeleton className="w-full md:h-[110px] h-[150px]" />
              <Skeleton className="w-full md:h-[110px] h-[150px]" />
              <Skeleton className="w-full md:h-[110px] h-[150px]" />
              <Skeleton className="w-full md:h-[110px] h-[150px]" />
            </>
          ) : (
            <>
              {fornecedores.length > 0 ? (
                <>
                  {fornecedores.map((fornecedor: any) => (
                    <div
                      key={fornecedor.id}
                      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        {/* Informações do Fornecedor */}
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-xl font-semibold text-gray-800">
                              {fornecedor.supplier.name}
                            </h3>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Package className="h-4 w-4" />
                              <span>Qualidade: {fornecedor.quality.name}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Scale className="h-4 w-4" />
                              <span>Tamanho: {fornecedor.size.name}</span>
                            </div>
                          </div>
                        </div>

                        {/* Preço e Botão */}
                        <div className="flex items-center justify-between space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              Preço por kg
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                              R$ {fornecedor.price}
                            </p>
                          </div>
                          <a
                            href="https://wa.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <MessageCircle className="h-5 w-5" />
                            <span>Chamar</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-base">Nenhum fornecedor disponível para este produto.</p>
              )}
            </>
          )}
          {fornecedoresError && (
            <p className="text-red-500 text-sm mt-1">
              Erro ao carregar fornecedores
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsProduct;
