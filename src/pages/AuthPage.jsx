import { useState } from "react";
import { Link } from "react-router";
import {
  MAX_DEMO_ACCOUNTS,
  addAccount,
  addExamples,
  clearAccounts,
  findAccount,
  loadAccounts,
  removeAccount,
} from "../services/demoAccounts";

export default function AuthPage({ mode }) {
  const isSignup = mode === "cadastro";
  const [accounts, setAccounts] = useState(loadAccounts);
  const [message, setMessage] = useState(null);

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "");
    if (isSignup) {
      const result = addAccount(String(data.get("nome") ?? ""), email);
      setAccounts(result.list);
      if (result.ok) {
        form.reset();
        setMessage({ ok: true, text: `Cadastro de demonstração salvo neste navegador (${result.list.length} de ${MAX_DEMO_ACCOUNTS}). Não é uma conta real.` });
      } else if (result.reason === "duplicado") {
        setMessage({ ok: false, text: "Esse e-mail de exemplo já está cadastrado." });
      } else if (result.reason === "limite") {
        setMessage({ ok: false, text: `Limite de ${MAX_DEMO_ACCOUNTS} cadastros de demonstração atingido. Remova um para cadastrar outro.` });
      } else {
        setMessage({ ok: false, text: "Este navegador não permite salvar dados locais (modo privado?). Nada foi salvo." });
      }
    } else {
      const found = findAccount(email);
      setMessage(
        found
          ? { ok: true, text: `Login de demonstração: encontrei o cadastro de exemplo de ${found.nome}. Ninguém foi autenticado de verdade, não há senha.` }
          : { ok: false, text: "Nenhum cadastro de demonstração com esse e-mail neste navegador. Faça o cadastro primeiro." },
      );
    }
  }

  return (
    <div className="container auth">
      <h1>{isSignup ? "Cadastre-se" : "Entrar"}</h1>
      <p>
        {isSignup
          ? `Demonstração: até ${MAX_DEMO_ACCOUNTS} cadastros de exemplo ficam salvos só neste navegador, mesmo depois de fechar a página.`
          : "Demonstração: confere se o e-mail está entre os cadastros de exemplo salvos neste navegador. Não há senha."}
      </p>
      <p className="auth-warning">
        Não digite dados reais. Não existe servidor, senha nem conta de
        verdade, e os cadastros não passam para outros computadores.
      </p>
      <form className="auth-form" onSubmit={submit}>
        {isSignup && (
          <label>
            Nome de exemplo
            <input name="nome" autoComplete="off" placeholder="Ex.: Maria Exemplo" required />
          </label>
        )}
        <label>
          E-mail de exemplo
          <input name="email" type="email" autoComplete="off" placeholder="exemplo@exemplo.com" required />
        </label>
        <button className="button" type="submit">
          {isSignup ? "Cadastrar (demonstração)" : "Entrar (demonstração)"}
        </button>
      </form>
      {message && (
        <div className={message.ok ? "auth-done" : "auth-done auth-error"} role="status">
          <p>{message.text}</p>
        </div>
      )}
      {isSignup && (
        <section className="auth-list" aria-label="Cadastros de demonstração salvos">
          <h2>
            Cadastros salvos ({accounts.length} de {MAX_DEMO_ACCOUNTS})
          </h2>
          {accounts.length === 0 ? (
            <p>Nenhum ainda.</p>
          ) : (
            <ul>
              {accounts.map((a) => (
                <li key={a.email}>
                  <span>
                    {a.nome} <small>{a.email}</small>
                  </span>
                  <button type="button" onClick={() => setAccounts(removeAccount(a.email))}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="auth-actions">
            <button type="button" onClick={() => { setAccounts(addExamples()); setMessage({ ok: true, text: "Exemplos fictícios adicionados até completar 5." }); }} disabled={accounts.length >= MAX_DEMO_ACCOUNTS}>
              Adicionar exemplos fictícios
            </button>
            <button type="button" onClick={() => { setAccounts(clearAccounts()); setMessage(null); }} disabled={accounts.length === 0}>
              Limpar todos
            </button>
          </div>
        </section>
      )}
      <p>
        <Link to={isSignup ? "/login" : "/cadastro"}>
          {isSignup ? "Já cadastrou? Entrar" : "Não tem cadastro? Cadastre-se"}
        </Link>
      </p>
    </div>
  );
}
