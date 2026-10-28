// Catálogo didático local. Preços, avaliações e descrições são exemplos, não ofertas reais.
const names = [
  "Tênis Nike Revolution 6 Next Nature",
  "K-Swiss V8",
  "K-Swiss V8",
  "K-Swiss V8",
  "K-Swiss V8",
];
export const products = Array.from({ length: 15 }, (_, index) => ({
  id: String(index + 1),
  name: `${index === 0 ? names[0] : "K-Swiss V8"} - ${index % 2 ? "Feminino" : "Masculino"}`,
  image: index === 0 ? "/design/tenis-nike.png" : "/design/tenis-kswis.png",
  images: Array.from({ length: 5 }, (_, i) => ({
    src: index === 0 ? "/design/tenis-nike.png" : "/design/tenis-kswis.png",
    alt: `${index === 0 ? names[0] : "K-Swiss V8"} - apresentação ${i + 1}`,
    background: ["#e2dfff", "#ffe8b9", "#ffc4bd", "#decea7", "#e6e1d3"][i],
  })),
  price: 240 + index * 17,
  ...(index % 3 !== 2 ? { priceDiscount: 169.9 + index * 11 } : {}),
  brand: index === 0 ? "Nike" : "K-Swiss",
  category: index % 2 ? "Casual" : "Esporte e lazer",
  gender: index % 2 ? "Feminino" : "Masculino",
  condition: index === 14 ? "Usado" : "Novo",
  reference: `DS-${String(index + 1).padStart(4, "0")}`,
  stars: 4.7,
  rating: 90,
  description:
    "Produto de demonstração do projeto acadêmico. Escolha tamanho e cor para testar os estados da interface. Não há venda ou pagamento neste site.",
  sizes: ["39", "40", "41", "42", "43"],
  colors: ["#70e3ed", "#ed6484", "#555555", "#7975bf"],
}));
export const money = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const finalPrice = (product) => product.priceDiscount ?? product.price;
