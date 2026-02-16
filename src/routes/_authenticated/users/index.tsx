import { createFileRoute } from "@tanstack/react-router";
import { UserList } from "@/features/users";

export const Route = createFileRoute("/_authenticated/users/")({
	component: UsersPage,
});

function UsersPage() {
	return (
		<div>
			<h2>Users</h2>
			<UserList />
		</div>
	);
}
