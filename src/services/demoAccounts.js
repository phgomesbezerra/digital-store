// Cadastros de demonstração guardados só no navegador (localStorage).
// Não existe servidor, senha nem autenticação real.
export const MAX_DEMO_ACCOUNTS = 5;
const KEY = "digital-store-cadastros-demo";

export const EXAMPLES = [
  { nome: "Maria Exemplo", email: "maria@exemplo.com" },
  { nome: "João Exemplo", email: "joao@exemplo.com" },
  { nome: "Ana Exemplo", email: "ana@exemplo.com" },
  { nome: "Carlos Exemplo", email: "carlos@exemplo.com" },
  { nome: "Lúcia Exemplo", email: "lucia@exemplo.com" },
];

export function loadAccounts() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(list) ? list.slice(0, MAX_DEMO_ACCOUNTS) : [];
  } catch {
    return [];
  }
}

function save(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

export function addAccount(nome, email) {
  const list = loadAccounts();
  const mail = email.trim().toLowerCase();
  if (list.some((a) => a.email === mail)) return { ok: false, reason: "duplicado", list };
  if (list.length >= MAX_DEMO_ACCOUNTS) return { ok: false, reason: "limite", list };
  const next = [...list, { nome: nome.trim(), email: mail }];
  if (!save(next)) return { ok: false, reason: "indisponivel", list };
  return { ok: true, list: next };
}

export function addExamples() {
  let list = loadAccounts();
  for (const e of EXAMPLES) {
    if (list.length >= MAX_DEMO_ACCOUNTS) break;
    if (!list.some((a) => a.email === e.email)) list = [...list, e];
  }
  save(list);
  return list;
}

export function removeAccount(email) {
  const next = loadAccounts().filter((a) => a.email !== email);
  save(next);
  return next;
}

export function clearAccounts() {
  save([]);
  return [];
}

export function findAccount(email) {
  const mail = email.trim().toLowerCase();
  return loadAccounts().find((a) => a.email === mail);
}
