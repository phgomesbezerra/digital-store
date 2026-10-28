import { Link, useParams } from "react-router";
import { loadOrders } from "../services/demoOrders";
import { DemoNote, ProfileDetails } from "../components/DemoForms";
import { TotalBox } from "./CheckoutPage";
export default function SuccessPage() {
  const { id } = useParams();
  const order = loadOrders().find((o) => o.id === id && o.demoVersion === 2);
  if (!order)
    return (
      <div className="container empty">
        <h1>Simulação não encontrada</h1>
        <p>Não há confirmação salva para este endereço neste navegador.</p>
        <Link className="button" to="/pedidos">
          Ver Meus Pedidos
        </Link>
      </div>
    );
  return (
    <div className="success-page">
      <article className="success-card">
        <header>
          <img className="confetti" src="/design/confetti.svg" alt="" />
          <h1>
            Compra Realizada
            <br />
            com sucesso!
          </h1>
          <DemoNote />
          <p className="order-reference">
            Pedido {order.id} · Simulação registrada
          </p>
        </header>
        <ProfileDetails
          payment={order.paymentMethod ?? "cartao"}
          profile={order.profile}
        />
        <section className="detail-section">
          <h2>Resumo da compra</h2>
          <ul className="summary-items">
            {order.items.map((i, n) => (
              <li key={n}>
                <img src={i.image ?? "/design/tenis-nike.png"} alt="" />
                <div>
                  <strong>{i.name}</strong>
                  <small>
                    {i.quantity} unidade(s) · Tamanho {i.size}
                  </small>
                </div>
              </li>
            ))}
          </ul>
          <TotalBox total={order.total} />
          <button
            className="text-link print-receipt"
            onClick={() => window.print()}
          >
            Imprimir Recibo
          </button>
          <small className="receipt-disclaimer">
            Recibo de demonstração acadêmica. Sem valor fiscal, pagamento ou
            entrega.
          </small>
        </section>
      </article>
      <Link className="button payment-button success-home" to="/">
        Voltar para Home
      </Link>
      <Link className="success-orders" to="/pedidos">
        Ver Meus Pedidos
      </Link>
    </div>
  );
}
