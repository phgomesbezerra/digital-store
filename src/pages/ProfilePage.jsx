import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  loadProfile,
  updateProfile,
  enterDemo,
  leaveDemo,
  PROFILE_CHANGED,
  DEMO_PROFILE,
} from "../services/demoProfile";
import {
  loadAccounts,
  deleteAccount,
  ACCOUNT_ERRORS,
  ACCOUNTS_CHANGED,
} from "../services/demoAccounts";
import {
  DemoNote,
  ProfileDetails,
  PersonalFields,
  DeliveryFields,
} from "../components/DemoForms";
export default function ProfilePage() {
  const { pathname } = useLocation(),
    navigate = useNavigate();
  const [profile, setProfile] = useState(loadProfile),
    [accounts, setAccounts] = useState(loadAccounts),
    [draft, setDraft] = useState(() => loadProfile() ?? {}),
    [editing, setEditing] = useState(false),
    [message, setMessage] = useState(""),
    [deleting, setDeleting] = useState(false);
  const payment = pathname.endsWith("pagamentos");
  useEffect(() => {
    const sync = () => {
      setProfile(loadProfile());
      setAccounts(loadAccounts());
    };
    window.addEventListener(PROFILE_CHANGED, sync);
    window.addEventListener(ACCOUNTS_CHANGED, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(PROFILE_CHANGED, sync);
      window.removeEventListener(ACCOUNTS_CHANGED, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  if (!profile)
    return (
      <div className="container empty">
        <h1>Meu Perfil</h1>
        <p>
          Escolha um cadastro fictício ou crie até 5 exemplos neste navegador.
        </p>
        <Link className="button" to="/login">
          Escolher cadastro
        </Link>
      </div>
    );
  function save(e) {
    e.preventDefault();
    const result = updateProfile(draft, profile.email);
    if (result.ok) {
      setProfile(result.profile);
      setEditing(false);
      setMessage("Informações de exemplo salvas neste navegador.");
    } else setMessage(ACCOUNT_ERRORS[result.reason]);
  }
  function remove() {
    const result = deleteAccount(profile.email);
    if (!result.ok) {
      setMessage(ACCOUNT_ERRORS.indisponivel);
      return;
    }
    leaveDemo();
    navigate("/login");
  }
  return (
    <div className="container profile-page">
      <DemoNote />
      <div className="profile-grid">
        <aside className="profile-menu">
          <h2>Meu Perfil</h2>
          <Link to="/pedidos">Meus Pedidos</Link>
          <Link className={!payment ? "selected" : ""} to="/perfil">
            Minhas Informações
          </Link>
          <Link className={payment ? "selected" : ""} to="/perfil/pagamentos">
            Métodos de Pagamento
          </Link>
          <div className="account-picker">
            <label>
              Cadastro selecionado
              <select
                value={profile.email}
                onChange={(e) => {
                  if (enterDemo(e.target.value)) {
                    setEditing(false);
                    setDeleting(false);
                    setMessage("");
                  } else setMessage("Não foi possível trocar o cadastro.");
                }}
              >
                {!accounts.some((a) => a.email === profile.email) && (
                  <option value={profile.email}>
                    {profile.nome} (exemplo inicial)
                  </option>
                )}
                {accounts.map((a) => (
                  <option key={a.email} value={a.email}>
                    {a.nome}
                  </option>
                ))}
              </select>
            </label>
            <p>{accounts.length}/5 cadastros locais</p>
            <Link to="/cadastro">Criar outro exemplo</Link>
            <button className="text-link" onClick={() => navigate("/login")}>
              Ver todos / trocar conta
            </button>
          </div>
        </aside>
        <section className="profile-content">
          <div className="profile-heading">
            <h1>{payment ? "Métodos de Pagamento" : "Minhas Informações"}</h1>
            {!payment && (
              <button
                className="text-link"
                onClick={() => {
                  setDraft(profile);
                  setEditing(!editing);
                  setMessage("");
                  setDeleting(false);
                }}
              >
                {editing ? "Cancelar" : "Editar"}
              </button>
            )}
          </div>
          {payment ? (
            <>
              <ProfileDetails payment="cartao" profile={profile} />
              <p>
                Cartão mascarado ilustrativo. Não é possível cadastrar números,
                validade ou CVV reais.
              </p>
            </>
          ) : editing ? (
            <form onSubmit={save}>
              <PersonalFields profile={draft} onChange={setDraft} />
              <DeliveryFields profile={draft} onChange={setDraft} />
              <button
                type="button"
                className="text-link fill-example"
                onClick={() =>
                  setDraft({ ...DEMO_PROFILE, email: draft.email })
                }
              >
                Preencher dados fictícios de exemplo
              </button>
              <button className="button wide">Salvar alterações</button>
            </form>
          ) : (
            <ProfileDetails profile={profile} />
          )}
          <div className="account-delete">
            {deleting ? (
              <>
                <p>
                  Excluir este cadastro fictício deste navegador? Recibos
                  anteriores permanecem como histórico da simulação e podem ser
                  removidos em Meus Pedidos.
                </p>
                <button className="button" onClick={remove}>
                  Confirmar exclusão do cadastro
                </button>
                <button
                  className="text-link"
                  onClick={() => setDeleting(false)}
                >
                  Cancelar exclusão
                </button>
              </>
            ) : (
              <button className="text-link" onClick={() => setDeleting(true)}>
                Excluir cadastro
              </button>
            )}
          </div>
          {message && <p role="status">{message}</p>}
        </section>
      </div>
    </div>
  );
}
