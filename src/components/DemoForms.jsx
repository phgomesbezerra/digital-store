import { DEMO_PROFILE } from "../services/demoProfile";
export function DemoNote() {
  return (
    <p className="demo-strip">
      Demonstração acadêmica · Use só dados inventados. Salvos apenas neste
      navegador, sem envio ou cobrança.
    </p>
  );
}
export function DemoField({
  label,
  field,
  required = true,
  profile = DEMO_PROFILE,
  onChange,
}) {
  const editable = Boolean(onChange);
  return (
    <label className="demo-field">
      {label}
      {required ? " *" : ""}
      <input
        name={field}
        readOnly={!editable}
        required={editable && required}
        value={profile[field] ?? ""}
        onChange={
          editable
            ? (e) => onChange({ ...profile, [field]: e.target.value })
            : undefined
        }
        maxLength={field === "email" ? 120 : 160}
        type={editable && field === "email" ? "email" : "text"}
        autoComplete="off"
        spellCheck={false}
        aria-label={`${label} fictício`}
        placeholder={`Digite ${label.toLowerCase()} de exemplo`}
      />
    </label>
  );
}
export function PersonalFields({ profile, onChange }) {
  return (
    <section className="form-card">
      <h2>Informações Pessoais</h2>
      {[
        ["Nome Completo", "nome"],
        ["CPF", "cpf"],
        ["E-mail", "email"],
        ["Celular", "celular"],
      ].map(([label, field]) => (
        <DemoField
          key={field}
          label={label}
          field={field}
          profile={profile}
          onChange={onChange}
        />
      ))}
    </section>
  );
}
export function DeliveryFields({ profile, onChange }) {
  return (
    <section className="form-card">
      <h2>Informações de Entrega</h2>
      {[
        ["Endereço", "endereco"],
        ["Bairro", "bairro"],
        ["Cidade", "cidade"],
        ["CEP", "cep"],
        ["Complemento", "complemento"],
      ].map(([label, field]) => (
        <DemoField
          key={field}
          label={label}
          field={field}
          profile={profile}
          onChange={onChange}
          required={field !== "complemento"}
        />
      ))}
    </section>
  );
}
export function ProfileDetails({ payment, profile = DEMO_PROFILE }) {
  const p = profile;
  return (
    <>
      <section className="detail-section">
        <h2>Informações Pessoais</h2>
        <p>
          <span>Nome:</span> {p.nome}
        </p>
        <p>
          <span>CPF:</span> {p.cpf}
        </p>
        <p>
          <span>Email:</span> {p.email}
        </p>
        <p>
          <span>Celular:</span> {p.celular}
        </p>
      </section>
      <section className="detail-section">
        <h2>Informações de Entrega</h2>
        <p>
          <span>Endereço:</span> {p.endereco}
        </p>
        <p>
          <span>Bairro:</span> {p.bairro}
        </p>
        <p>
          <span>Cidade:</span> {p.cidade}
        </p>
        <p>
          <span>CEP:</span> {p.cep}
        </p>
      </section>
      {payment && (
        <section className="detail-section">
          <h2>Informações de Pagamento</h2>
          <p>
            {payment === "boleto"
              ? "Boleto de demonstração. Nenhum documento bancário emitido."
              : `Titular ilustrativo: ${DEMO_PROFILE.titular}`}
          </p>
          {payment !== "boleto" && (
            <p>
              <span>Cartão de exemplo:</span> {DEMO_PROFILE.cartao}
            </p>
          )}
        </section>
      )}
    </>
  );
}
