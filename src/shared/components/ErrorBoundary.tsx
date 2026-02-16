import { Component, type ErrorInfo, type ReactNode } from "react";

type ErrorBoundaryProps = {
	children: ReactNode;
	fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
};

type ErrorBoundaryState = {
	error: Error | null;
};

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state: ErrorBoundaryState = { error: null };

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { error };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("ErrorBoundary caught:", error, info.componentStack);
	}

	reset = () => {
		this.setState({ error: null });
	};

	render() {
		const { error } = this.state;
		if (!error) return this.props.children;

		const { fallback } = this.props;
		if (typeof fallback === "function") return fallback(error, this.reset);
		if (fallback) return fallback;

		return (
			<div role="alert" style={{ padding: "2rem", textAlign: "center" }}>
				<h2>Something went wrong</h2>
				<p style={{ color: "#666" }}>{error.message}</p>
				<button type="button" onClick={this.reset}>
					Try again
				</button>
			</div>
		);
	}
}
