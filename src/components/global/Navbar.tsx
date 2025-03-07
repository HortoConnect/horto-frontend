import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button"
import { useAuthStore } from "@/stores/useAuthStore";

const Navbar = () => {
    const { islogout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        islogout();
        navigate("/", { replace: true });
      };

  return (
    <nav>
      <Button variant="default" onClick={handleLogout}>
        Sair
      </Button>
    </nav>
  )
}

export default Navbar
