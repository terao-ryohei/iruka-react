import type { LoginCredentials, User } from "../types";

const MOCK_USER: User = {
	id: 1,
	name: "Demo User",
	email: "demo@example.com",
};

export async function loginApi(credentials: LoginCredentials): Promise<User> {
	await new Promise((resolve) => setTimeout(resolve, 500));

	if (
		credentials.email === "demo@example.com" &&
		credentials.password === "password"
	) {
		return MOCK_USER;
	}

	throw new Error("Invalid credentials");
}
