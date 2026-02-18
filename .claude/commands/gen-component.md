---
description: Generate a feature-based component with co-located test file
argument-hint: "[featureName] [ComponentName]"
---

Generate a new component and its test file following iruka-react conventions.

## Arguments

Parse `$ARGUMENTS` as two space-separated values:
- `$0` = featureName (e.g. `users`)
- `$1` = ComponentName (e.g. `UserProfile`)

## File Creation

### 1. `src/features/$0/components/$1/$1.tsx`

Create a functional component following this pattern:

```tsx
type ${ComponentName}Props = {
  // Define props based on the component's purpose
};

export function ${ComponentName}({ ...props }: ${ComponentName}Props) {
  return (
    <div>
      {/* Component content */}
    </div>
  );
}
```

Rules:
- Use named export (NOT default export)
- Props type defined above the component (NOT inline, NOT separate file)
- Use TypeScript `type` (not `interface`) for props
- Functional component only (no class components)
- Import types from the feature's `types.ts` if referencing feature domain types: `import type { SomeType } from "../../types";`

### 2. `src/features/$0/components/$1/$1.test.tsx`

Create tests following this exact pattern from the codebase:

```tsx
import { describe, expect, it, vi } from "vitest";
import { createMockUser } from "@/test/factories";
import { render, screen } from "@/test/test-utils";
import { ${ComponentName} } from "./${ComponentName}";

describe("${ComponentName}", () => {
  it("renders correctly", () => {
    render(<${ComponentName} /* props */ />);
    // assertions
  });

  it("handles user interaction", async () => {
    const { user } = render(<${ComponentName} /* props */ />);
    // user interaction + assertions
  });
});
```

Rules:
- Import `render` and `screen` from `@/test/test-utils` (custom render with QueryClientProvider + userEvent)
- Import `describe, expect, it, vi` from `vitest`
- Use factory functions from `@/test/factories` for mock data (create new factory if needed)
- Mock `@tanstack/react-router` if the component uses `Link` or router hooks
- At least 2 test cases: one for rendering, one for interaction
- Destructure `{ user }` from `render()` for user event testing
- Use `screen.getByText`, `screen.getByRole` etc. for queries

## After Generation

1. Verify both files are syntactically valid TypeScript/TSX
2. Show the created file paths
