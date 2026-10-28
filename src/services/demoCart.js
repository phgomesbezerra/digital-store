// Carrinho de demonstração guardado só no navegador (localStorage).
// Não há checkout, pagamento nem pedido real: é só para testar o fluxo.
const KEY = "digital-store-carrinho-demo";
export const CART_CHANGED = "digital-store-cart-changed";

export function loadCart() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(list)) return [];
    return list.filter(
      (item) =>
        item &&
        typeof item.key === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0 &&
        typeof item.unitPrice === "number",
    );
  } catch {
    return [];
  }
}

function save(items) {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new Event(CART_CHANGED));
    return true;
  } catch {
    return false;
  }
}

// Um item é produto + tamanho + cor; repetir a mesma combinação soma a quantidade.
export function addItem(product, size, color) {
  const key = `${product.id}|${size}|${color}`;
  const items = loadCart();
  const found = items.find((item) => item.key === key);
  const next = found
    ? items.map((item) =>
        item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
      )
    : [
        ...items,
        {
          key,
          productId: product.id,
          name: product.name,
          image: product.image,
          size,
          color,
          unitPrice: product.priceDiscount ?? product.price,
          quantity: 1,
        },
      ];
  if (!save(next)) return { ok: false, items };
  return { ok: true, items: next };
}

export function setQuantity(key, quantity) {
  const q = Math.max(1, Math.min(99, Math.trunc(quantity) || 1));
  const next = loadCart().map((item) =>
    item.key === key ? { ...item, quantity: q } : item,
  );
  save(next);
  return next;
}

export function removeItem(key) {
  const next = loadCart().filter((item) => item.key !== key);
  save(next);
  return next;
}

export function clearCart() {
  save([]);
  return [];
}

export function cartCount(items) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}
