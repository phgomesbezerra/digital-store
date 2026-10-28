import { money } from "../data/products";
export default function BuyBox({
  name,
  reference,
  category,
  stars,
  rating,
  price,
  priceDiscount,
  description,
  children,
  onBuy,
  message,
}) {
  return (
    <div className="buy-box">
      <h1>{name}</h1>
      <small>
        {category} | Ref.: {reference}
      </small>
      <p className="rating">
        <span aria-label={`${stars} de 5 estrelas`}>
          ★★★★★ <b>{stars} ★</b>
        </span>{" "}
        <small>({rating} avaliações)</small>
      </p>
      <p className="detail-prices">
        <strong>{money(priceDiscount ?? price)}</strong>
        {priceDiscount != null && <del>{money(price)}</del>}
      </p>
      <h2>Descrição do produto</h2>
      <p>{description}</p>
      {children}
      <button className="button buy" onClick={onBuy}>
        COMPRAR
      </button>
      <span className="sr-only">
        Demonstração acadêmica. Não realiza compras.
      </span>
      {message && (
        <p className="feedback" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
