import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
  ("");
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
  ("");
};
