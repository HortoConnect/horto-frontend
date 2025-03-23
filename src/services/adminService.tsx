import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const fornecedorService = async (name: string, cnpj: string) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.post(
      "/supplier",
      { name, cnpj },
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
    const response = await api.get("/supplier", {
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
