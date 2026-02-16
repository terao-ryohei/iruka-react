import { Link } from "@tanstack/react-router";
import { useUser } from "../hooks/useUsers";

type UserDetailProps = {
	userId: number;
};

export function UserDetail({ userId }: UserDetailProps) {
	const { data: user, isLoading, error } = useUser(userId);

	if (isLoading) return <p>Loading user...</p>;
	if (error) return <p>Error: {error.message}</p>;
	if (!user) return <p>User not found.</p>;

	return (
		<div>
			<Link to="/users">&larr; Back to Users</Link>
			<h3>{user.name}</h3>
			<dl>
				<dt>Username</dt>
				<dd>@{user.username}</dd>
				<dt>Email</dt>
				<dd>{user.email}</dd>
				<dt>Phone</dt>
				<dd>{user.phone}</dd>
				<dt>Website</dt>
				<dd>{user.website}</dd>
				<dt>Company</dt>
				<dd>{user.company.name}</dd>
			</dl>
		</div>
	);
}
