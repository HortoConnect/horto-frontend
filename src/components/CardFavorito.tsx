import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const CardFavorito = ({
  product,
  onRemove,
}: {
  product: any;
  onRemove: (id: number) => void;
}) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    setIsRemoving(true);
    await onRemove(product.id);
  };

  return (
    <Link
      to={`/produto/${product.product.id}`}
      className={`relative flex items-center gap-4 p-3 bg-white shadow-md rounded-lg border border-gray-200 mb-2 transition-opacity ${
        isRemoving ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <Trash2
        className={`absolute top-2 right-2 text-gray-400 hover:text-red-500 cursor-pointer transition-opacity ${
          isRemoving ? "opacity-50 cursor-not-allowed" : "opacity-100"
        }`}
        size={18}
        onClick={!isRemoving ? handleRemove : undefined}
      />

      {product.product.pictures && product.product.pictures.length > 0 ? (
        <img
          src={product.product.pictures[0].url}
          alt={product.product.name}
          className="w-16 h-16 object-cover rounded-md"
        />
      ) : (
        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-md">
          <span className="text-xs text-gray-500">...</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-gray-800 truncate">
          {product.product.name}
        </h3>
      </div>
    </Link>
  );
};

export default CardFavorito;
