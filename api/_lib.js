// Núcleo da API didática: mesma base de dados usada pelo frontend.
// Compartilhado entre as funções serverless (Vercel) e o servidor local de
// desenvolvimento em server/dev-api.mjs.
import { products } from "../src/data/products.js";

export function listProducts() {
  return { total: products.length, products };
}

export function getProduct(id) {
  const product = products.find((item) => item.id === String(id));
  return product ? { product } : null;
}

export function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}
