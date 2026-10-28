import { findAccount, cleanProfile, storeAccount } from "./demoAccounts";
const KEY = "digital-store-perfil-demo-v1";
export const PROFILE_CHANGED = "digital-store-profile-changed";
export const DEMO_PROFILE = Object.freeze({
  nome: "Alex Exemplo",
  email: "alex@exemplo.invalid",
  cpf: "000.000.000-00",
  celular: "(00) 00000-0000",
  endereco: "Rua de Exemplo, 100",
  bairro: "Bairro Modelo",
  cidade: "Cidade Exemplo",
  cep: "00000-000",
  complemento: "Endereço fictício",
  titular: "ALEX EXEMPLO",
  cartao: "•••• •••• •••• 0000",
  validade: "MM/AA",
  cvv: "•••",
});
export function emptyProfile() {
  return cleanProfile({});
}
export function loadProfile() {
  try {
    const session = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (session?.email) return findAccount(session.email) ?? null;
    return session?.demo === true ? cleanProfile(DEMO_PROFILE) : null;
  } catch {
    return null;
  }
}
export function enterDemo(email) {
  try {
    const profile = email ? findAccount(email) : null;
    if (!profile) return false;
    localStorage.setItem(
      KEY,
      JSON.stringify({ demo: true, email: profile.email }),
    );
    window.dispatchEvent(new Event(PROFILE_CHANGED));
    return true;
  } catch {
    return false;
  }
}
export function leaveDemo() {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(PROFILE_CHANGED));
    return true;
  } catch {
    return false;
  }
}
export function updateProfile(data, previousEmail) {
  const result = storeAccount(data, previousEmail);
  if (result.ok) {
    if (!enterDemo(result.profile.email))
      return { ...result, sessionError: true };
  }
  return result;
}
