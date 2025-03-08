import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export const produtosCadastrados = async (name: string) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get("/product", {
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
    const response = await api.get("/category", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSubcategories = async (categoryId: number) => {
  const token = Cookies.get("authToken");

  try {
    if (!categoryId) {
      return [];
    }

    const response = await api.get("/subcategory", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        category_id: categoryId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cadastroProdutoService = async (formData: FormData) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.post("/product", formData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const cadastroCategoriaService = async (name: string) => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.post("/category", { name }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const cadastroSubcategoriaService = async (name: string, category_id: number) => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.post("/subcategory", { name, category_id }, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
