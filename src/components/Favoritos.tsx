import { useState } from "react";
import logo from "../assets/img/logo.png";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { fetchUserFavoritesService, removeFavoriteService } from "../services/produtosService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CardFavorito from "./CardFavorito";

const Favoritos = () => {
  const [favOpen, setFavOpen] = useState(false);
  const { islogout, id } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    islogout();
    navigate("/", { replace: true });
  };

  const {
    data: favoritos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favoritos", Number(id)],
    queryFn: () => fetchUserFavoritesService(Number(id)),
    staleTime: 20 * 60 * 1000,
    enabled: favOpen,
  });

  const handleRemoveFavorite = async (productId: number) => {
    try {
      await removeFavoriteService(productId);
      queryClient.invalidateQueries({ queryKey: ["favoritos", Number(id)] });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div className="flex gap-1">
      <div>
        <Button
          className={cn(
            "bg-green-500 text-gray-100 hover:bg-green-600 cursor-pointer"
          )}
          onClick={() => setFavOpen(!favOpen)}
        >
          Favoritos
        </Button>
        {favOpen ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : null}
        <div
          className={
            favOpen
              ? "fixed top-0 left-0 w-[300px] h-screen z-10 duration-300 bg-gradient-to-t from-green-100 to-white"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
          }
        >
          <X
            className="absolute right-4 top-8 cursor-pointer text-black"
            onClick={() => setFavOpen(!favOpen)}
          />
          <img src={logo} alt="Logo" className="w-[90px] h-auto pt-2 pl-2" />
          <nav className="p-4">
            <h2 className="text-xl font-semibold mb-4">Meus Favoritos</h2>
          {error && <p className="text-red-500">Erro ao carregar favoritos</p>}
            {isLoading ? (
              <p className="text-gray-500">Carregando...</p>
            ) : favoritos.length > 0 ? (
              <ul className="space-y-4">
                {favoritos.map((product: any) => (
                  <CardFavorito
                    key={product.id}
                    product={product}
                    onRemove={handleRemoveFavorite}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nenhum produto favoritado</p>
            )}
          </nav>
        </div>
      </div>
      <div className="cursor-pointer">
        <Button variant="default" onClick={handleLogout}>
          Sair
        </Button>
      </div>
    </div>
  );
};

export default Favoritos;
