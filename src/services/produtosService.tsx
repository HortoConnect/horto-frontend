import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const produtosCadastrados = async (name: string) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get("/product/find/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        name,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCategories = async () => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get("/category/find/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSubcategories = async (categoryId: string) => {
  const token = Cookies.get("authToken");

  try {
    if (!categoryId) {
      return [];
    }

    const response = await api.get("/subcategory/find/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        categoryId: categoryId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
