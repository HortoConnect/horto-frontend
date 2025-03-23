// In useProdutos.tsx
import {
  cadastroCategoriaService,
  cadastroProdutoService,
  cadastroQualidadeService,
  cadastroTamanhoService,
  produtoByFornecedorService,
} from "@/services/produtosService";
import { useState } from "react";

export const useProdutos = () => {
  const [error, setError] = useState<string | null>(null);

  const cadastroProduto = async (
    name: string,
    subcategory_id: number,
    imagem: FileList | File | null
  ) => {
    try {
      const formData = new FormData();
      const dadosProduto = {
        name,
        subcategory_id,
      };

      const json = JSON.stringify(dadosProduto);
      console.log("JSON:", json);
      const blob = new Blob([json], { type: "application/json" });
      formData.append("data", blob);

      if (imagem) {
        if (imagem instanceof FileList) {
          Array.from(imagem).forEach((foto) => {
            formData.append("pictures", foto);
          });
        } else if (imagem instanceof File) {
          formData.append("pictures", imagem);
        }
      }

      setError(null);
      const data = await cadastroProdutoService(formData);
      console.log("Produto cadastrado com sucesso!", data);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao cadastrar produto. Tente novamente.";
      setError(errorMessage);
    }
  };

  const cadastroCategoria = async (name: string) => {
    try {
      const data = await cadastroCategoriaService(name);
      console.log("Categoria cadastrada com sucesso!", data);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao cadastrar categoria. Tente novamente.";
      setError(errorMessage);
    }
  };

  const cadastroTamanho = async (name: string) => {
    try {
      const data = await cadastroTamanhoService(name);
      console.log("Tamanho cadastrado com sucesso!", data);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao cadastrar tamanho. Tente novamente.";
      setError(errorMessage);
    }
  };

  const cadastroQualidade = async (name: string) => {
    try {
      const data = await cadastroQualidadeService(name);
      console.log("Qualidade cadastrada com sucesso!", data);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Erro ao cadastrar qualidade. Tente novamente.";
      setError(errorMessage);
    }
  };

  const ProdutoByFornecedor = async (
    price: number,
    quality_id: number,
    size_id: number,
    product_id: number,
    supplier_id: number
  ) => {
    try {
      await produtoByFornecedorService(
        price,
        quality_id,
        size_id,
        product_id,
        supplier_id
      );
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        "Erro ao fazer conexão com o fornecedor. Tente novamente.";;
      setError(errorMessage);
    }
  };

  return {
    cadastroProduto,
    cadastroCategoria,
    cadastroTamanho,
    cadastroQualidade,
    ProdutoByFornecedor,
    error,
  };
};
