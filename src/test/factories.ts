import type { UserProfile } from "@/features/users/types";

export function createMockUser(overrides?: Partial<UserProfile>): UserProfile {
	return {
		id: 1,
		name: "John Doe",
		username: "johndoe",
		email: "john@example.com",
		phone: "1-234-567",
		website: "johndoe.com",
		company: { name: "Acme Inc" },
		...overrides,
	};
}

export function createMockUsers(count: number): UserProfile[] {
	return Array.from({ length: count }, (_, i) =>
		createMockUser({
			id: i + 1,
			name: `User ${i + 1}`,
			username: `user${i + 1}`,
		}),
	);
}
