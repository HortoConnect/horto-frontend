import { useState } from "react";
import logo from "../assets/img/logo.png";
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const Favoritos = () => {
  const [favOpen, setFavOpen] = useState(false);
  const { islogout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    islogout();
    navigate("/", { replace: true });
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
          Favotiros
        </Button>
        {favOpen ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}
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
          <nav>
            <ul className="flex flex-col p-4 text-gray-800">
              <li className="text-xl py-4 flex items-center cursor-pointer">
                Produtos favoritados aqui
              </li>
            </ul>
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
