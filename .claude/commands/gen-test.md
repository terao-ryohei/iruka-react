---
description: Generate iruka-react style tests for an existing component or hook
argument-hint: "[filePath]"
---

Generate tests for an existing file following iruka-react conventions.

## Arguments

`$ARGUMENTS` = relative path to the target file (e.g. `src/features/users/components/UserCard/UserCard.tsx`)

## Steps

1. **Read the target file** at `$ARGUMENTS` to understand its exports, props, dependencies, and behavior
2. **Determine the type**: component (`.tsx`) or hook (`use*.ts`)
3. **Generate the test file** as a sibling with `.test.tsx` or `.test.ts` extension

## Component Test Pattern (`.tsx` files)

```tsx
import { describe, expect, it, vi } from "vitest";
import { createMockUser } from "@/test/factories";
import { render, screen } from "@/test/test-utils";
import { ComponentName } from "./ComponentName";

describe("ComponentName", () => {
  it("renders correctly", () => {
    render(<ComponentName /* required props */ />);
    expect(screen.getByText("expected text")).toBeInTheDocument();
  });

  it("handles user interaction", async () => {
    const handler = vi.fn();
    const { user } = render(<ComponentName onSomething={handler} />);
    await user.click(screen.getByRole("button", { name: /label/i }));
    expect(handler).toHaveBeenCalled();
  });
});
```

Rules:
- Import `render`, `screen` from `@/test/test-utils` (NOT from `@testing-library/react`)
- `render()` returns `{ user }` (userEvent instance) in addition to standard RTL returns
- Use `@/test/factories` for mock data — create new factory functions if needed
- Mock `@tanstack/react-router` if the component uses `Link`, `useNavigate`, or `useParams`:
  ```tsx
  vi.mock("@tanstack/react-router", () => ({
    Link: ({ children, to, params, ...props }: Record<string, unknown>) => {
      const href = params && typeof to === "string"
        ? to.replace(/\$(\w+)/g, (_, key) => (params as Record<string, string>)[key] ?? "")
        : (to as string);
      return <a href={href} {...props}>{children as React.ReactNode}</a>;
    },
    useNavigate: () => vi.fn(),
    useParams: () => ({}),
  }));
  ```
- Mock API hooks if the component calls them

## Hook Test Pattern

### Zustand stores (`use*Store.ts`)

```ts
import { describe, expect, it, beforeEach } from "vitest";
import { useAuthStore } from "./useAuthStore";

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState(/* initial state */);
  });

  it("has correct initial state", () => {
    const state = useAuthStore.getState();
    expect(state.someField).toBe(expectedValue);
  });

  it("updates state via action", () => {
    useAuthStore.getState().someAction(args);
    expect(useAuthStore.getState().someField).toBe(newValue);
  });
});
```

### React Query hooks (`use*.ts` with `useQuery`/`useMutation`)

```tsx
import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@/test/test-utils";
import { server } from "@/test/mocks/server";
import { http, HttpResponse } from "msw";
import { useSomeQuery } from "./useSomeQuery";

describe("useSomeQuery", () => {
  it("fetches data", async () => {
    server.use(
      http.get("/api/endpoint", () => HttpResponse.json({ data: "value" }))
    );
    const { result } = renderHook(() => useSomeQuery());
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ data: "value" });
  });
});
```

### Other hooks

```tsx
import { describe, expect, it } from "vitest";
import { renderHook, act } from "@/test/test-utils";
import { useSomeHook } from "./useSomeHook";

describe("useSomeHook", () => {
  it("returns expected value", () => {
    const { result } = renderHook(() => useSomeHook());
    expect(result.current.value).toBe(expected);
  });
});
```

## After Generation

1. Verify the test file is syntactically valid
2. Show the test file path
