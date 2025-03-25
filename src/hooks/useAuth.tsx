import Cookies from "js-cookie";
import { loginService } from "@/services/authService";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { getTokenPayload } from "../utils/authUtils";

export const useAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const { islogin, islogout } = useAuthStore();

  useEffect(() => {
    const savedToken = Cookies.get("authToken");
    if (savedToken) {
      const userData = getTokenPayload(savedToken);
      islogin(savedToken, {
        role: userData.role,
        id: userData.id,
      });
    }
  }, [islogin]);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginService(email, password);

      Cookies.set("authToken", data.token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      const userData = getTokenPayload(data.token);
      console.log(userData);
      islogin(data.token, {
        role: userData.role,
        id: userData.id,
      });
      setError(null);
      return userData.role;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || "Erro ao fazer login. Tente novamente.";
      setError(errorMessage);
      throw err;
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    islogout();
    console.log("Logout realizado com sucesso!");
  };

  return { login, logout, error };
};
