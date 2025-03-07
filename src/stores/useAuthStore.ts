import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  isLoggedIn: boolean;
  role: string | null;
  islogin: (token: string, payload: { role: string }) => void;
  islogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  role: null,
  islogin: (token: string, payload: { role: string}) => {
    Cookies.set("authToken", token, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
    console.log("Role zustand", payload.role);
    set({
      isLoggedIn: true,
      role: payload.role,
    });
  },
  islogout: () => {
    Cookies.remove("authToken");

    set({
      isLoggedIn: false,
      role: null,
    });
  },
}));
