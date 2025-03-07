import { useState } from "react";
import { Star } from "lucide-react";

const Favorito = () => {
  const [favorito, setFavorito] = useState(false);

  function handleFavorito(e : any) {
    e.stopPropagation(); 
    e.preventDefault(); 
    setFavorito(!favorito);
  }

  return (
    <div onClick={handleFavorito} className="cursor-pointer">
      <Star
        className={`text-yellow-400 ${favorito ? "fill-current" : ""}`}
      />
    </div>
  );
};

export default Favorito;