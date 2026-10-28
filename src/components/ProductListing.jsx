import ProductCard from "./ProductCard";
export default function ProductListing({ products, columns = 4 }) {
  return (
    <div className={`product-grid columns-${columns}`}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
