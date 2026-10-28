import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Layout({ children }) {
  const { search, pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const authRoute = ["/login", "/cadastro", "/cadastro/dados"].includes(
    pathname,
  );
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      {!authRoute && <Header key={search} />}
      <main id="conteudo">{children ?? <Outlet />}</main>
      <Footer />
    </>
  );
}
