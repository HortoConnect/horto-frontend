import axios from "axios";
// import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
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
