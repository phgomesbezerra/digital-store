export default function ProductOptions({
  options,
  radius = "4px",
  shape = "square",
  type = "text",
  value,
  onChange,
  label,
}) {
  return (
    <fieldset className="product-options">
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <button
            key={option}
            type="button"
            className={`${shape} ${type}`}
            aria-label={
              type === "color" ? `Cor ${option}` : `Tamanho ${option}`
            }
            aria-pressed={value === option}
            style={{
              borderRadius: shape === "circle" ? "50%" : radius,
              ...(type === "color" ? { backgroundColor: option } : {}),
            }}
            onClick={() => onChange(option)}
          >
            {type === "text" ? option : ""}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
