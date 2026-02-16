import { queryOptions } from "@tanstack/react-query";
import { fetchUser, fetchUsers } from "./usersApi";

export const usersQueryOptions = () =>
	queryOptions({
		queryKey: ["users"],
		queryFn: fetchUsers,
	});

export const userQueryOptions = (userId: number) =>
	queryOptions({
		queryKey: ["users", userId],
		queryFn: () => fetchUser(userId),
	});
