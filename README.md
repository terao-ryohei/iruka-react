# React Best Practices Template (2026)

A production-ready React template embodying 2026 best practices. Built with React 19, TypeScript, Vite 7, and a carefully curated modern stack.

## Tech Stack

| Category | Technology | Rationale |
|----------|-----------|-----------|
| UI Library | **React 19.2** | Latest stable with `useActionState`, `use()` hook, ref as prop, React Compiler support |
| Language | **TypeScript 5.9** | Strict mode, erasable syntax, path aliases |
| Build Tool | **Vite 7.3** | ESM native, instant HMR, React Compiler integration via Babel plugin. SPA-first (no SSR lock-in) |
| Routing | **TanStack Router** | Compile-time type-safe route params, search params, and loader data. File-based routing with auto-generated route tree |
| Client State | **Zustand 5** | 1.2KB min+gzip, no Provider needed, TypeScript-first. Middleware: devtools + persist |
| Server State | **TanStack Query 5** | SWR caching, background refetch, mutations, optimistic updates. `queryOptions()` factory pattern |
| Optimization | **React Compiler** | Automatic memoization — eliminates manual `React.memo`/`useMemo`/`useCallback` |
| Unit/Component Test | **Vitest 3 + Testing Library 16** | Shares Vite config, ESM/TS native, Jest-compatible API |
| E2E Test | **Playwright 1.58** | Cross-browser (Chromium, Firefox, WebKit), native parallelism |
| Linter/Formatter | **Biome 2.4** | Single binary replacing 127+ npm packages. 436 lint rules + Prettier-compatible formatter |
| Styling | **CSS Modules** | Zero-config with Vite, scoped class names, no runtime overhead |

## Directory Structure

```
src/
├── app/                    # Root component, providers, router config
│   ├── App.tsx
│   ├── providers.tsx       # QueryClient + DevTools
│   └── router.tsx          # TanStack Router setup + type registration
├── routes/                 # TanStack Router file-based routes
│   ├── __root.tsx          # Root layout
│   ├── index.tsx           # / (home page)
│   ├── _authenticated.tsx  # Auth guard layout route
│   └── _authenticated/
│       ├── dashboard.tsx
│       └── users/
│           ├── index.tsx
│           └── $userId.tsx
├── features/               # Domain-grouped feature modules
│   ├── auth/
│   │   ├── components/     # LoginForm (useActionState demo)
│   │   ├── hooks/          # useAuthStore (Zustand)
│   │   ├── api/            # Mock login API
│   │   ├── types.ts
│   │   └── index.ts        # Shallow barrel export
│   └── users/
│       ├── components/     # UserList, UserDetail, UserCard
│       ├── hooks/          # useUsers, useUser (TanStack Query)
│       ├── api/            # queries.ts (queryOptions factory), usersApi.ts
│       ├── types.ts
│       └── index.ts
├── shared/                 # Cross-cutting shared modules
│   ├── api/                # HTTP client, API types
│   ├── components/         # Reusable UI (used by 3+ features)
│   ├── hooks/              # useDebounce, etc.
│   ├── utils/              # formatDate, truncate, etc.
│   ├── types/              # Utility types
│   └── config/             # env.ts, constants.ts
├── test/
│   └── setup.ts            # Testing Library matchers
└── main.tsx                # Entry point
e2e/                        # Playwright E2E tests
```

### Design Principles

- **Feature-first**: Group by domain, not by technical layer
- **Colocation**: Tests, styles, and types live next to their code
- **Shallow barrels**: One `index.ts` per feature boundary, no nesting
- **Single alias**: `@/` → `src/` only
- **Shared is earned**: Code moves to `shared/` only when used by 3+ features

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check + production build |
| `npm run test` | Run unit/component tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run test:e2e` | Run E2E tests (Playwright) |
| `npm run lint` | Lint + format check (Biome) |
| `npm run lint:fix` | Auto-fix lint/format issues |
| `npm run format` | Format all files |

## React 19 Patterns Used

This template demonstrates the recommended React 19 patterns:

- **`ref` as prop** — `forwardRef` is no longer needed
- **`useActionState`** — Form handling with pending state (see `LoginForm`)
- **Context direct rendering** — No need for `Context.Provider` wrapper
- **React Compiler** — Automatic memoization via Babel plugin (no manual `useMemo`/`useCallback`)

### Patterns Avoided (Deprecated)

- `forwardRef` → use `ref` as a regular prop
- `Context.Provider` → render `Context` directly
- `defaultProps` → use ES default parameters
- Manual `React.memo`/`useMemo`/`useCallback` → handled by React Compiler

## Sample Features

### Auth (Zustand + useActionState)

Mock authentication flow demonstrating:
- Zustand store with `devtools` + `persist` middleware
- React 19 `useActionState` for form submission
- Route guard via TanStack Router `beforeLoad`

### Users (TanStack Query + JSONPlaceholder)

User listing and detail pages demonstrating:
- `queryOptions()` factory pattern for type-safe query definitions
- Custom hooks wrapping `useQuery`
- Loading/error states
- CSS Modules for scoped styling
- Component testing with Vitest + Testing Library

## Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite + React Compiler (Babel plugin) + TanStack Router plugin + path alias |
| `tsconfig.json` | Project references (app + node configs) |
| `tsconfig.app.json` | Strict mode, path mapping `@/` → `src/` |
| `biome.json` | Recommended preset, tab indentation, double quotes |
| `vitest.config.ts` | jsdom environment, globals, Testing Library setup |
| `playwright.config.ts` | Chromium, base URL, web server auto-start |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `https://jsonplaceholder.typicode.com` | API base URL |
