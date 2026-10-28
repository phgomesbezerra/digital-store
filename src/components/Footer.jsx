import { Link } from "react-router";
import Logo from "./Logo";
export function Information({ title, informations }) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {informations.map((info) => (
          <li key={info.text}>
            <Link to={info.link}>{info.text}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo color="white" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Uma loja
              criada para aprender React.
            </p>
            <div className="social">
              {["facebook", "instagram", "twitter"].map((name) => (
                <a
                  key={name}
                  href={`https://www.${name}.com/`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                >
                  <img
                    src={`/store/${name}.svg`}
                    width="22"
                    height="22"
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>
          <Information
            title="Informação"
            informations={[
              "Sobre Drip Store",
              "Segurança",
              "Wishlist",
              "Blog",
              "Trabalhe conosco",
              "Meus Pedidos",
            ].map((text) => ({ text, link: "/informacoes" }))}
          />
          <Information
            title="Categorias"
            informations={[
              "Camisetas",
              "Calças",
              "Bonés",
              "Headphones",
              "Tênis",
            ].map((text) => ({
              text,
              link: `/products?filter=${encodeURIComponent(text)}`,
            }))}
          />
          <section>
            <h2>Contato</h2>
            <p>Projeto acadêmico Digital Store.</p>
            <p>Sem atendimento comercial.</p>
            <Link to="/informacoes">Sobre esta demonstração</Link>
          </section>
        </div>
        <hr />
        <p className="copyright">© {new Date().getFullYear()} Digital Store</p>
        <p className="copyright">
          Integrantes: Pedro Henrique, Anderson Maia e Anderson Oliveira
        </p>
      </div>
    </footer>
  );
}
