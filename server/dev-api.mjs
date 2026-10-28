// Servidor local de desenvolvimento da API didática (sem dependências extras).
// Sobe em http://localhost:3001 e atende /api/products e /api/products/:id.
// O Vite encaminha /api para cá via proxy (ver vite.config.js).
import http from "node:http";
import { getProduct, listProducts, sendJson } from "../api/_lib.js";

const port = Number(process.env.DEV_API_PORT ?? 3001);

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "method_not_allowed" });
  }
  if (url.pathname === "/api/products") {
    return sendJson(res, 200, listProducts());
  }
  const match = url.pathname.match(/^\/api\/products\/([^/]+)$/);
  if (match) {
    const found = getProduct(decodeURIComponent(match[1]));
    return found
      ? sendJson(res, 200, found)
      : sendJson(res, 404, { error: "product_not_found" });
  }
  return sendJson(res, 404, { error: "not_found" });
});

server.listen(port, () => {
  console.log(`API didática em http://localhost:${port}/api/products`);
});
