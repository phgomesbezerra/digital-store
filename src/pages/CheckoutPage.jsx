import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { loadCart, cartTotal, clearCart } from "../services/demoCart";
import { createOrder } from "../services/demoOrders";
import { money } from "../data/products";
import {
  DemoNote,
  PersonalFields,
  DeliveryFields,
  DemoField,
} from "../components/DemoForms";
import { loadProfile, DEMO_PROFILE } from "../services/demoProfile";
import { loadAccounts, cleanProfile } from "../services/demoAccounts";
export function TotalBox({ total }) {
  return (
    <div className="checkout-total">
      <div>
        <strong>Total</strong>
        <b>{money(total)}</b>
      </div>
      <small>Total da simulação · sem cobrança</small>
    </div>
  );
}
export default function CheckoutPage() {
  const [profile, setProfile] = useState(
    () => loadProfile() ?? cleanProfile(DEMO_PROFILE),
  );
  const [accounts] = useState(loadAccounts);
  const [selected, setSelected] = useState(() => loadProfile()?.email ?? "");
  const [acknowledged, setAcknowledged] = useState(false);
  const [items] = useState(loadCart),
    [method, setMethod] = useState("cartao"),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const checkoutId = useRef(crypto.randomUUID());
  const navigate = useNavigate();
  const total = cartTotal(items);
  function confirm(e) {
    e.preventDefault();
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    const current = loadCart();
    if (!current.length) {
      setError("O carrinho está vazio. Volte aos produtos.");
      locked.current = false;
      setBusy(false);
      return;
    }
    if (JSON.stringify(current) !== JSON.stringify(items)) {
      setError(
        "O carrinho mudou em outra aba. Atualize a página para conferir o resumo antes de continuar.",
      );
      locked.current = false;
      setBusy(false);
      return;
    }
    const result = createOrder(current, cartTotal(current), {
      paymentMethod: method,
      checkoutId: checkoutId.current,
      profile: cleanProfile(profile),
    });
    if (!result.ok) {
      setError(
        "Não foi possível salvar a simulação. Seu carrinho foi mantido. Verifique o armazenamento local.",
      );
      locked.current = false;
      setBusy(false);
      return;
    }
    clearCart();
    navigate(`/compra/sucesso/${result.order.id}`, { replace: true });
  }
  if (!items.length)
    return (
      <div className="container empty">
        <h1>Seu carrinho está vazio</h1>
        <p>Adicione produtos antes de iniciar a finalização de exemplo.</p>
        <Link className="button" to="/products">
          Explorar produtos
        </Link>
      </div>
    );
  const payButton = (
    <button
      type="submit"
      form="checkout-demo"
      className="button payment-button"
      disabled={busy}
    >
      {busy ? "Registrando simulação…" : "Realizar Pagamento"}
    </button>
  );
  return (
    <div className="container checkout-page">
      <h1>Finalizar Compra</h1>
      <DemoNote />
      <div className="checkout-grid">
        <form id="checkout-demo" onSubmit={confirm} className="checkout-form">
          <section className="form-card checkout-person">
            <label className="demo-field">
              Usar cadastro fictício
              <select
                value={selected}
                onChange={(e) => {
                  setSelected(e.target.value);
                  const account = accounts.find(
                    (a) => a.email === e.target.value,
                  );
                  if (account) setProfile(account);
                }}
              >
                <option value="">Dados desta simulação</option>
                {accounts.map((a) => (
                  <option key={a.email} value={a.email}>
                    {a.nome}
                  </option>
                ))}
              </select>
            </label>
            <p>
              Você pode ajustar os dados abaixo só para este pedido. O cadastro
              original não será alterado.
            </p>
          </section>
          <PersonalFields profile={profile} onChange={setProfile} />
          <DeliveryFields profile={profile} onChange={setProfile} />
          <label className="fictional-ack">
            <input
              type="checkbox"
              required
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />{" "}
            Estou usando apenas dados inventados nesta simulação.
          </label>
          <section className="form-card">
            <h2>Informações de Pagamento</h2>
            <fieldset className="payment-options">
              <legend>Forma de Pagamento</legend>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cartao"
                  checked={method === "cartao"}
                  onChange={() => setMethod("cartao")}
                />{" "}
                Cartão de Crédito
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="boleto"
                  checked={method === "boleto"}
                  onChange={() => setMethod("boleto")}
                />{" "}
                Boleto Bancário
              </label>
            </fieldset>
            {method === "cartao" ? (
              <>
                <DemoField label="Nome do Cartão" field="titular" />
                <div className="payment-fields">
                  <DemoField label="Número do Cartão" field="cartao" />
                  <DemoField
                    label="Data de validade do Cartão"
                    field="validade"
                  />
                  <DemoField label="CVV" field="cvv" />
                </div>
              </>
            ) : (
              <p className="boleto-demo">
                Boleto fictício para exercício. Não será emitido boleto, código
                de barras ou cobrança.
              </p>
            )}
            <small className="field-note">
              Campos de exemplo não editáveis. Nenhum dado de cartão é
              solicitado ou salvo.
            </small>
          </section>
          {error && (
            <p className="feedback" role="alert">
              {error}
            </p>
          )}
        </form>
        <aside className="checkout-summary">
          <h2>RESUMO</h2>
          <ul className="summary-items">
            {items.map((i) => (
              <li key={i.key}>
                <img src={i.image} alt="" />
                <div>
                  <strong>{i.name}</strong>
                  <small>
                    {i.quantity} × {money(i.unitPrice)}
                  </small>
                </div>
              </li>
            ))}
          </ul>
          <dl className="checkout-lines">
            <div>
              <dt>Subtotal:</dt>
              <dd>{money(total)}</dd>
            </div>
            <div>
              <dt>Frete:</dt>
              <dd>{money(0)}</dd>
            </div>
            <div>
              <dt>Desconto adicional:</dt>
              <dd>{money(0)}</dd>
            </div>
          </dl>
          <TotalBox total={total} />
          {payButton}
        </aside>
        <section className="checkout-final form-card">
          <h2>Finalizar Compra</h2>
          <TotalBox total={total} />
          {payButton}
        </section>
      </div>
      <Link className="checkout-back" to="/carrinho">
        Voltar ao carrinho
      </Link>
    </div>
  );
}
