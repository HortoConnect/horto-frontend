import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

export const fetchProduto = async (id: number) => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.get(`/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

    const response = await api.get(`/subcategory/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cadastroCategoriaService = async (name: string) => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.post(
      "/category",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cadastroSubcategoriaService = async (
  name: string,
  category_id: number
) => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.post(
      "/subcategory",
      { name, category_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cadastroTamanhoService = async (name: string) => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.post(
      "/size",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cadastroQualidadeService = async (name: string) => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.post(
      "/quality",
      { name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listaQualidadesService = async () => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.get("/quality", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listaTamanhosService = async () => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get("/size", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const produtoByFornecedorService = async (
  price: number,
  quality_id: number,
  size_id: number,
  product_id: number,
  supplier_id: number
) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.post(
      "/productsupplier",
      { price, quality_id, size_id, product_id, supplier_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listaFornecedoresProdutoService = async (id: number) => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.get(`/productsupplier/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listaProductsService = async (id: number) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get(`/product/subcategory/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const listaFornecedoresService = async () => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get("/supplier", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
