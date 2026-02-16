import { createFileRoute, Link } from "@tanstack/react-router";
import { LoginForm, useAuthStore } from "@/features/auth";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	const user = useAuthStore((s) => s.user);
	const logout = useAuthStore((s) => s.logout);

	return (
		<div>
			<h2>Welcome</h2>
			<p>
				This is a React 19 best practices template featuring TanStack Router,
				Zustand, TanStack Query, React Compiler, Vitest, and Biome.
			</p>

			{user ? (
				<div>
					<p>
						Logged in as <strong>{user.name}</strong>
					</p>
					<nav style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
						<Link to="/dashboard">Dashboard</Link>
						<Link to="/users">Users</Link>
					</nav>
					<button type="button" onClick={logout} style={{ marginTop: "1rem" }}>
						Logout
					</button>
				</div>
			) : (
				<LoginForm />
			)}
		</div>
	);
}
