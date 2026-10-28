export default function FilterGroup({
  title,
  inputType = "checkbox",
  options,
  values,
  onChange,
}) {
  return (
    <fieldset className="filter-group">
      <legend>{title}</legend>
      {options.map((option) => {
        const value = option.value ?? option.text;
        return (
          <label key={value}>
            <input
              type={inputType}
              name={title}
              value={value}
              checked={values.includes(value)}
              onChange={() => onChange(value)}
            />
            {option.text}
          </label>
        );
      })}
    </fieldset>
  );
}
