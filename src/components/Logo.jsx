import { Link } from "react-router";
export default function Logo({ color = "pink" }) {
  return (
    <Link className="logo" to="/" aria-label="Digital Store - início">
      <img
        src={`/store/logo-${color === "white" ? "footer" : "header"}.svg`}
        width="253"
        height="44"
        alt="Digital Store"
      />
    </Link>
  );
}
