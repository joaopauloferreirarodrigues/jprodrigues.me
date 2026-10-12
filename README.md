# 🛡️ jprodrigues.me: Portfólio Profissional 👨‍💻

> [!NOTE]
> Portfólio pessoal de **João Paulo Ferreira Rodrigues**, estudante de Engenharia de Software na PUC Minas com foco em **governança, riscos e compliance (GRC) em segurança da informação**. O site reúne trajetória, projetos, experiências e contato, em português e inglês.

---

## 🚧 Status do Projeto

![Versão](https://img.shields.io/badge/Versão-v1.0.0-5cc8d7?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.3-5cc8d7?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.3-5cc8d7?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-5cc8d7?style=for-the-badge&logo=vercel&logoColor=white)
![Licença](https://img.shields.io/badge/Licença-MIT-5cc8d7?style=for-the-badge)

---

## 📚 Índice

- [Links Úteis](#-links-úteis)
- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura](#-arquitetura)
- [Instalação e Execução](#-instalação-e-execução)
- [Deploy](#-deploy)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Demonstração](#-demonstração)
- [Documentações utilizadas](#-documentações-utilizadas)
- [Autor](#-autor)
- [Agradecimentos](#-agradecimentos)
- [Licença](#-licença)

---

## 🔗 Links Úteis

- 🌐 **Site publicado:** [jprodrigues.me](https://jprodrigues.me)
- 🐙 **Repositório:** [github.com/joaopauloferreirarodrigues/jprodrigues.me](https://github.com/joaopauloferreirarodrigues/jprodrigues.me)

---

## 📝 Sobre o Projeto

Este site foi desenvolvido no **Laboratório 01** da disciplina **Desenvolvimento e Integração de Aplicações Web (DIAW)**, do curso de Engenharia de Software da PUC Minas, sob orientação do Prof. João Paulo Carneiro Aramuni.

**Por que existe:** reunir em um só endereço quem eu sou, o que já construí e como falar comigo, em vez de espalhar essas informações entre GitHub, LinkedIn e currículo.

**Qual problema resolve:** recrutadores, professores e colegas conseguem entender minha trajetória (de Administração para Engenharia de Software, com foco em GRC) em poucos minutos, ver os projetos funcionando e entrar em contato sem sair da página.

**Identidade visual:** o site usa um azul-tinta escuro com acento ciano e a família tipográfica IBM Plex (Sans para textos, Mono para dados), uma linguagem visual próxima de painéis de monitoramento e relatórios de auditoria. A trajetória aparece como um pequeno registro de status (`[concluído]`, `[em curso]`, `[foco]`), em referência aos logs que fazem parte do dia a dia de segurança.

---

## ✨ Funcionalidades Principais

- 👤 **Sobre mim:** apresentação, trajetória em formato de log e tecnologias.
- 📂 **Projetos:** linha do tempo do mais antigo ao mais recente, com descrição, tecnologias, link do GitHub e imagem/GIF de cada projeto.
- 🏢 **Experiências:** atuação profissional e extensão, com instituição, atividade, período e descrição.
- 📨 **Contato:** ícones clicáveis (e-mail, WhatsApp, LinkedIn, GitHub) e formulário com validação que envia e-mail pelo **EmailJS**: uma notificação para mim e uma confirmação para quem enviou.
- 🌐 **Internacionalização (i18n):** português e inglês, com a escolha salva para a próxima visita.
- 📱 **Design responsivo:** layout adaptado para celular, tablet e desktop.
- ♿ **Acessibilidade:** navegação por teclado, foco visível, link para pular ao conteúdo, mensagens de erro anunciadas por leitores de tela e respeito à preferência de reduzir animações.
- 🃏 **Easter egg:** existe uma carta escondida no site. Dica: o escudo do logo gosta de cliques. 😉

---

## 🛠 Tecnologias Utilizadas

### 💻 Front-end

- **Biblioteca:** React 19.3
- **Linguagem:** JavaScript (ES2022+), HTML5, CSS3
- **Estilização:** CSS puro com design tokens (variáveis CSS), sem framework
- **Build Tool:** Vite 8.3
- **Lint:** oxlint 1.87

### 📦 Dependências

| Pacote | Versão | Para que serve |
| --- | --- | --- |
| `react` / `react-dom` | 19.3.0 | Construção da interface |
| `i18next` + `react-i18next` | 26.4.4 / 17.0.16 | Textos em português e inglês |
| `react-hook-form` | 7.90.0 | Estado e validação do formulário de contato |
| `@emailjs/browser` | 5.0.3 | Envio de e-mail direto do front-end |
| `react-icons` | 5.7.0 | Ícones de GitHub, LinkedIn, WhatsApp e e-mail |
| `@fontsource/ibm-plex-sans` / `@fontsource/ibm-plex-mono` | 5.3.0 | Fontes servidas pelo próprio site, sem depender do Google Fonts |
| `vite` + `@vitejs/plugin-react` | 8.3.4 / 6.1.2 | Servidor de desenvolvimento e build de produção (dev) |
| `oxlint` | 1.87.0 | Análise estática do código (dev) |

### ⚙️ Infraestrutura

- **Hospedagem:** Vercel (plano gratuito), com deploy automático a cada `git push`
- **Domínio:** `jprodrigues.me`, registrado gratuitamente pela Namecheap através do GitHub Student Developer Pack
- **E-mail:** EmailJS (plano gratuito)

---

## 🏗 Arquitetura

O portfólio é uma **SPA (Single Page Application) estática**, sem back-end próprio. Todo o código roda no navegador; a Vercel apenas entrega os arquivos gerados pelo `vite build`.

```
Visitante ──HTTPS──▶ Vercel (CDN) ──entrega──▶ dist/ (HTML, CSS, JS, fontes)
                                                   │
                                     roda no navegador como SPA React
                                                   │
                         formulário de contato ──▶ EmailJS ──▶ e-mail para mim
                                                           └─▶ confirmação para o remetente
```

**Decisões e por quê:**

- **Sem back-end próprio.** Todos os requisitos (conteúdo, linha do tempo, idiomas, envio de e-mail) funcionam no front-end, e o envio de e-mail é resolvido pelo EmailJS, sugerido no enunciado. Um servidor só traria custo e um ponto a mais de falha. É a mesma arquitetura do portfólio de referência do professor.
- **Uma página com seções.** O enunciado pede seções acessadas por um menu de navegação. Uma página só, com âncoras e destaque da seção visível, deixa o site rápido, funciona sem configuração de rotas no servidor e é fácil de ler no celular.
- **Conteúdo separado da interface.** Projetos, experiências e dados de contato ficam em `src/data/`, com os textos em português e inglês lado a lado. Para incluir um projeto novo, basta acrescentar um objeto na lista, sem mexer nos componentes.
- **Design tokens.** Cores, fontes e espaçamentos são variáveis CSS em `src/styles/tokens.css`. Os componentes usam apenas `var(--token)`, então uma mudança de cor vale para o site inteiro.
- **Chaves só por variável de ambiente.** As chaves do EmailJS não ficam no código: são lidas de `VITE_*` no build. São chaves públicas por natureza, porque o EmailJS foi feito para rodar no navegador, mas ficam fora do repositório para facilitar a troca.

**Componentes principais:**

| Componente | Papel |
| --- | --- |
| `Header` | Logo, menu de navegação com a seção atual destacada e troca de idioma |
| `About` | Apresentação, foto, trajetória em formato de log e tecnologias |
| `Projects` | Linha do tempo de projetos |
| `Experiences` | Lista de experiências |
| `Contact` | Canais de contato e formulário com validação e envio |
| `SecretCard` | Easter egg aberto com 5 cliques no logo ou com o código Konami |
| `useActiveSection` | Hook que usa `IntersectionObserver` para saber qual seção está na tela |
| `useLocalized` | Hook que escolhe o texto `{ pt, en }` no idioma atual |

---

## 🔧 Instalação e Execução

### Pré-requisitos

- **Node.js** 20.19+ ou 22.12+ (exigência do Vite 8)
- **npm** (já vem com o Node.js)
- **Git**

### 📦 Instalação de Dependências

```bash
git clone https://github.com/joaopauloferreirarodrigues/jprodrigues.me.git
cd jprodrigues.me
npm install
```

### 🔑 Variáveis de Ambiente

O formulário de contato usa o EmailJS. Copie o arquivo de exemplo e preencha com os dados do [painel do EmailJS](https://dashboard.emailjs.com/admin):

```bash
cp .env.example .env.local
```

| Variável | Descrição |
| --- | --- |
| `VITE_EMAILJS_SERVICE_ID` | ID do serviço de e-mail conectado (Gmail, Outlook etc.) |
| `VITE_EMAILJS_TEMPLATE_ID_FOR_ME` | Template da notificação que chega para mim |
| `VITE_EMAILJS_TEMPLATE_ID_FOR_SENDER` | Template da confirmação enviada a quem preencheu o formulário (opcional) |
| `VITE_EMAILJS_PUBLIC_KEY` | Public Key da conta do EmailJS |

> [!TIP]
> Sem essas variáveis o site funciona normalmente; o formulário apenas avisa que o envio ainda não está configurado.

Os templates recebem as variáveis `{{name}}`, `{{email}}`, `{{message}}`, `{{time}}` e `{{title}}`. No template da notificação, o campo **To Email** é o meu e-mail; no de confirmação, é `{{email}}`.

### ⚡ Como Executar

```bash
npm run dev       # servidor de desenvolvimento em http://localhost:5173
npm run build     # gera a versão de produção em dist/
npm run preview   # serve a pasta dist/ em http://localhost:4173
npm run lint      # análise estática com oxlint
```

---

## 🚀 Deploy

O site está hospedado na **Vercel** e publicado no domínio **jprodrigues.me**.

1. Em [vercel.com/new](https://vercel.com/new), importe este repositório do GitHub. A Vercel detecta o Vite sozinha (build `npm run build`, pasta `dist`).
2. Em **Settings → Environment Variables**, cadastre as quatro variáveis `VITE_EMAILJS_*` e faça um novo deploy.
3. **Domínio:** o `.me` foi registrado na Namecheap com o benefício do GitHub Student Developer Pack. Em **Settings → Domains** da Vercel, adicione `jprodrigues.me` e copie os registros DNS indicados para o painel da Namecheap (**Domain List → Manage → Advanced DNS**).
4. A partir daí, cada `git push` na branch `main` publica uma nova versão, e cada pull request ganha um link de pré-visualização.

---

## 📂 Estrutura de Pastas

```
.
├── docs/
│   └── screenshots/         # 🖼️ Capturas usadas neste README
├── public/
│   ├── favicon.svg          # 🛡️ Ícone do site
│   ├── images/              # 📷 Foto de perfil
│   └── projetos/            # 🎞️ Imagens e GIFs dos projetos
├── src/
│   ├── components/          # 🧱 Um componente (.jsx + .css) por seção
│   │   ├── Header.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Experiences.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── SecretCard.jsx   # 🃏 Easter egg
│   │   └── Shield.jsx       # Escudo do logo
│   ├── config/
│   │   └── emailJsConfig.js # 📨 Lê as variáveis do EmailJS
│   ├── data/                # 📄 Conteúdo do site em pt e en
│   │   ├── profile.js       # Nome, foto, tecnologias e links
│   │   ├── projects.js      # Linha do tempo de projetos
│   │   ├── experiences.js   # Experiências
│   │   └── sections.js      # Seções do menu
│   ├── hooks/               # 🎣 useActiveSection, useKonamiCode, useLocalized
│   ├── styles/
│   │   ├── tokens.css       # 🎨 Cores, fontes e espaçamentos
│   │   └── global.css       # Estilos base e utilitários
│   ├── i18n.js              # 🌐 Textos da interface em pt e en
│   ├── App.jsx              # Monta a página
│   └── main.jsx             # Ponto de entrada (fontes, i18n, estilos)
├── .env.example             # 🧩 Modelo das variáveis de ambiente
├── .oxlintrc.json           # ✨ Regras do lint
├── index.html               # HTML base e metatags
├── LICENSE                  # ⚖️ MIT
├── package.json
└── vite.config.js
```

---

## 🎥 Demonstração

| Tela | Captura |
| --- | --- |
| **Página inicial (desktop)** | ![Página inicial no desktop](docs/screenshots/home-desktop.png) |
| **Página inicial (celular)** | ![Página inicial no celular](docs/screenshots/home-mobile.png) |
| **Validação do formulário** | ![Formulário de contato com mensagens de validação](docs/screenshots/contato-validacao.png) |
| **Easter egg** | ![Carta secreta aberta](docs/screenshots/easter-egg.png) |

---

## 🔗 Documentações utilizadas

- 📖 [React](https://react.dev/reference/react)
- 📖 [Vite](https://vite.dev/config/)
- 📖 [react-i18next](https://react.i18next.com/)
- 📖 [React Hook Form](https://react-hook-form.com/docs)
- 📖 [EmailJS](https://www.emailjs.com/docs/)
- 📖 [Vercel: domínios personalizados](https://vercel.com/docs/domains)
- 📖 [Template de README do Prof. João Paulo Aramuni](https://github.com/joaopauloaramuni/desenvolvimento-e-integracao-de-aplicacoes-web/blob/main/TEMPLATES/template_README.md)

---

## 👤 Autor

| Nome | GitHub |
| --- | --- |
| João Paulo Ferreira Rodrigues | [@joaopauloferreirarodrigues](https://github.com/joaopauloferreirarodrigues) |

---

## 🙏 Agradecimentos

- [**Engenharia de Software PUC Minas**](https://www.instagram.com/engsoftwarepucminas/), pelo apoio institucional e pela estrutura acadêmica.
- [**Prof. Dr. João Paulo Aramuni**](https://github.com/joaopauloaramuni), pela proposta do laboratório, pelo template de README e pelo [portfólio de referência](https://github.com/joaopauloaramuni/joaopauloaramuni-portfolio).

---

## 📄 Licença

Este projeto é distribuído sob a [Licença MIT](LICENSE).
