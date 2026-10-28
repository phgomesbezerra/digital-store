import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Logo from "../components/Logo";
import {
  DemoNote,
  PersonalFields,
  DeliveryFields,
} from "../components/DemoForms";
import {
  DEMO_PROFILE,
  enterDemo,
  emptyProfile,
  updateProfile,
} from "../services/demoProfile";
import { loadAccounts, ACCOUNT_ERRORS } from "../services/demoAccounts";
export default function AuthPage({ mode }) {
  const location = useLocation();
  const [profile, setProfile] = useState(() => ({
    ...emptyProfile(),
    email: location.state?.email ?? "",
  }));
  const [email, setEmail] = useState("");
  const accounts = loadAccounts();
  const navigate = useNavigate(),
    signup = mode === "cadastro",
    complete = mode === "formulario";
  const [acknowledged, setAcknowledged] = useState(false);
  const [message, setMessage] = useState(""),
    [offers, setOffers] = useState(false);
  function submit(e) {
    e.preventDefault();
    if (signup) {
      navigate("/cadastro/dados", { state: { email } });
      return;
    }
    if (complete) {
      const result = updateProfile(profile);
      if (result.ok && !result.sessionError) navigate("/perfil");
      else
        setMessage(
          result.sessionError
            ? "Cadastro salvo. Entre com o e-mail escolhido para continuar."
            : ACCOUNT_ERRORS[result.reason],
        );
      return;
    }
    if (enterDemo(email)) navigate("/perfil");
    else
      setMessage(
        "Cadastro não encontrado. Escolha um exemplo salvo abaixo ou crie uma conta fictícia.",
      );
  }

  return (
    <>
      <div className="auth-brand">
        <Logo />
      </div>
      {complete ? (
        <div className="signup-complete">
          <h1>Criar Conta</h1>
          <DemoNote />
          <button
            type="button"
            className="text-link fill-example"
            onClick={() => setProfile({ ...emptyProfile(), ...DEMO_PROFILE })}
          >
            Preencher exemplo fictício
          </button>
          <form onSubmit={submit}>
            <PersonalFields profile={profile} onChange={setProfile} />
            <DeliveryFields profile={profile} onChange={setProfile} />
            <label className="offers">
              <input
                type="checkbox"
                checked={offers}
                onChange={(e) => setOffers(e.target.checked)}
              />{" "}
              Quero receber por email ofertas e novidades das lojas da Digital
              Store. <small>Opção fictícia, sem inscrição ou envio.</small>
            </label>
            <label className="fictional-ack">
              <input
                required
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
              />{" "}
              Estou criando um personagem com dados inventados.
            </label>
            <button className="button wide">Criar Conta</button>
          </form>
          {message && <p role="alert">{message}</p>}
        </div>
      ) : (
        <div className="auth-stage">
          <div className="container auth-scene">
            <section className="auth-panel">
              <h1>{signup ? "Crie sua conta" : "Acesse sua conta"}</h1>
              <p>
                {signup
                  ? "Já possui uma conta? Entre "
                  : "Novo cliente? Então registre-se "}
                <Link to={signup ? "/login" : "/cadastro"}>aqui</Link>.
              </p>
              <DemoNote />
              <form onSubmit={submit}>
                <label className="demo-field">
                  {signup ? "Email" : "Login"} *
                  <input
                    required
                    type="email"
                    maxLength={120}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="personagem@exemplo.invalid"
                    autoComplete="off"
                    aria-label="E-mail fictício"
                  />
                </label>
                {!signup && (
                  <label className="demo-field">
                    Senha *
                    <input
                      readOnly
                      value="••••••••"
                      aria-label="Senha demonstrativa, não editável"
                    />
                  </label>
                )}
                {!signup && (
                  <button
                    type="button"
                    className="text-link forgot"
                    onClick={() =>
                      setMessage(
                        "Não há senha real. Digite o e-mail de um cadastro salvo ou escolha um exemplo abaixo.",
                      )
                    }
                  >
                    Esqueci minha senha
                  </button>
                )}
                <button className="button wide">
                  {signup ? "Criar Conta" : "Acessar Conta"}
                </button>
              </form>
              {!signup && (
                <section className="saved-accounts">
                  <h2>Cadastros neste navegador ({accounts.length}/5)</h2>
                  {accounts.length ? (
                    accounts.map((a) => (
                      <button
                        type="button"
                        key={a.email}
                        onClick={() => {
                          if (enterDemo(a.email)) navigate("/perfil");
                          else
                            setMessage(
                              "Não foi possível iniciar a sessão local.",
                            );
                        }}
                      >
                        {a.nome}
                        <small>{a.email}</small>
                      </button>
                    ))
                  ) : (
                    <p>
                      Nenhum cadastro ainda.{" "}
                      <Link to="/cadastro">Criar conta fictícia</Link>
                    </p>
                  )}
                </section>
              )}
              <div className="social-demo">
                Ou faça login com{" "}
                <button
                  aria-label="Google demonstrativo"
                  onClick={() =>
                    setMessage(
                      "Login social apenas ilustrativo nesta demonstração.",
                    )
                  }
                >
                  G
                </button>
                <button
                  aria-label="Facebook demonstrativo"
                  onClick={() =>
                    setMessage(
                      "Login social apenas ilustrativo nesta demonstração.",
                    )
                  }
                >
                  f
                </button>
              </div>
              {message && <p role="status">{message}</p>}
            </section>
            <img
              className="auth-sneakers"
              src="/design/auth-sneakers.png"
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
}
