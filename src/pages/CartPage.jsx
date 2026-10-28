import { useState } from "react";
import { Link } from "react-router";
import {
  loadCart,
  setQuantity,
  removeItem,
  clearCart,
  cartTotal,
} from "../services/demoCart";
import { money } from "../data/products";

export default function CartPage() {
  const [items, setItems] = useState(loadCart);
  const message = "";

  if (items.length === 0) {
    return (
      <div className="container empty">
        <h1>Seu carrinho de demonstração está vazio</h1>
        {message ? (
          <p className="feedback" role="status">
            {message}
          </p>
        ) : (
          <p>
            Escolha um produto, selecione tamanho e cor e clique em Comprar para
            testar o fluxo. Nenhuma compra ou pagamento acontece neste site.
          </p>
        )}
        <Link className="button" to="/products">
          Explorar produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <nav className="breadcrumb" aria-label="Caminho">
        <Link to="/">Home</Link> / <span>Carrinho</span>
      </nav>
      <h1>Carrinho de demonstração</h1>
      <p className="demo-note">
        Simulação salva só neste navegador. Não há pagamento, pedido nem entrega
        reais.
      </p>
      <ul className="cart-items">
        {items.map((item) => (
          <li className="cart-item" key={item.key}>
            <img src={item.image} alt="" width="90" height="72" />
            <div className="cart-item-info">
              <strong>
                <Link to={`/product/${item.productId}`}>{item.name}</Link>
              </strong>
              <small>
                Tamanho {item.size} · Cor{" "}
                <span
                  className="cart-color"
                  style={{ background: item.color }}
                  aria-label={`cor ${item.color}`}
                />
              </small>
              <small>{money(item.unitPrice)} cada</small>
            </div>
            <div className="cart-qty">
              <button
                aria-label={`Diminuir quantidade de ${item.name}`}
                onClick={() =>
                  setItems(setQuantity(item.key, item.quantity - 1))
                }
              >
                −
              </button>
              <span aria-label="Quantidade">{item.quantity}</span>
              <button
                aria-label={`Aumentar quantidade de ${item.name}`}
                onClick={() =>
                  setItems(setQuantity(item.key, item.quantity + 1))
                }
              >
                +
              </button>
            </div>
            <strong className="cart-subtotal">
              {money(item.unitPrice * item.quantity)}
            </strong>
            <button
              className="cart-remove"
              aria-label={`Remover ${item.name} do carrinho`}
              onClick={() => setItems(removeItem(item.key))}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>
          Total da simulação: <strong>{money(cartTotal(items))}</strong>
        </p>
        <div className="cart-actions">
          <button className="button buy" onClick={() => setItems(clearCart())}>
            Esvaziar carrinho
          </button>
          <Link className="button buy" to="/finalizar-compra">
            Finalizar compra
          </Link>
        </div>
        {message && (
          <p className="feedback" role="status">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
