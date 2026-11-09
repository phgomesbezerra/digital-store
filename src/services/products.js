// Catálogo da loja. Ordem de tentativa:
// 1. Nossa API do curso (Node + MySQL) via api.js - dados reais do banco.
// 2. A API didática antiga em /api/products (estudo, proxy do Vite/Vercel).
// 3. A cópia local do catálogo, para o estudo nunca ficar fora do ar.
import { products as localProducts } from "../data/products.js";
import { listarProdutos, obterProduto } from "./api.js";

async function request(path) {
  const response = await fetch(path, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`API respondeu ${response.status}`);
  return response.json();
}

export async function loadProducts() {
  try {
    const products = await listarProdutos();
    console.info("[catálogo] produtos vieram da API do curso (MySQL).");
    return { products, source: "api" };
  } catch (erroApi) {
    // Diagnóstico visível no console: fallback nunca finge ser a API real.
    console.warn("[catálogo] API do curso não respondeu; tentando a API de estudo.", erroApi);
    try {
      const data = await request("/api/products");
      console.warn("[catálogo] usando a API de estudo (/api/products), não o MySQL.");
      return { products: data.products, source: "api-estudo" };
    } catch {
      console.warn("[catálogo] APIs fora do ar; usando o catálogo local de estudo.");
      return { products: localProducts, source: "local" };
    }
  }
}

export async function loadProduct(id) {
  try {
    const product = await obterProduto(id);
    return { product, source: "api" };
  } catch (erroApi) {
    console.warn("[catálogo] API do curso não respondeu; tentando a API de estudo.", erroApi);
    try {
      const data = await request(`/api/products/${encodeURIComponent(id)}`);
      return { product: data.product, source: "api-estudo" };
    } catch {
      const product = localProducts.find((item) => item.id === String(id));
      if (!product) throw new Error("product_not_found");
      console.warn("[catálogo] produto veio do catálogo local de estudo.");
      return { product, source: "local" };
    }
  }
}
