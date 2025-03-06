import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app.routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Routes() {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
