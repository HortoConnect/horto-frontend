import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png"
import ProductsList from "../components/ProductsList";

const Produtos = () => {
  return (
    <main>
      <div className="container mx-auto px-4 mt-10">
        {/* Hero Section */}
        <div className="mb-2 text-white">
          <div className="flex items-center justify-between">
            <Link to="/produtos">
              <img src={logo} alt="Logo" className="w-[100px] h-auto" />
            </Link>
            {/* <Favoritos /> */}
          </div>
          <p className="text-lg font-semibold text-green-600">
            Encontre os melhores produtos frescos direto dos produtores
          </p>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center mt-10 w-full px-4 sm:px-0">
            {/* Barra de busca */}
          {/* <SearchForm /> */}
          {/* Filtros */}
        </div>

        <section className="py-10 max-w-[1200px] mx-auto">
          <ProductsList />
        </section>
      </div>
    </main>
  );
};

export default Produtos;
