import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import Logo from "./Logo";
import { loadCart, cartCount, CART_CHANGED } from "../services/demoCart";
export default function Header() {
  const [count, setCount] = useState(() => cartCount(loadCart()));
  useEffect(() => {
    const update = () => setCount(cartCount(loadCart()));
    window.addEventListener(CART_CHANGED, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(CART_CHANGED, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("filter") ?? "");
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  function search(event) {
    event.preventDefault();
    navigate(
      `/products${query.trim() ? `?filter=${encodeURIComponent(query.trim())}` : ""}`,
    );
    setOpen(false);
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header-top">
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
          <Logo />
          <button
            className="search-toggle"
            aria-label="Abrir busca"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(!searchOpen)}
          >
            ⌕
          </button>
          <form
            className={searchOpen ? "search search-open" : "search"}
            role="search"
            onSubmit={search}
          >
            <input
              aria-label="Buscar produtos"
              placeholder="Pesquisar produto..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button aria-label="Pesquisar" type="submit">
              ⌕
            </button>
          </form>
          <div className="account">
            <Link to="/cadastro">Cadastre-se</Link>
            <Link className="button" to="/login">
              Entrar
            </Link>
          </div>
          <Link
            className="cart cart-link"
            to="/carrinho"
            aria-label={
              count > 0
                ? `Abrir carrinho de demonstração, ${count} ${count === 1 ? "item" : "itens"}`
                : "Abrir carrinho de demonstração, vazio"
            }
          >
            <img src="/store/mini-cart.svg" width="28" height="28" alt="" />
            {count > 0 && <span className="cart-badge">{count}</span>}
          </Link>
        </div>
        {open && (
          <button
            className="menu-backdrop"
            aria-label="Fechar menu"
            onClick={() => setOpen(false)}
          />
        )}
        <nav
          id="main-nav"
          className={open ? "nav open" : "nav"}
          aria-label="Navegação principal"
        >
          <button
            className="menu-close"
            aria-label="Fechar navegação"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <strong className="mobile-label">Páginas</strong>
          {[
            ["/", "Home"],
            ["/products", "Produtos"],
            ["/categorias", "Categorias"],
            ["/pedidos", "Meus Pedidos"],
          ].map(([to, text]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
            >
              {text}
            </NavLink>
          ))}
          <div className="mobile-account">
            <Link className="button" to="/login" onClick={() => setOpen(false)}>
              Entrar
            </Link>
            <Link to="/cadastro" onClick={() => setOpen(false)}>
              Cadastre-se
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
