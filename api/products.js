// GET /api/products — catálogo completo (função serverless pronta para Vercel).
import { listProducts, sendJson } from "./_lib.js";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "method_not_allowed" });
  }
  return sendJson(res, 200, listProducts());
}
