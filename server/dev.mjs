// Sobe o Vite e a API local juntos, sem npm.cmd, shell ou dependências extras.
// Uso: npm run dev:full (Windows/PowerShell, macOS e Linux).
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const scripts = [
  ["Vite", new URL("../node_modules/vite/bin/vite.js", import.meta.url)],
  ["API", new URL("./dev-api.mjs", import.meta.url)],
];
const children = [];
let stopping = false;

function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  process.exitCode = code;
  for (const child of children) {
    if (child.exitCode === null && child.signalCode === null) child.kill();
  }
}

for (const [name, script] of scripts) {
  // process.execPath é o Node que já está executando este arquivo.
  // Argumentos separados e caminhos absolutos também aceitam pastas com espaços.
  const child = spawn(process.execPath, [fileURLToPath(script)], {
    cwd: projectRoot,
    stdio: "inherit",
    shell: false,
  });
  children.push(child);
  child.on("error", (error) => {
    console.error(`Não foi possível iniciar ${name}: ${error.message}`);
    shutdown(1);
  });
  child.on("exit", (code) => {
    if (!stopping) shutdown(code ?? 1);
  });
}

process.on("SIGINT", () => shutdown());
process.on("SIGTERM", () => shutdown());
