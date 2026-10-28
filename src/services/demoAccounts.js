// Exercício local: até cinco personagens fictícios. Sem servidor ou autenticação.
export const MAX_DEMO_ACCOUNTS = 5;
const KEY = "digital-store-cadastros-demo";
export const ACCOUNTS_CHANGED = "digital-store-accounts-changed";
export const PROFILE_FIELDS = [
  "nome",
  "email",
  "cpf",
  "celular",
  "endereco",
  "bairro",
  "cidade",
  "cep",
  "complemento",
];
export const EXAMPLES = ["Maria", "João", "Ana", "Carlos", "Lúcia"].map(
  (nome, i) => ({
    nome: `${nome} Exemplo`,
    email: `${["maria", "joao", "ana", "carlos", "lucia"][i]}@exemplo.com`,
  }),
);
export function cleanProfile(data) {
  return Object.fromEntries(
    PROFILE_FIELDS.map((k) => [
      k,
      String(data?.[k] ?? "")
        .trim()
        .slice(0, k === "email" ? 120 : 160),
    ]).map(([k, v]) => [k, k === "email" ? v.toLowerCase() : v]),
  );
}
export function loadAccounts() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(list)
      ? list
          .filter(
            (a) =>
              a && typeof a.nome === "string" && typeof a.email === "string",
          )
          .slice(0, 5)
          .map(cleanProfile)
      : [];
  } catch {
    return [];
  }
}
function save(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    window.dispatchEvent(new Event(ACCOUNTS_CHANGED));
    return true;
  } catch {
    return false;
  }
}
export function storeAccount(data, previousEmail) {
  const profile = cleanProfile(data),
    list = loadAccounts();
  const index = previousEmail
    ? list.findIndex((a) => a.email === previousEmail.toLowerCase())
    : -1;
  if (!profile.nome || !/^\S+@\S+\.\S+$/.test(profile.email))
    return { ok: false, reason: "dados", list };
  if (list.some((a, i) => a.email === profile.email && i !== index))
    return { ok: false, reason: "duplicado", list };
  if (index < 0 && list.length >= 5)
    return { ok: false, reason: "limite", list };
  const next =
    index < 0
      ? [...list, profile]
      : list.map((a, i) => (i === index ? profile : a));
  if (!save(next)) return { ok: false, reason: "indisponivel", list };
  return { ok: true, list: next, profile };
}
export function addAccount(nome, email) {
  return storeAccount({ nome, email });
}
export function addExamples() {
  let list = loadAccounts();
  for (const example of EXAMPLES) {
    if (list.length >= 5) break;
    if (!list.some((a) => a.email === example.email))
      list = [...list, cleanProfile(example)];
  }
  save(list);
  return list;
}
export function deleteAccount(email) {
  const list = loadAccounts().filter((a) => a.email !== email);
  return { ok: save(list), list };
}
export function removeAccount(email) {
  return deleteAccount(email).list;
}
export function clearAccounts() {
  return save([]) ? [] : loadAccounts();
}
export function findAccount(email) {
  return loadAccounts().find((a) => a.email === email.trim().toLowerCase());
}
export const ACCOUNT_ERRORS = {
  duplicado:
    "Já existe um exemplo com este e-mail. Escolha outro ou entre na conta existente.",
  limite:
    "Limite de 5 cadastros atingido. Exclua um exemplo em Meu Perfil para criar outro.",
  dados: "Informe nome e e-mail fictícios válidos.",
  indisponivel:
    "Não foi possível salvar neste navegador. Seus dados anteriores foram mantidos.",
};
