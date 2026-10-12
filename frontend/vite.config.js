import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { GITHUB_PATH, handleGitHub } from "./api/_github.js";

// Rota /api/github (painel do GitHub), igual ao projeto GitHubAPI da disciplina:
// no npm run dev / npm run preview quem atende é este middleware;
// em produção, a Vercel Function api/github.js.
// Assim o GITHUB_TOKEN (opcional) fica só no servidor e nunca vai para o navegador.
function githubApi(env) {
  const middleware = (req, res, next) => {
    if (new URL(req.url, "http://localhost").pathname !== GITHUB_PATH) return next();
    handleGitHub(req, res, env).catch(next);
  };

  return {
    name: "github-api",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Prefixo "" lê TODAS as variáveis do .env.local, inclusive as sem VITE_.
  // Isso não as expõe: para o navegador continuam indo só as VITE_*.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), githubApi(env)],
  };
});
