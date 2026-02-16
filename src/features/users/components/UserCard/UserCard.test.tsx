import { describe, expect, it, vi } from "vitest";
import { createMockUser } from "@/test/factories";
import { render, screen } from "@/test/test-utils";
import { UserCard } from "./UserCard";

vi.mock("@tanstack/react-router", () => ({
	Link: ({ children, to, ...props }: Record<string, unknown>) => (
		<a href={to as string} {...props}>
			{children as React.ReactNode}
		</a>
	),
}));

const mockUser = createMockUser();

describe("UserCard", () => {
	it("renders user information", () => {
		render(<UserCard user={mockUser} />);

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("@johndoe")).toBeInTheDocument();
		expect(screen.getByText("john@example.com")).toBeInTheDocument();
		expect(screen.getByText("Acme Inc")).toBeInTheDocument();
	});

	it("renders a link to user detail", () => {
		render(<UserCard user={mockUser} />);

		const link = screen.getByText("View Profile");
		expect(link).toBeInTheDocument();
	});
});
