import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
  withCredentials: true,
});

export const produtosCadastrados = async (name?: string, category?: string, subcategory?: string) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get("/api/product", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        name,
        category_id: category,
        subcategory_id: subcategory,
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
    const response = await api.get(`/api/product/${id}`, {
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
    const response = await api.get("/api/category", {
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

    const response = await api.get(`/api/subcategory/category/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTamanhos = async () => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get(`/api/size`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchQualidade = async () => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get(`/api/quality`, {
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
    const response = await api.post("/api/product", formData, {
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
      "/api/category",
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
  category_id: number,
  qualities_ids: number[],
  sizes_ids: number[]
) => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.post(
      "/api/subcategory",
      {
        name,
        category_id,
        qualities_id: qualities_ids,
        sizes_id: sizes_ids,
      },
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
      "/api/size",
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
      "/api/quality",
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

// Favoritos
export const toggleFavorite = async (userId: number, productId: number) => {
  const token = Cookies.get("authToken");
  try {
    const response = await api.post("/api/favorites", 
      { user_id: userId, product_id: productId },
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

// Get user favorites
export const fetchUserFavoritesService = async (id: Number) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.get(`/api/favorites/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Remove a product from favorites
export const removeFavoriteService = async (product_id: number) => {
  const token = Cookies.get("authToken");

  try {
    const response = await api.delete(`/api/favorites/${product_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};