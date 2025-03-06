import axios from "axios";
// import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const loginService = async (email: string, senha: string) => {
  try {
    const response = await api.post("/auth/login", { email, senha });
    return response.data;
  } catch (error: any) {
    console.error(
      "Erro na requisição:",
      error?.response?.data || error.message
    );
    throw error;
  }''
};

