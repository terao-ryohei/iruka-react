import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderOptions, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement } from "react";

function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { retry: false, gcTime: 0 },
			mutations: { retry: false },
		},
	});
}

function AllProviders({ children }: { children: React.ReactNode }) {
	const queryClient = createTestQueryClient();
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

function customRender(
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">,
) {
	return {
		...render(ui, { wrapper: AllProviders, ...options }),
		user: userEvent.setup(),
	};
}

export * from "@testing-library/react";
export { customRender as render, createTestQueryClient };
