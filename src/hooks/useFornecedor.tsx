import { fornecedorService } from "@/services/adminService";
import { useState } from "react";

export const useFornecedores = () => {
  const [error, setError] = useState<string | null>(null);

  const cadastroFornecedor = async (name: string, cnpj: string, sales_phone: string, contact_phone: string) => {
    try {
        const data = await fornecedorService(name, cnpj, sales_phone, contact_phone);
        console.log("Fornecedor cadastrado com sucesso!", data);
    }catch (err: any) {
        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          "Erro ao cadastrar fornecedor";
        setError(errorMessage);
      }
  };

  return {
    error,
    cadastroFornecedor,
  };

};
