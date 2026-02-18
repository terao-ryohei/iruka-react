---
description: Scaffold a new feature directory with standard structure
argument-hint: "[featureName]"
---

Scaffold a new feature module under `src/features/` following iruka-react conventions.

## Arguments

`$ARGUMENTS` = feature name in lowercase (e.g. `notifications`)

## Directory Structure

Create the following files under `src/features/$ARGUMENTS/`:

### 1. `components/.gitkeep`

Empty file to preserve the directory in git.

### 2. `hooks/index.ts`

```ts
// Feature hooks will be exported here
```

### 3. `api/index.ts`

```ts
// Feature API functions will be exported here
```

### 4. `types.ts`

```ts
// Feature types will be defined here
```

### 5. `index.ts`

```ts
// Public API of the $ARGUMENTS feature
// Export components, hooks, and types as they are created
```

## Conventions

- Feature name should be plural and lowercase (e.g. `notifications`, `products`, `settings`)
- Components go in `components/` — each complex component gets its own subdirectory (e.g. `components/NotificationCard/NotificationCard.tsx`)
- Hooks go in `hooks/` — Zustand stores as `use*Store.ts`, React Query hooks as `use*.ts`
- API functions go in `api/` — separate files for queries and mutations
- `index.ts` is the public API — only export what other features need
- `types.ts` defines domain types for this feature

## After Generation

Report the list of created files:
```
Created src/features/$ARGUMENTS/:
  - components/.gitkeep
  - hooks/index.ts
  - api/index.ts
  - types.ts
  - index.ts
```
