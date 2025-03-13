import { Routes, Route } from "react-router-dom";
import App from "../App";
import Produtos from "../pages/Produtos";
import Dashboard from "@/pages/Dashboard";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import ProdutoInfo from "@/pages/ProdutoInfo";

export function AppRoutes() {
  return (
    <Routes>
      {/* Rota pública (qualquer um pode acessar) */}
      {/* Sem nenhuma restrição de acesso */}

      {/* Rota pública para não logados (quem tá logado não pode acessar) */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<App />} />
      </Route>

      {/* Rota privada (somente quem está logado pode acessar) */}
      <Route element={<PrivateRoute />}>
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produto/:id" element={<ProdutoInfo />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
