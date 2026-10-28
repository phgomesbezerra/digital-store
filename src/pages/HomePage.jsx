import { useEffect, useState } from "react";
import { Link } from "react-router";
import Gallery from "../components/Gallery";
import Section from "../components/Section";
import ProductListing from "../components/ProductListing";
import { loadProducts } from "../services/products";
// O mockup usa o mesmo produto no destaque; os slides demonstram o controle.
const slides = Array.from({ length: 4 }, (_, i) => ({
  src: "/design/tenis-nike.png",
  alt: `Destaque Nike, slide ${i + 1}`,
}));
export default function HomePage() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    let active = true;
    loadProducts().then((result) => {
      if (active) setItems(result.products);
    });
    return () => {
      active = false;
    };
  }, []);
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div>
            <p className="eyebrow">Melhores ofertas personalizadas</p>
            <h1>
              Queima de
              <br />
              estoque Nike{" "}
              <span className="flame" aria-hidden="true">
                🔥
              </span>
            </h1>
            <p>
              Consequat culpa exercitation mollit nisi excepteur do tempor
              laboris eiusmod irure consectetur.
            </p>
            <Link className="button" to="/products">
              Ver Ofertas
            </Link>
          </div>
          <Gallery
            className="hero-gallery"
            images={slides}
            width="100%"
            height="480px"
          />
        </div>
      </section>
      <div className="container">
        <Section title="Coleções em destaque">
          <div className="collections">
            {[
              ["camisa.png", "Novo drop Supreme"],
              ["tenis-origine.png", "Coleção Adidas"],
              ["fone.png", "Novo Beats Bass"],
            ].map(([image, name]) => (
              <Link to="/products" key={name}>
                <div>
                  <span className="discount">30% OFF</span>
                  <h3>{name}</h3>
                  <span className="collection-action">Comprar</span>
                </div>
                <img src={`/design/${image}`} alt={name} />
              </Link>
            ))}
          </div>
        </Section>
        <Section title="Coleções em destaque" titleAlign="center">
          <div className="categories">
            {[
              ["icon-camisa.svg", "Camisetas"],
              ["icon-calca.svg", "Calças"],
              ["icon-bone.svg", "Bonés"],
              ["icon-fones.svg", "Headphones"],
              ["icon-tenis.svg", "Tênis"],
            ].map(([icon, name]) => (
              <Link
                key={name}
                to={`/products?filter=${encodeURIComponent(name)}`}
              >
                <span>
                  <img src={`/design/${icon}`} alt="" />
                </span>
                <strong>{name}</strong>
              </Link>
            ))}
          </div>
        </Section>
        <Section
          title="Produtos em alta"
          link={{ text: "Ver todos", href: "/products" }}
        >
          {items ? (
            <ProductListing products={items.slice(1, 9)} />
          ) : (
            <p className="loading" role="status">
              Carregando produtos…
            </p>
          )}
        </Section>
      </div>
      <section className="special container">
        <img
          src="/design/oferta-air-jordan.png"
          alt="Tênis da oferta demonstrativa"
        />
        <div>
          <p className="eyebrow">Oferta especial</p>
          <h2>Air Jordan edição de colecionador</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip.
          </p>
          <Link className="button" to="/products">
            Ver Oferta
          </Link>
        </div>
      </section>
    </>
  );
}
