import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import Section from "../components/Section";
import ProductListing from "../components/ProductListing";
import FilterGroup from "../components/FilterGroup";
import { finalPrice } from "../data/products";
import { loadProducts } from "../services/products";
const groups = [
  {
    key: "brand",
    title: "Marca",
    options: ["Adidas", "K-Swiss", "Nike", "Puma"],
  },
  {
    key: "category",
    title: "Categoria",
    options: ["Esporte e lazer", "Casual"],
  },
  { key: "gender", title: "Gênero", options: ["Masculino", "Feminino"] },
  {
    key: "condition",
    title: "Estado",
    options: ["Novo", "Usado"],
    type: "radio",
  },
];
const normalize = (text) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export default function ProductListingPage() {
  const [params] = useSearchParams();
  const term = params.get("filter") ?? "";
  const [items, setItems] = useState(null);
  const [filters, setFilters] = useState({});
  const [order, setOrder] = useState("relevant");
  const [open, setOpen] = useState(false);
  function toggle(group, value) {
    setFilters((previous) => {
      const old = previous[group.key] ?? [];
      return {
        ...previous,
        [group.key]:
          group.type === "radio"
            ? [value]
            : old.includes(value)
              ? old.filter((item) => item !== value)
              : [...old, value],
      };
    });
  }
  useEffect(() => {
    let active = true;
    loadProducts().then((result) => {
      if (active) setItems(result.products);
    });
    return () => {
      active = false;
    };
  }, []);
  const filtered = (items ?? [])
    .filter(
      (product) =>
        normalize(
          `${product.name} ${product.brand} ${product.category} Tênis`,
        ).includes(normalize(term)) &&
        groups.every(
          (group) =>
            !filters[group.key]?.length ||
            filters[group.key].includes(product[group.key]),
        ),
    )
    .sort((a, b) =>
      order === "low"
        ? finalPrice(a) - finalPrice(b)
        : order === "high"
          ? finalPrice(b) - finalPrice(a)
          : Number(a.id) - Number(b.id),
    );
  return (
    <div className="container listing-page">
      <div className="listing-top">
        <h1>
          {term ? `Resultados para "${term}"` : "Todos os produtos"}{" "}
          <small>- {filtered.length} produtos</small>
        </h1>
        <div className="listing-tools">
          <label className="sort">
            Ordenar por:{" "}
            <select
              value={order}
              onChange={(event) => setOrder(event.target.value)}
              aria-label="Ordenar por"
            >
              <option value="relevant">Mais relevantes</option>
              <option value="low">Menor preço</option>
              <option value="high">Maior preço</option>
            </select>
          </label>
          <button
            className="filter-toggle button"
            aria-expanded={open}
            aria-controls="filters"
            onClick={() => setOpen(!open)}
          >
            {open ? "Fechar filtros" : "Filtrar"}
          </button>
        </div>
      </div>
      <div className="catalog">
        {open && (
          <button
            className="filter-backdrop"
            aria-label="Fechar painel de filtros"
            onClick={() => setOpen(false)}
          />
        )}
        <aside id="filters" className={open ? "filters shown" : "filters"}>
          <div className="filter-title">
            <h2>Filtrar por</h2>
            <button
              className="filter-close"
              aria-label="Fechar painel"
              onClick={() => setOpen(false)}
            >
              ×
            </button>
            <button onClick={() => setFilters({})}>Limpar</button>
          </div>
          {groups.map((group) => (
            <FilterGroup
              key={group.key}
              title={group.title}
              inputType={group.type}
              options={group.options.map((text) => ({ text }))}
              values={filters[group.key] ?? []}
              onChange={(value) => toggle(group, value)}
            />
          ))}
        </aside>
        <div>
          <Section title={`${filtered.length} produtos encontrados`}>
            {items ? (
              <ProductListing products={filtered} columns={3} />
            ) : (
              <p className="loading" role="status">
                Carregando produtos…
              </p>
            )}
          </Section>
          {items && !filtered.length && (
            <div className="empty" role="status">
              <h2>Nenhum produto encontrado</h2>
              <p>Tente outro termo ou limpe os filtros.</p>
              <button className="button" onClick={() => setFilters({})}>
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
