import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.test.{ts,tsx}"],
		css: true,
		coverage: {
			provider: "v8",
			include: ["src/**/*.{ts,tsx}"],
			exclude: [
				"src/test/**",
				"src/routeTree.gen.ts",
				"src/vite-env.d.ts",
				"src/main.tsx",
				"src/**/*.d.ts",
			],
			thresholds: {
				statements: 30,
				branches: 30,
				functions: 30,
				lines: 30,
			},
			reporter: ["text", "html", "lcov"],
		},
	},
});
