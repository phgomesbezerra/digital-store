import { Link } from "react-router";
import { money } from "../data/products";
export default function ProductCard({ id, image, name, price, priceDiscount }) {
  return (
    <article className="product-card">
      <Link to={`/product/${id}`}>
        <div className="product-photo">
          {priceDiscount != null && (
            <span className="discount">
              {Math.round((1 - priceDiscount / price) * 100)}% OFF
            </span>
          )}
          <img src={image} alt={name} loading="lazy" />
        </div>
        <small>Tênis</small>
        <h3>{name}</h3>
        <p className="prices">
          {priceDiscount != null ? (
            <>
              <del>{money(price)}</del>
              <strong>{money(priceDiscount)}</strong>
            </>
          ) : (
            <strong>{money(price)}</strong>
          )}
        </p>
      </Link>
    </article>
  );
}
