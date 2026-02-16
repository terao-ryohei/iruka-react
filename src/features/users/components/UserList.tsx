import { useUsers } from "../hooks/useUsers";
import { UserCard } from "./UserCard/UserCard";

export function UserList() {
	const { data: users, isLoading, error } = useUsers();

	if (isLoading) return <p>Loading users...</p>;
	if (error) return <p>Error loading users: {error.message}</p>;
	if (!users?.length) return <p>No users found.</p>;

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
				gap: "1rem",
			}}
		>
			{users.map((user) => (
				<UserCard key={user.id} user={user} />
			))}
		</div>
	);
}
