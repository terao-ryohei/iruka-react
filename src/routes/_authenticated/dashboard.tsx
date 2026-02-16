import { createFileRoute } from "@tanstack/react-router";
import { useAuthStore } from "@/features/auth";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	const user = useAuthStore((s) => s.user);

	return (
		<div>
			<h2>Dashboard</h2>
			<p>Welcome back, {user?.name ?? "User"}!</p>
		</div>
	);
}
