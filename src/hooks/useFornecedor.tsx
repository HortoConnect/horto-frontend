import { deleteFornecedorService, fornecedorService, updateFornecedorService } from "@/services/adminService";
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

  const updateFornecedor = async (id: number, updatedData: any) => {
    try {
      await updateFornecedorService(id, updatedData);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao atualizar fornecedor";
      setError(errorMessage);
    }
  };

  const deleteFornecedor = async (id: number) => {
    try {
      await deleteFornecedorService(id);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao deletar fornecedor";
      setError(errorMessage);
    }
  };

  return {
    error,
    cadastroFornecedor,
    deleteFornecedor,
    updateFornecedor
  };

};
