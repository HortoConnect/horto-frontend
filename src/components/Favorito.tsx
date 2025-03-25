import { Star } from "lucide-react";
import {
  toggleFavorite,
  fetchUserFavoritesService,
} from "../services/produtosService";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface FavoritoProps {
  productId: number;
}

const Favorito: React.FC<FavoritoProps> = ({ productId }) => {
  const { id } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: favorites, isFetching } = useQuery({
    queryKey: ["favoritos", id],
    queryFn: () => fetchUserFavoritesService(Number(id)),
    enabled: !!id,
  });

  const isFavorito = favorites?.some(
    (favorite: any) => favorite.product.id === productId
  );

  const handleAddFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!id || isFavorito) return;

    const previousFavorites = queryClient.getQueryData(["favoritos", id]);

    try {
      queryClient.setQueryData(["favoritos", id], (old: any[]) => [
        ...(old || []),
        { product: { id: productId } }, 
      ]);

      await toggleFavorite(Number(id), productId);
      
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ["favoritos", id] });
      }, 1500);
    } catch (error) {
      queryClient.setQueryData(["favoritos", id], previousFavorites);
      console.error("Erro ao adicionar favorito:", error);
    }
  };

  return (
    <div onClick={handleAddFavorite} className="cursor-pointer">
      <Star
        className={`text-yellow-400 ${isFavorito ? "fill-current" : ""} ${
          isFetching ? "opacity-50" : ""
        }`}
      />
    </div>
  );
};

export default Favorito;