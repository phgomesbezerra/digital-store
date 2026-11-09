// api.js - ponte entre a loja (React) e a nossa API do curso (Node + MySQL).
//
// A loja nunca fala direto com o banco: ela chama a API, e a API é quem
// conversa com o MySQL. O endereço da API fica numa variável de ambiente,
// para trocar entre "API no meu computador" e "API hospedada" sem mexer
// no código:
//
//   VITE_API_URL=http://localhost:3000   (padrão, desenvolvimento)
//
// Em produção (Vercel), basta criar essa variável com o endereço da API
// hospedada no painel do projeto.

// Regra de segurança do endereço:
// - Com VITE_API_URL definida (ex.: API hospedada), usa ela.
// - Sem ela, só tenta http://localhost:3000 quando a PÁGINA roda em localhost
//   (desenvolvimento no computador de quem estuda).
// - No site publicado SEM a variável, nem tenta: iria bater no localhost do
//   VISITANTE (que não tem API nenhuma) e atrasar a loja. Nesse caso cai
//   direto para a API de estudo /api/products.
const rodandoLocal =
  typeof location !== "undefined" &&
  (location.hostname === "localhost" || location.hostname === "127.0.0.1");

const API_BASE = import.meta.env?.VITE_API_URL ?? (rodandoLocal ? "http://localhost:3000" : null);

// Imagem padrão da loja para produtos cadastrados sem foto na API.
const IMAGEM_PADRAO = "/design/tenis-kswis.png";

// Converte o produto no formato da API (enunciado do curso) para o formato
// que as telas da loja esperam. A tradução fica aqui no front de propósito:
// o backend mantém o formato exato do enunciado, que é o que será avaliado.
function adaptarProduto(p) {
  const fotos = (p.images || []).map((img) => ({
    src: img.content.startsWith("http") ? img.content : API_BASE + img.content,
    alt: p.name,
  }));

  // Opções da API viram tamanhos e cores da tela do produto.
  const opcoes = p.options || [];
  const tamanhos = opcoes.find((o) => o.type === "text");
  const cores = opcoes.find((o) => o.type === "color");

  return {
    id: String(p.id),
    name: p.name,
    image: fotos[0]?.src ?? IMAGEM_PADRAO,
    images: fotos.length > 0 ? fotos : [{ src: IMAGEM_PADRAO, alt: p.name }],
    price: p.price,
    // Só existe desconto quando o preço com desconto é menor que o cheio.
    ...(p.price_with_discount < p.price ? { priceDiscount: p.price_with_discount } : {}),
    description: p.description ?? "",
    category_ids: p.category_ids ?? [],
    stock: p.stock ?? 0,
    sizes: tamanhos ? tamanhos.values : [],
    colors: cores ? cores.values : [],
  };
}

// Lista o catálogo: GET /v1/product/search?limit=-1 (todos os produtos).
export async function listarProdutos() {
  if (!API_BASE) throw new Error("API do curso sem endereço configurado neste ambiente.");
  const response = await fetch(`${API_BASE}/v1/product/search?limit=-1`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`API respondeu ${response.status}`);
  const data = await response.json();
  return data.data.map(adaptarProduto);
}

// Busca um produto: GET /v1/product/:id.
export async function obterProduto(id) {
  if (!API_BASE) throw new Error("API do curso sem endereço configurado neste ambiente.");
  const response = await fetch(`${API_BASE}/v1/product/${encodeURIComponent(id)}`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(`API respondeu ${response.status}`);
  return adaptarProduto(await response.json());
}
