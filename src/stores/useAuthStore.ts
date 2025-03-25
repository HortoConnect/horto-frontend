import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  isLoggedIn: boolean;
  role: string | null;
  id: number | null;
  islogin: (token: string, payload: { role: string, id: number }) => void;
  islogout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!Cookies.get("authToken"),
  role: Cookies.get("userRole") || null,
  id: Cookies.get("userId") ? Number(Cookies.get("userId")) : null,
  
  islogin: (token: string, payload: { role: string, id: number }) => {
    console.log("Salvando ID no Zustand:", payload.id);
    
    Cookies.set("authToken", token, { 
      expires: 7, 
      secure: true, 
      sameSite: "Strict" 
    });
    Cookies.set("userRole", payload.role, { 
      expires: 7, 
      secure: true, 
      sameSite: "Strict" 
    });
    Cookies.set("userId", String(payload.id), { 
      expires: 7, 
      secure: true, 
      sameSite: "Strict" 
    });

    set({ 
      isLoggedIn: true, 
      role: payload.role, 
      id: payload.id 
    });
  },
  
  islogout: () => {
    Cookies.remove("authToken");
    Cookies.remove("userRole");
    Cookies.remove("userId");

    set({ 
      isLoggedIn: false, 
      role: null, 
      id: null 
    });
  },
}));