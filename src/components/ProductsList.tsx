import { useQuery } from "@tanstack/react-query";
import { produtosCadastrados } from "../services/produtosService";

const ProductsList = () => {
  const {
    data: produtos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["produtos",],
    queryFn: () => produtosCadastrados(),
    staleTime: 20 * 60 * 1000,
  });

  console.log(produtos);

  return (
    <div>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar produtos</p>}
      {produtos}
    </div>
  )
}

export default ProductsList
