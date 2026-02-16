import { apiClient } from "@/shared/api/client";
import type { UserProfile } from "../types";

export async function fetchUsers(): Promise<UserProfile[]> {
	return apiClient<UserProfile[]>("/users");
}

export async function fetchUser(id: number): Promise<UserProfile> {
	return apiClient<UserProfile>(`/users/${id}`);
}
