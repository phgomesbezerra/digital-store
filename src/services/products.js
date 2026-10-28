// Consumo real de API: as páginas buscam o catálogo em /api/products.
// Em desenvolvimento, o proxy do Vite encaminha para o servidor local
// (npm run dev:api ou npm run dev:full). Em produção na Vercel, as funções
// em api/ atendem o mesmo caminho. Se a API não estiver no ar, o site usa a
// cópia local do catálogo, para que o estudo nunca fique fora do ar.
import { products as localProducts } from "../data/products.js";

async function request(path) {
  const response = await fetch(path, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`API respondeu ${response.status}`);
  return response.json();
}

export async function loadProducts() {
  try {
    const data = await request("/api/products");
    return { products: data.products, source: "api" };
  } catch {
    return { products: localProducts, source: "local" };
  }
}

export async function loadProduct(id) {
  try {
    const data = await request(`/api/products/${encodeURIComponent(id)}`);
    return { product: data.product, source: "api" };
  } catch {
    const product = localProducts.find((item) => item.id === String(id));
    if (!product) throw new Error("product_not_found");
    return { product, source: "local" };
  }
}
