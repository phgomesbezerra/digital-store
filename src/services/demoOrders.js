// Pedidos de demonstração guardados só no navegador (localStorage).
// Finalizar um pedido é só uma mudança de status na simulação:
// não há pagamento, cobrança, entrega nem comunicação com loja real.
const KEY = "digital-store-pedidos-demo";
export const ORDERS_CHANGED = "digital-store-orders-changed";

export function loadOrders() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(list)) return [];
    return list.filter(
      (order) =>
        order &&
        typeof order.id === "string" &&
        Array.isArray(order.items) &&
        typeof order.total === "number" &&
        (order.status === "pendente" || order.status === "finalizado"),
    );
  } catch {
    return [];
  }
}

function save(orders) {
  try {
    localStorage.setItem(KEY, JSON.stringify(orders));
    window.dispatchEvent(new Event(ORDERS_CHANGED));
    return true;
  } catch {
    return false;
  }
}

// Cria um pedido de simulação a partir dos itens do carrinho. Nasce "pendente".
export function createOrder(items, total, options = {}) {
  const orders = loadOrders();
  if (options.checkoutId) {
    const existing = orders.find(
      (order) => order.checkoutId === options.checkoutId,
    );
    if (existing) return { ok: true, order: existing };
  }
  const order = {
    ...(options.checkoutId ? { checkoutId: options.checkoutId } : {}),
    id: `SIM-${Date.now()}`,
    createdAt: new Date().toISOString(),
    items: items.map((item) => ({
      name: item.name,
      image: item.image,
      size: item.size,
      color: item.color,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
    })),
    total,
    status: "pendente",
    ...(options.profile ? { profile: options.profile } : {}),
    ...(options.paymentMethod
      ? { demoVersion: 2, paymentMethod: options.paymentMethod }
      : {}),
  };
  if (!save([order, ...orders])) return { ok: false, order: null };
  return { ok: true, order };
}

export function setOrderStatus(id, status) {
  const next = loadOrders().map((order) =>
    order.id === id ? { ...order, status } : order,
  );
  save(next);
  return next;
}

export function removeOrder(id) {
  const next = loadOrders().filter((order) => order.id !== id);
  save(next);
  return next;
}
