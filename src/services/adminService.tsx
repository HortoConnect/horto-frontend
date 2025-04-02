import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
  withCredentials: true,
});

export const fornecedorService = async (name: string, cnpj: string, sales_phone: string, contact_phone: string) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.post(
      "/api/supplier",
      { name, cnpj, sales_phone, contact_phone },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro na requisição:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export const fornecedoresListService = async () => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get("/api/supplier", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro na requisição:",
      error?.response?.data || error.message
    );
    throw error;
  }
};

export const updateFornecedorService = async (id: number, data: any) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.patch(`/api/supplier/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error : any) {
    throw new Error(error.response?.data?.message || error.message || "Erro ao atualizar fornecedor");
  }
};

export const deleteFornecedorService = async (id: number) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.delete(`/api/supplier/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro na requisição:",
      error?.response?.data || error.message
    );
    throw error;
  }
};
