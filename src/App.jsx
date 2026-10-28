import { BrowserRouter, Routes, Route, Link } from "react-router";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductListingPage from "./pages/ProductListingPage";
import ProductViewPage from "./pages/ProductViewPage";
import AuthPage from "./pages/AuthPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import ProfilePage from "./pages/ProfilePage";
function InfoPage() {
  return (
    <div className="container empty">
      <h1>Demonstração acadêmica</h1>
      <p>
        As páginas institucionais são demonstrativas. Carrinho e pedidos são
        simulações salvas só neste navegador, sem pagamento nem entrega. Não use
        dados pessoais reais nesta demonstração.
      </p>
      <Link className="button" to="/products">
        Explorar produtos
      </Link>
    </div>
  );
}
function NotFound() {
  return (
    <div className="container empty">
      <h1>Página não encontrada</h1>
      <Link className="button" to="/">
        Voltar ao início
      </Link>
    </div>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductListingPage />} />
          <Route path="produtos" element={<ProductListingPage />} />
          <Route path="product/:id" element={<ProductViewPage />} />
          <Route path="login" element={<AuthPage mode="login" />} />
          <Route path="cadastro" element={<AuthPage mode="cadastro" />} />
          <Route
            path="cadastro/dados"
            element={<AuthPage mode="formulario" />}
          />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="perfil/pagamentos" element={<ProfilePage />} />
          <Route path="finalizar-compra" element={<CheckoutPage />} />
          <Route path="compra/sucesso/:id" element={<SuccessPage />} />
          <Route path="carrinho" element={<CartPage />} />
          <Route path="pedidos" element={<OrdersPage />} />
          {["categorias", "informacoes"].map((path) => (
            <Route key={path} path={path} element={<InfoPage />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
