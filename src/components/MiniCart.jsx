import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import {
  loadCart,
  cartCount,
  cartTotal,
  clearCart,
  CART_CHANGED,
} from "../services/demoCart";
import { money } from "../data/products";
export default function MiniCart() {
  const [items, setItems] = useState(loadCart),
    [open, setOpen] = useState(false),
    [error, setError] = useState("");
  const root = useRef(null),
    trigger = useRef(null);
  const location = useLocation();
  const route = `${location.pathname}${location.search}`;
  const [openedRoute, setOpenedRoute] = useState(route);
  const visible = open && openedRoute === route;
  useEffect(() => {
    const update = () => setItems(loadCart());
    window.addEventListener(CART_CHANGED, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(CART_CHANGED, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  useEffect(() => {
    if (!visible) return;
    function outside(e) {
      if (!root.current?.contains(e.target)) setOpen(false);
    }
    function key(e) {
      if (e.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", key);
    };
  }, [visible]);
  return (
    <div className="mini-cart-root" ref={root}>
      <button
        ref={trigger}
        className="cart cart-trigger"
        aria-label={`Abrir resumo do carrinho, ${cartCount(items)} itens`}
        aria-expanded={visible}
        aria-controls="mini-cart-panel"
        onClick={() => {
          setOpenedRoute(route);
          setOpen(!visible);
        }}
      >
        <img src="/store/mini-cart.svg" width="28" height="28" alt="" />
        {cartCount(items) > 0 && (
          <span className="cart-badge">{cartCount(items)}</span>
        )}
      </button>
      {visible && (
        <section
          id="mini-cart-panel"
          className="mini-cart-panel"
          aria-label="Meu Carrinho"
        >
          <div className="mini-cart-title">
            <h2>Meu Carrinho</h2>
            <button
              className="text-link"
              aria-label="Fechar resumo do carrinho"
              onClick={() => {
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              ×
            </button>
          </div>
          {items.length ? (
            <>
              <ul className="mini-cart-items">
                {items.map((item) => (
                  <li key={item.key}>
                    <img src={item.image} alt="" />
                    <div>
                      <strong>{item.name}</strong>
                      <small>
                        {item.quantity} × {money(item.unitPrice)}
                      </small>
                      <b>{money(item.quantity * item.unitPrice)}</b>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mini-cart-total">
                <strong>Valor total:</strong>
                <b>{money(cartTotal(items))}</b>
              </p>
              <div className="mini-cart-actions">
                <button
                  className="text-link"
                  onClick={() => {
                    const next = clearCart();
                    setItems(next);
                    if (loadCart().length)
                      setError("Não foi possível esvaziar.");
                  }}
                >
                  Esvaziar
                </button>
                <Link
                  className="button"
                  to="/carrinho"
                  onClick={() => setOpen(false)}
                >
                  Ver Carrinho
                </Link>
              </div>
            </>
          ) : (
            <>
              <p>Seu carrinho está vazio.</p>
              <Link
                className="button"
                to="/products"
                onClick={() => setOpen(false)}
              >
                Explorar produtos
              </Link>
            </>
          )}
          {error && <p role="alert">{error}</p>}
          <small className="mini-cart-note">Carrinho de demonstração</small>
        </section>
      )}
    </div>
  );
}
