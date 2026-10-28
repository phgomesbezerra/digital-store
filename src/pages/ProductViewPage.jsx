import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { loadProduct, loadProducts } from "../services/products";
import { addItem } from "../services/demoCart";
import Gallery from "../components/Gallery";
import BuyBox from "../components/BuyBox";
import ProductOptions from "../components/ProductOptions";
import ProductListing from "../components/ProductListing";
import Section from "../components/Section";
export default function ProductViewPage() {
  const { id } = useParams();
  const [state, setState] = useState({ id: null, status: "loading" });
  useEffect(() => {
    let active = true;
    Promise.all([loadProduct(id), loadProducts()]).then(
      ([detail, list]) => {
        if (active)
          setState({
            id,
            status: "ready",
            product: detail.product,
            all: list.products,
          });
      },
      () => {
        if (active) setState({ id, status: "missing" });
      },
    );
    return () => {
      active = false;
    };
  }, [id]);
  if (state.id !== id || state.status === "loading") {
    return (
      <div className="container empty">
        <p className="loading" role="status">
          Carregando produto…
        </p>
      </div>
    );
  }
  return state.status === "ready" ? (
    <ProductDetail key={id} product={state.product} all={state.all} />
  ) : (
    <div className="container empty">
      <h1>Produto não encontrado</h1>
      <Link className="button" to="/products">
        Voltar aos produtos
      </Link>
    </div>
  );
}
function ProductDetail({ product, all }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [message, setMessage] = useState("");
  // A galeria demonstra cinco estados com a mesma foto e fundos diferentes; não são vistas reais adicionais.
  const images = product.images;
  return (
    <div className="container detail-page">
      <nav className="breadcrumb" aria-label="Caminho">
        <Link to="/">Home</Link> / <Link to="/products">Produtos</Link> /{" "}
        <span>{product.name}</span>
      </nav>
      <div className="product-detail">
        <div>
          <Gallery
            images={images}
            width="700px"
            height="570px"
            radius="4px"
            showThumbs
          />
        </div>
        <BuyBox
          {...product}
          message={message}
          onBuy={() => {
            // O aviso diz exatamente o que falta escolher.
            if (!size || !color) {
              setMessage(
                !size && !color
                  ? "Selecione um tamanho e uma cor para continuar a simulação."
                  : !size
                    ? "Falta escolher o tamanho para continuar a simulação."
                    : "Falta escolher a cor para continuar a simulação.",
              );
              return;
            }
            const result = addItem(product, size, color);
            setMessage(
              result.ok ? (
                <>
                  Adicionado à simulação: {product.name}, tamanho {size}, cor{" "}
                  {color}. <Link to="/carrinho">Ver carrinho</Link>. Nenhuma
                  compra foi realizada.
                </>
              ) : (
                "Não foi possível salvar o carrinho neste navegador. Verifique se o armazenamento local está disponível."
              ),
            );
          }}
        >
          <ProductOptions
            label="Tamanho"
            options={product.sizes}
            value={size}
            onChange={setSize}
          />
          <ProductOptions
            label="Cor"
            options={product.colors}
            shape="circle"
            type="color"
            value={color}
            onChange={setColor}
          />
        </BuyBox>
      </div>
      <Section
        title="Produtos Relacionados"
        link={{ text: "Ver todos", href: "/products" }}
      >
        <ProductListing
          products={all.filter((item) => item.id !== product.id).slice(0, 4)}
        />
      </Section>
    </div>
  );
}
