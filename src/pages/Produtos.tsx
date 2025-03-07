import { Link, useSearchParams } from "react-router-dom";
import logo from "../assets/img/logo.png";
import ProductsList from "../components/ProductsList";
import Navbar from "@/components/global/Navbar";
import Favoritos from "@/components/Favoritos";
import { Search } from "lucide-react";
import SearchFilter from "@/components/SearchFilter";
import { useEffect, useState } from "react";
import { produtosCadastrados } from "@/services/produtosService";
import { useQuery } from "@tanstack/react-query";

const Produtos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [product, setProduct] = useState(searchParams.get("product") || "");

  const {
    data: produtos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["produtos", product],
    queryFn: () => produtosCadastrados(product.toLocaleLowerCase()),
    staleTime: 20 * 60 * 1000,
  });

  useEffect(() => {
      const newSearchParams = new URLSearchParams();
      if (product) newSearchParams.set("product", product);  
      setSearchParams(newSearchParams);
    }, [product,setSearchParams]);

  console.log(produtos)

  return (
    <>
      <Navbar />
      <main>
        <div className="container mx-auto px-4 mt-10">
          {/* Hero Section */}
          <div className="mb-2 text-white">
            <div className="flex items-center justify-between">
              <Link to="/produtos">
                <img src={logo} alt="Logo" className="w-[100px] h-auto" />
              </Link>
              <Favoritos />
            </div>
            <p className="text-lg font-semibold text-green-600">
              Encontre os melhores produtos frescos direto dos produtores
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center justify-center mt-10 w-full px-4 sm:px-0">
            {/* Barra de busca */}
            <form
              action="/produtos"
              className="w-full font-nunito"
              id="form-search"
            >
              <div className="flex items-center w-full focus-within:border-green-500 transition duration-300 pr-3 gap-2 bg-white border-green-500/30 border-[2px] h-[46px] rounded-[5px] overflow-hidden">
                <input
                  name="query"
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full h-full pl-4 outline-none placeholder-gray-500 text-base font-main"
                  placeholder="Buscar produto..."
                />
                <div className="flex gap-2">
                  <button className="flex justify-center items-center">
                    <Search />
                  </button>
                </div>
              </div>
            </form>
            {/* Filtros */}
            <SearchFilter />
          </div>

          <section className="py-10 max-w-[1280px]">
          {isLoading && <p>Carregando...</p>}
          {error && <p>Erro ao carregar produtos</p>}
            <ProductsList products={produtos.products}/>
          </section>
        </div>
      </main>
    </>
  );
};

export default Produtos;
