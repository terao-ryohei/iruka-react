import { HttpResponse, http } from "msw";

const API_BASE = "https://jsonplaceholder.typicode.com";

export const handlers = [
	http.get(`${API_BASE}/users`, () =>
		HttpResponse.json([
			{
				id: 1,
				name: "Test User",
				username: "testuser",
				email: "test@example.com",
				phone: "123",
				website: "test.com",
				company: { name: "Test Co" },
			},
		]),
	),
	http.get(`${API_BASE}/users/:id`, ({ params }) =>
		HttpResponse.json({
			id: Number(params.id),
			name: "Test User",
			username: "testuser",
			email: "test@example.com",
			phone: "123",
			website: "test.com",
			company: { name: "Test Co" },
		}),
	),
];
