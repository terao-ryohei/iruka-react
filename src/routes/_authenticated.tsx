import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/features/auth";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: () => {
		const { user } = useAuthStore.getState();
		if (!user) {
			throw redirect({ to: "/" });
		}
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	return <Outlet />;
}
