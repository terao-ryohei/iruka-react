import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";

export const Route = createRootRoute({
	component: RootLayout,
});

function RootLayout() {
	return (
		<div>
			<header
				style={{ padding: "1rem 2rem", borderBottom: "1px solid #e2e8f0" }}
			>
				<h1 style={{ margin: 0, fontSize: "1.25rem" }}>
					React Best Practices Template
				</h1>
			</header>
			<main style={{ padding: "2rem" }}>
				<ErrorBoundary>
					<Outlet />
				</ErrorBoundary>
			</main>
		</div>
	);
}
