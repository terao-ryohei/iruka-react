function validateEnv() {
	const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

	if (import.meta.env.PROD && !apiBaseUrl) {
		throw new Error(
			"Missing required environment variable: VITE_API_BASE_URL. See .env.example for reference.",
		);
	}

	return {
		apiBaseUrl: apiBaseUrl ?? "https://jsonplaceholder.typicode.com",
	};
}

const env = validateEnv();

export const API_BASE_URL = env.apiBaseUrl;
export const IS_DEV = import.meta.env.DEV;
export const IS_PROD = import.meta.env.PROD;
