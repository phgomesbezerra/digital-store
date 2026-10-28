// GET /api/products/:id — um produto pelo id (função serverless pronta para Vercel).
import { getProduct, sendJson } from "../_lib.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "method_not_allowed" });
  }
  const id =
    req.query?.id ??
    new URL(req.url, "http://localhost").pathname.split("/").filter(Boolean).pop();
  const found = getProduct(id);
  return found
    ? sendJson(res, 200, found)
    : sendJson(res, 404, { error: "product_not_found" });
}
