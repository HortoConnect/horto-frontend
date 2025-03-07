import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app.routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { getTokenPayload } from "@/utils/authUtils";

export function Routes() {
  const { islogin } = useAuthStore();
  const queryClient = new QueryClient();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const userData = getTokenPayload(token);
      islogin(token, {
        role: userData.role
      })
    }
  }, [islogin]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
