import { Product } from "@/models/Product";
import { ProductsProps } from "@/types/products";
import { Link } from "react-router-dom";
import Favorito from "./Favorito";

const ProductsList: React.FC<ProductsProps> = ({ products }) => {

  return (
    <>
      <ul
        className={
          products && products.length > 0
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "grid grid-cols-1"
        }
      >
        {products &&
          products.length > 0 &&
          products.map((produto: Product) => (
            <Link
              key={produto.id}
              to={`/produto/${produto.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="relative">
                {produto.pictures && produto.pictures.length > 0 ? (
                  <img
                    src={produto.pictures[0].url}
                    alt={produto.name}
                    className="w-full h-48 object-cover transition-transform duration-200"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Imagem não disponível</span>
                  </div>
                )}
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {produto.name}
                </h3>

                <div className="favorito-container">
                  <Favorito productId={produto.id} />
                </div>
              </div>
            </Link>
          ))}
      </ul>
    </>
  );
};

export default ProductsList;
