import { useState } from "react";
import { Link } from "react-router";
import {
  loadOrders,
  setOrderStatus,
  removeOrder,
} from "../services/demoOrders";
import { money } from "../data/products";

const STATUS_LABEL = {
  pendente: "Pendente",
  finalizado: "Finalizado",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState(loadOrders);

  if (orders.length === 0) {
    return (
      <div className="container empty">
        <h1>Nenhuma compra de demonstração ainda</h1>
        <p>
          Monte um carrinho e clique em Finalizar compra para registrar uma
          simulação aqui. Nenhum pedido real é criado.
        </p>
        <Link className="button" to="/products">
          Explorar produtos
        </Link>
      </div>
    );
  }

  const pendentes = orders.filter((o) => o.status === "pendente").length;
  const finalizados = orders.length - pendentes;

  return (
    <div className="container orders-page">
      <nav className="breadcrumb" aria-label="Caminho">
        <Link to="/">Home</Link> / <span>Meus Pedidos</span>
      </nav>
      <h1>Meus Pedidos (demonstração)</h1>
      <p className="demo-note">
        Relatório das simulações feitas neste navegador: {orders.length}{" "}
        {orders.length === 1 ? "pedido" : "pedidos"} ({pendentes}{" "}
        {pendentes === 1 ? "pendente" : "pendentes"}, {finalizados}{" "}
        {finalizados === 1 ? "finalizado" : "finalizados"}). Não há pagamento
        nem entrega reais.
      </p>
      <ul className="order-list">
        {orders.map((order) => (
          <li className="order-card" key={order.id}>
            <div className="order-head">
              <strong>Pedido {order.id}</strong>
              <span className={`order-status ${order.status}`}>
                {STATUS_LABEL[order.status]}
              </span>
            </div>
            <small>
              Simulado em {new Date(order.createdAt).toLocaleString("pt-BR")}
            </small>
            <ul className="order-items">
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.quantity}× {item.name} — tamanho {item.size} ·{" "}
                  {money(item.unitPrice)} cada · subtotal{" "}
                  {money(item.unitPrice * item.quantity)}
                </li>
              ))}
            </ul>
            <p className="order-total">
              Total da simulação: <strong>{money(order.total)}</strong>
            </p>
            {order.demoVersion === 2 && (
              <Link to={`/compra/sucesso/${order.id}`}>
                Ver recibo da simulação
              </Link>
            )}
            <div className="order-actions">
              {order.status === "pendente" && (
                <button
                  className="button buy"
                  onClick={() =>
                    setOrders(setOrderStatus(order.id, "finalizado"))
                  }
                >
                  Finalizar (simulação)
                </button>
              )}
              <button
                className="cart-remove"
                onClick={() => setOrders(removeOrder(order.id))}
              >
                Remover do histórico
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
