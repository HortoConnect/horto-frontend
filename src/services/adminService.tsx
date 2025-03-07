import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const fornecedoresService = async () => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.post("/supplier/find/all", {
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
