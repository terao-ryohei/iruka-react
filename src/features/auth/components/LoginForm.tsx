import { useActionState } from "react";
import { loginApi } from "../api/authApi";
import { useAuthStore } from "../hooks/useAuthStore";

type LoginState = {
	error: string | null;
};

export function LoginForm() {
	const login = useAuthStore((s) => s.login);

	const [state, formAction, isPending] = useActionState<LoginState, FormData>(
		async (_prev, formData) => {
			const email = formData.get("email") as string;
			const password = formData.get("password") as string;

			try {
				const user = await loginApi({ email, password });
				login(user);
				return { error: null };
			} catch (e) {
				return {
					error: e instanceof Error ? e.message : "Login failed",
				};
			}
		},
		{ error: null },
	);

	return (
		<form
			action={formAction}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "0.75rem",
				maxWidth: "320px",
			}}
		>
			<h3>Login</h3>
			{state.error && (
				<p role="alert" style={{ color: "red", margin: 0 }}>
					{state.error}
				</p>
			)}
			<input
				name="email"
				type="email"
				placeholder="demo@example.com"
				defaultValue="demo@example.com"
				required
			/>
			<input
				name="password"
				type="password"
				placeholder="password"
				defaultValue="password"
				required
			/>
			<button type="submit" disabled={isPending}>
				{isPending ? "Logging in..." : "Login"}
			</button>
			<p style={{ fontSize: "0.8rem", color: "#666", margin: 0 }}>
				Demo: demo@example.com / password
			</p>
		</form>
	);
}
