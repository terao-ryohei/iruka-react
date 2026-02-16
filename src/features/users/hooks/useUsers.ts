import { useQuery } from "@tanstack/react-query";
import { userQueryOptions, usersQueryOptions } from "../api/queries";

export function useUsers() {
	return useQuery(usersQueryOptions());
}

export function useUser(userId: number) {
	return useQuery(userQueryOptions(userId));
}
