import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { User } from "../types";

type AuthState = {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
};

export const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				login: (user) => set({ user }, false, "auth/login"),
				logout: () => set({ user: null }, false, "auth/logout"),
			}),
			{ name: "auth-storage" },
		),
		{ name: "AuthStore" },
	),
);
