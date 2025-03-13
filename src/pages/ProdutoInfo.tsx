import DetailsProduct from "@/components/DetailsProduct";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProduto } from "@/services/produtosService";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ProdutoInfo = () => {
  const { id } = useParams();

  const {
    data: produto = [],
    isLoading: isLoadingProduto,
    error: errorProduto,
  } = useQuery({
    queryKey: ["produto", id],
    queryFn: () => fetchProduto(Number(id)),
    staleTime: 20 * 60 * 1000,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <Link
      to="/produtos"
      className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 mb-8"
    >
      <ArrowLeft className="h-5 w-5" />
      <span>Voltar para lista de produtos</span>
    </Link>

    {isLoadingProduto ? (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <Skeleton className="h-[400px] w-full rounded-none" />
            <Skeleton className="md:h-[400px] h-[200px] w-full rounded-none" />
        </div>
    ) : (
        <DetailsProduct produto={produto}/>
    )}
    {errorProduto && <p>Erro ao carregar dados do produto.</p>}
  
  </div>
  );
};

export default ProdutoInfo;
