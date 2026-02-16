import { createFileRoute } from "@tanstack/react-router";
import { UserDetail } from "@/features/users";

export const Route = createFileRoute("/_authenticated/users/$userId")({
	component: UserDetailPage,
});

function UserDetailPage() {
	const { userId } = Route.useParams();

	return (
		<div>
			<h2>User Detail</h2>
			<UserDetail userId={Number(userId)} />
		</div>
	);
}
