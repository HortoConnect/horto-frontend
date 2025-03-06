import { Routes, Route } from "react-router-dom";
import App from "../App";
import Produtos from "../pages/Produtos"

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/produtos" element={<Produtos />} />
    </Routes>
  );
}
