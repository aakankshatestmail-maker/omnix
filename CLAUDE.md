# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint across the repo

There is no test runner configured.

## Stack

- React 19 + Vite 8 (JavaScript, not TypeScript; files are `.jsx`)
- `@vitejs/plugin-react` (Oxc-based, not SWC)
- Tailwind CSS v4 via `@tailwindcss/vite` — configured in `vite.config.js`, imported at the top of `src/index.css` with `@import "tailwindcss";`. No `tailwind.config.js` / PostCSS config — Tailwind v4 is zero-config and theme customization is done in CSS.
- ESLint flat config (`eslint.config.js`) with `js.configs.recommended`, `react-hooks`, and `react-refresh/vite`. Notable rule: `no-unused-vars` ignores identifiers matching `^[A-Z_]` (so unused PascalCase/CONST names do not error).

## Key dependencies

- `react-router-dom` v7 — routing is declared in `src/main.jsx`, not `App.jsx`. `App.jsx` is just the marketing landing page mounted at `/`; the authed app lives under `/dashboard/*`.
- `@assistant-ui/react` — chat UI primitives, used by `src/components/chat/`.
- `lucide-react` — icon set used throughout the dashboard.
- `@fontsource-variable/geist` — imported once in `main.jsx`; do not re-import per-component.

## Structure

Entry point is `src/main.jsx`. It wraps everything in `BrowserRouter` and declares routes:
- `/` → `App.jsx` (landing: Navbar, Hero, PillarsScroll, HowItWorks, Channels, CtaBanner, Footer, AuthModal)
- `/dashboard`, `/dashboard/chats`, `/dashboard/artifacts`, `/dashboard/jobs`, `/dashboard/profile` → page components in `src/pages/`

Dashboard pages share chrome via `src/pages/DashboardLayout.jsx` (sidebar, account menu, SettingsModal). When adding a new dashboard route, register it in `main.jsx` and render it inside `DashboardLayout`. Mock chat data lives in `src/pages/mockChats.js`.

Landing-page sections live in `src/components/` as flat `.jsx` files; pillar content is data-driven from `src/components/pillarData.js`.

Global styles and design tokens (CSS custom properties on `:root`, with a `prefers-color-scheme: dark` override) live in `src/index.css`. The `#root` element is a centered 1126px max-width column — landing-page sections inherit this width, but dashboard pages typically break out of it. Component-scoped styles sit alongside their component (e.g. `App.css`).

## Asset generation

`scripts/*.mjs` are one-off Node scripts that generate static assets in `public/` (logo expressions, hero video frames, pillar images). They are not wired into `npm` scripts — run them directly with `node scripts/<name>.mjs` when regenerating assets. Generated output is committed.
