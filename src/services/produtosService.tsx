import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const produtosCadastrados = async () => {

  try {
    const response = await api.get("/product/find/all ");
    return response.data;
  } catch (error) {
    throw error;
  }
};