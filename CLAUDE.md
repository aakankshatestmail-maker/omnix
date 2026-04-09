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

## Structure

Entry point is `src/main.jsx` → `App.jsx`. Global styles live in `src/index.css` (design tokens as CSS custom properties on `:root`, with a `prefers-color-scheme: dark` override). Component-scoped styles live alongside components (e.g. `App.css`). The `#root` element is styled as a centered 1126px max-width column in `index.css`.
